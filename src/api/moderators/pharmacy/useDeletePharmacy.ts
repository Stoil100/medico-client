import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePharmacy() {
    const deletePharmacy = async (id: string) => {
        const response = await apiClient.delete(`/moderator/pharma/delete`,
            {
                params: {
                    pharmacyId: id
                }
            });
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["moderator", "pharmacy", "delete"],
        mutationFn: deletePharmacy,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["moderator", "pharmacies", "get"] })
    });
}
