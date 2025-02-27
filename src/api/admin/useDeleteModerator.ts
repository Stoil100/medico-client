import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";

export function useDeleteModerators(id: string) {
    const deleteModerator = async () => {
        const response = await apiClient.delete(`/admin/moderator/delete?${id}`);
        return response.data;
    };

    return useQuery({
        queryKey: ["deleteModerator"],
        queryFn: deleteModerator,
        retry: 1,
    });
}
