import api from "./axiosInstance";
import { BookingFormData } from "@/utils/validators";
import { Shipment, PaginatedResponse, ApiResponse } from "@/types";

export const shipmentApi = {
    // Customer
    createBooking: (data: BookingFormData) => api.post("/shipments", data),

    getMyShipments: (page = 1, limit = 10) =>
        api.get(`/shipments/my?page=${page}&limit=${limit}`),

    getShipmentById: (id: string) => api.get(`/shipments/${id}`),

    updateStatus: (id: string, status: string, note?: string) =>
        api.patch(`/shipments/${id}/status`, { status, note }),

    // Transporter
    getAvailableShipments: (page = 1, limit = 10, filters = {}) =>
        api.get("/marketplace/available", { params: { page, limit, ...filters } }),

    acceptLoad: (id: string) => api.patch(`/marketplace/${id}/accept`),

    rejectLoad: (id: string, reason?: string) =>
        api.patch(`/marketplace/${id}/reject`, { reason }),

    getTransporterShipments: (page = 1, limit = 10) =>
        api.get<ApiResponse<PaginatedResponse<Shipment>>>(
            "/shipments/transporter",
            {
                params: { page, limit },
            },
        ),

    // Admin
    getAllShipments: (page = 1, limit = 10, filters = {}) =>
        api.get("/admin/shipments", { params: { page, limit, ...filters } }),

    getAllUsers: (page = 1, limit = 10, filters = {}) =>
        api.get("/admin/users", { params: { page, limit, ...filters } }),

    updateUser: (id: string, data: any) => api.patch(`/admin/users/${id}`, data),

    deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

    getAdminAnalytics: () => api.get("/admin/analytics"),
};
