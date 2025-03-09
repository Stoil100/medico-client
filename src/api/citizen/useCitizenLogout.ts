import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useCitizenLogout() {
    const postLogout = async () => {
        const response = await medicoApiClient.post("/citizen/logout");
        return response.data;
    };

    return useMutation({
        mutationKey: ["citizen", "logout"],
        mutationFn: postLogout,
        retry: 1,
    });
}
