import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { PharmacistLoginType } from "@/schemas/pharmacy";

export function usePharmacistLogin() {
    const postLogin = async (loginData: PharmacistLoginType) => {
        const response = await medicoApiClient.post<string>("/pharmacy/pharmacist/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["pharmacy", "pharmacist", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
