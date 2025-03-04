import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AdminLoginType } from "@/components/schemas/admin";

export function useAdminLogin() {
    const postLogin = async (loginData: AdminLoginType) => {
        const response = await apiClient.post("/admin/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["admin", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
