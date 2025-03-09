import { useMutation } from "@tanstack/react-query";
import { AddPharmacistType } from "@/schemas/pharmacy";
import { medicoApiClient } from "@/api";

export function useCreatePharmacist() {
    const postNewPharmacist = async (newPharmacist: AddPharmacistType) => {
        const response = await medicoApiClient.post("/pharmacy/owner/pharmacist/new", newPharmacist);
        return response.data;
    };

    return useMutation({
        mutationKey: ["pharmacy", "owner", "pharmacist", "create"],
        mutationFn: postNewPharmacist,
        retry: 1,
    })
}