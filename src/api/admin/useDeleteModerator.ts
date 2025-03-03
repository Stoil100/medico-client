import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteModerator() {
    const deleteModerator = async ({ id }: { id: string }) => {
        const response = await apiClient.delete(`/admin/moderator/delete?moderatorId=${id}`);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "moderator", "delete"],
        mutationFn: deleteModerator,
        retry: 1,
        onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["admin", "moderators", "get"], exact: true })
    });
}
