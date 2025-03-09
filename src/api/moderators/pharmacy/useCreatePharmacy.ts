import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModeratorPharmacyType } from "@/schemas/moderators";

export function useCreatePharmacy() {
    const createPharmacy = async (newPharmacy: ModeratorPharmacyType) => {
        const response = await apiClient.post("/moderator/pharma/create", newPharmacy);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["moderator", "pharmacy", "create"],
        mutationFn: createPharmacy,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["moderator", "pharmacies", "get"] })
    });
}
