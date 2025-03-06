import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useAdminLogout() {
    const postLogout = async () => {
        const response = await apiClient.post("/admin/logout");
        return response.data;
    };

    return useMutation({
        mutationKey: ["admin", "logout"],
        mutationFn: postLogout,
        retry: 1,
    });
}
