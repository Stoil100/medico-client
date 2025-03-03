import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddModeratorType } from "@/components/schemas/admin";

export function useCreateModerators() {
    const createModerator = async (newModerator: AddModeratorType) => {
        const response = await apiClient.post("/admin/moderator/create", newModerator);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admin", "moderator", "create"],
        mutationFn: createModerator,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["admin", "moderators", "get"], exact: true })
    });
}
