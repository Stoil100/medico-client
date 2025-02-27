import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCreateModerators() {
    const createModerator = async () => {
        const response = await apiClient.post("/admin/moderator/create");
        return response.data;
    };

    return useQuery({
        queryKey: ["createModerator"],
        queryFn: createModerator,
        retry: 1,
    });
}
