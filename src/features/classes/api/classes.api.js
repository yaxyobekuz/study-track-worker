import http from "@/shared/api/http";

/**
 * Sinflar — xodim panelida faqat ma'lumotnoma sifatida (inventarda xonani
 * sinfga bog'lash). Ro'yxat har qanday tizimga kirgan foydalanuvchiga ochiq.
 */
export const classesAPI = {
  getAll: () => http.get("/classes"),
};
