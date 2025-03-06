import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AddMedicamentsType } from "@/components/schemas/pharmacy";

export function useAddMedicamentsToBranch() {
    const post = async (data: AddMedicamentsType) => {
        const response = await apiClient.post<string>("/pharmacy/pharmacist/branch/addMedicament", data);
        return response.data;
    };

    return useMutation({
        mutationKey: ["pharmacy", "pharmacist", "branch", "addMedicament"],
        mutationFn: post,
        retry: 1,
    });
}
