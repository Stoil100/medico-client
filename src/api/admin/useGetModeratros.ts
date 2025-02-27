import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetModerators() {
    const getModerators = async () => {
        const response = await apiClient.get("/admin/moderator/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["getModerators"],
        queryFn: getModerators,
        retry: 1,
    });
}
