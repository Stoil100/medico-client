import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AdminLoginType } from "@/schemas/admin";

export function useAdminLogin() {
    return useMutation({
        mutationKey: ["admin", "login"],
        mutationFn: (loginData: AdminLoginType) =>
            medicoApiClient.post("/admin/login", loginData).then(response => response.data),
        retry: 1
    });
}
