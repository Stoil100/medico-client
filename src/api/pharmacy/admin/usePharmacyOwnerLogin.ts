import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { PharmacyOwnerLoginType } from "@/schemas/pharmacy";

export function usePharmacyOwnerLogin() {
    const postLogin = async (loginData: PharmacyOwnerLoginType) => {
        const response = await apiClient.post<string>("/pharmacy/owner/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["pharmacy", "owner", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
