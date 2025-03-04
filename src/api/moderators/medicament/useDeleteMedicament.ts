import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteMedicament() {
    const deleteMedicament = async (id: string) => {
        const response = await apiClient.delete(`/moderator/medicament/delete?medicamentId=${id}`);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["moderator", "medicament", "create"],
        mutationFn: deleteMedicament,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["moderator", "medicaments", "get"] })
    });
}
