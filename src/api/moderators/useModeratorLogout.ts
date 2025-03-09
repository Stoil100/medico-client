import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useModeratorLogout() {
    const postLogout = async () => {
        const response = await medicoApiClient.post("/moderator/logout");
        return response.data;
    };

    return useMutation({
        mutationKey: ["moderator", "logout"],
        mutationFn: postLogout,
        retry: 1,
    });
}
