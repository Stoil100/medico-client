import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { CitizenLoginType } from "@/components/schemas/citizen";

export function useCitizenLogin() {
    const postLogin = async (loginData: CitizenLoginType) => {
        const response = await apiClient.post("/citizen/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["citizen", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
