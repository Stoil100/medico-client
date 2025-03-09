import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useAdminLogout() {
    return useMutation({
        mutationKey: ["admin", "logout"],
        mutationFn: () =>
            medicoApiClient.post("/admin/logout").then((response) => response.data),
        retry: 1
    });
}
