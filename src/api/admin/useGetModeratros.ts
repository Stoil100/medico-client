import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Moderator } from "@/models/Admin";

export function useGetModerators() {
    const getModerators = async () => {
        const response = await apiClient.get<Moderator[]>("/admin/moderator/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["admin", "moderators", "get"],
        queryFn: getModerators,
        retry: 1,
    });
}
