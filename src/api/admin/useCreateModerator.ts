import { medicoApiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddModeratorType } from "@/schemas/admin";
import { getModeratorsQueryKeys as queryKey } from "@/api/admin/useGetModeratros";

export function useCreateModerators() {
    return useMutation({
        mutationKey: ["admin", "moderator", "create"],
        mutationFn: (newModerator: AddModeratorType) =>
            medicoApiClient.post("/admin/moderator/create", newModerator).then(response => response.data),
        retry: 1,
        onSuccess: () =>
            useQueryClient().invalidateQueries({ queryKey })
    });
}
