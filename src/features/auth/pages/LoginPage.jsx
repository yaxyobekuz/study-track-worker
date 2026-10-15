// Toast
import { toast } from "sonner";

// Lottie
import Lottie from "lottie-react";

// Utils
import { cn } from "@/shared/utils/cn";

// Router
import { useNavigate } from "react-router-dom";

// Icons
import { logoIcon } from "@/shared/assets/icons";

// API
import { authAPI } from "@/features/auth/api/auth.api";

// Hooks
import useObjectState from "@/shared/hooks/useObjectState";

// Animations
import { lockWithKeyEmojiAnimation } from "@/shared/assets/animations";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputGroup from "@/shared/components/ui/input/InputGroup";
import InputField from "@/shared/components/ui/input/InputField";
import MainBackgroundPatterns from "@/shared/components/bg/MainBackgroundPatterns";
import BranchSelectForm from "@/features/auth/components/BranchSelectForm";

const LoginPage = () => {
  return (
    <div className="flex flex-row-reverse w-full h-svh">
      {/* Form */}
      <div
        className={cn(
          "flex items-center justify-center size-full relative z-10 bg-white/50 backdrop-blur px-5 transition-transform duration-500 md:w-1/2",
        )}
      >
        <LoginForm />
      </div>

      {/* Animation Data */}
      <div
        className={cn(
          "hidden items-center justify-center w-1/2 h-full transition-transform duration-500 md:flex",
        )}
      >
        <Lottie
          animationData={lockWithKeyEmojiAnimation}
          className="size-64 animate__animated animate__fadeIn"
        />
      </div>

      {/* Background Patterns */}
      <MainBackgroundPatterns />
    </div>
  );
};

const LoginForm = ({}) => {
  const navigate = useNavigate();

  const {
    username,
    password,
    setField,
    setFields,
    isLoading,
    branchSelection,
    pendingBranchId,
  } = useObjectState({
    step: 1,
    username: "",
    password: "",
    isLoading: false,
    // Ikki yoki undan ortiq filialli xodim uchun server qaytargan tanlov
    // javobi: `{ selectionToken, branches, homeBranchId, user }`.
    //
    // ⚠️ XOTIRADA, `localStorage` da EMAS: sahifa yangilansa oqim parol
    // qadamidan boshlanadi. Tanlov tokeni 5 daqiqa yashaydi va u access
    // token EMAS — u bilan API'ga kirib bo'lmaydi.
    branchSelection: null,
    pendingBranchId: null,
  });

  /** Tokenni saqlab panelga kiritadi — ikkala qadam ham shu yerda tugaydi. */
  const enterPanel = (token) => {
    localStorage.setItem("authToken", token);
    navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setField("isLoading", true);

    // ⚠️ `branchSelect: true` — "men filial tanlash oynasini ko'rsata
    // olaman". Bayroqsiz so'rov avvalgidek UY filialiga token oladi, ya'ni
    // eski mijozlar (mobil ilova) buzilmaydi.
    const data = { username, password: password?.trim(), branchSelect: true };

    authAPI
      .login(data)
      .then((response) => {
        const result = response.data.data;

        // Ko'p filialli xodim: token hali BERILMAGAN va seans ochilmagan —
        // avval qaysi filialda ishlashini aytadi
        if (result.branchSelectionRequired) {
          setField("branchSelection", result);
          return;
        }

        enterPanel(result.token);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Tizimga kirishda xatolik",
        );
      })
      .finally(() => setField("isLoading", false));
  };

  /** Filial tanlandi — seans AYNAN shu filialda ochiladi. */
  const handleBranchSelect = (branch) => {
    setFields({ isLoading: true, pendingBranchId: branch.id });

    authAPI
      .selectLoginBranch({
        selectionToken: branchSelection.selectionToken,
        branchId: branch.id,
      })
      .then((response) => enterPanel(response.data.data.token))
      .catch((error) => {
        const details = error.response?.data?.details;

        // Tanlov tokeni 5 daqiqa yashaydi: muddati tugasa parolni qaytadan
        // kiritish kerak — oynada qolib, har bosishda xato olmasin
        if (details?.reason === "selection_expired") {
          setFields({ branchSelection: null, password: "" });
        }

        toast.error(
          error.response?.data?.message || "Filialga kirishda xatolik",
        );
      })
      .finally(() => setFields({ isLoading: false, pendingBranchId: null }));
  };

  // Filialni tanlash qadami — parol allaqachon tekshirilgan
  if (branchSelection) {
    return (
      <BranchSelectForm
        isLoading={isLoading}
        pendingId={pendingBranchId}
        branches={branchSelection.branches}
        fullName={branchSelection.user?.firstName}
        homeBranchId={branchSelection.homeBranchId}
        onSelect={handleBranchSelect}
        onBack={() => setFields({ branchSelection: null, password: "" })}
      />
    );
  }

  return (
    <div className="max-w-md w-full animate__animated animate__fadeIn">
      {/* Header */}
      <div className="text-center mb-8 space-y-3.5">
        {/* Title */}
        <h2 className="flex items-center justify-center gap-3.5 text-lg font-medium text-center md:gap-5 md:text-xl">
          <img
            width={32}
            height={32}
            src={logoIcon}
            className="size-8"
            alt="MBSI Logo icon"
          />

          <span>Qaytganingiz bilan!</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-2">
          Tizimga kirish uchun ma'lumotlaringizni kiriting.
        </p>
      </div>

      {/* Form */}
      <InputGroup as="form" onSubmit={handleSubmit}>
        <InputField
          required
          id="username"
          name="username"
          value={username}
          autoComplete="username"
          label="Foydalanuvchi nomi"
          placeholder="Faqat raqamlar va harflar"
          onChange={(e) =>
            setField("username", e.target.value.trim().toLowerCase())
          }
        />

        <InputField
          required
          id="password"
          label="O'ron"
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setField("password", e.target.value.trim())}
        />

        {/* Action buttons */}
        <Button disabled={isLoading}>Tizimga kirish{isLoading && "..."}</Button>
      </InputGroup>
    </div>
  );
};

export default LoginPage;
