import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useLogout() {
    const postLogout = async () => {
        const response = await apiClient.post("/admin/logout");
        return response.data;
    };

    return useQuery({
        queryKey: ["admin", "logout"],
        queryFn: postLogout,
        retry: 1,
    });
}
