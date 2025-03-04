import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModeratorMedicamentType } from "@/components/schemas/moderators";

export function useCreateMedicament() {
    const createMedicament = async (newMedicament: ModeratorMedicamentType) => {
        const response = await apiClient.post("/moderator/medicament/create", newMedicament);
        return response.data;
    };

    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: ["moderator", "medicament", "create"],
        mutationFn: createMedicament,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["moderator", "medicaments", "get"] })
    });
}
