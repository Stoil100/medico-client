import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListPrescriptionsType } from "@/schemas/pharmacy";

export function useFulfillFromPrescription() {
    const post = async (data: ListPrescriptionsType) => {
        const response = await apiClient.post<string>("/pharmacy/pharmacist/prescription/fulfill", data);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["pharmacy", "pharmacist", "prescription", "fulfillMedicament"],
        onSuccess: async () =>
            queryClient.invalidateQueries({queryKey: ["pharmacy", "pharmacist", "citizenPrescription", "get"]}),
        mutationFn: post,
        retry: 1,
    });
}