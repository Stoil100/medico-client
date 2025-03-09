import { medicoApiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getModeratorsQueryKeys as queryKey } from "@/api/admin/useGetModeratros";

export function useDeleteModerator() {
    return useMutation({
        mutationKey: ["admin", "moderator", "delete"],
        mutationFn: (id: string) =>
            medicoApiClient.delete(`/admin/moderator/delete`, {
                params: {
                    id
                }
            }),
        retry: 1,
        onSuccess: () => useQueryClient().invalidateQueries({ queryKey })
    });
}
