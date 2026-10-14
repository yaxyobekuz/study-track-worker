import http from "@/shared/api/http";

export const attendanceAPI = {
  checkIn: (data) => http.post("/attendance/check-in", data),
  checkOut: (data) => http.post("/attendance/check-out", data),

  // Ketishdan OLDIN: bugungi tugamagan ishlar ro'yxati (ogohlantirish uchun)
  getCheckoutReadiness: () => http.get("/attendance/checkout-readiness"),
  getToday: () => http.get("/attendance/today"),
  getMySchedule: () => http.get("/attendance/my-schedule"),
  getMyHistory: (month, year) =>
    http.get("/attendance/my", { params: { month, year } }),
  createExcuseRequest: (data) => http.post("/attendance/excuse", data),
  getMyExcuses: (params) => http.get("/attendance/excuse/my", { params }),
  cancelExcuseRequest: (id) => http.delete(`/attendance/excuse/${id}`),
  // O'z roliga tegishli "Kelmaslik sabablari"
  getAbsenceReasons: () => http.get("/absence-reasons/applicable"),
};
