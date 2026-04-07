import http from "@/shared/api/http";

export const attendanceAPI = {
  /**
   * Check-in (Men keldim)
   * @param {{ lat: number, lng: number, accuracy: number }} data
   * @returns {Promise}
   */
  checkIn: (data) => http.post("/api/attendance/check-in", data),

  /**
   * Check-out (Men ketdim)
   * @param {{ lat: number, lng: number, accuracy: number }} data
   * @returns {Promise}
   */
  checkOut: (data) => http.post("/api/attendance/check-out", data),

  /**
   * Bugungi davomat yozuvini olish
   * @returns {Promise}
   */
  getToday: () => http.get("/api/attendance/today"),

  /**
   * O'z davomat tarixini olish
   * @param {number} month
   * @param {number} year
   * @returns {Promise}
   */
  getMyHistory: (month, year) =>
    http.get("/api/attendance/my", { params: { month, year } }),

  /**
   * Excuse so'rov yuborish
   * @param {{ date: string, reason: string, type: string }} data
   * @returns {Promise}
   */
  createExcuseRequest: (data) => http.post("/api/attendance/excuse", data),

  /**
   * O'z excuse so'rovlarini olish
   * @param {Object} params
   * @returns {Promise}
   */
  getMyExcuses: (params) => http.get("/api/attendance/excuse/my", { params }),
};
