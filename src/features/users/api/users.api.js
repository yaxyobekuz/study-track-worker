import http from "@/shared/api/http";

/**
 * Xodim panelida foydalanuvchilar bo'limi YO'Q — faqat tanlagichlar uchun
 * qisqa ro'yxat (id, ism, rol): inventarda xonaga mas'ul xodim biriktirish
 * va zararni aybdorga yozish. Server buni `inventory.locations` yoki
 * `damages.charge` ruxsati bilan ochadi.
 */
export const usersAPI = {
  getAllShort: () => http.get("/users/all-short"),
};
