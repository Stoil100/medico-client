import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { ListPrescriptionsType } from "@/components/schemas/pharmacy";

export function useFulfillMedicamentFromPrescription() {
    const post = async (data: ListPrescriptionsType) => {
        const response = await apiClient.post<string>("/pharmacy/pharmacist/prescription/fulfill", data);
        return response.data;
    };

    return useMutation({
        mutationKey: ["pharmacy", "pharmacist", "prescription", "fulfillMedicament"],
        mutationFn: post,
        retry: 1,
    });
}