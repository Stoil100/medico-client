import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { CitizenLoginType } from "@/schemas/citizen";

export function useCitizenLogin() {
    const postLogin = async (loginData: CitizenLoginType) => {
        const response = await medicoApiClient.post("/citizen/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["citizen", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
