import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { ModeratorLoginType } from "@/schemas/moderators";

export function useModeratorLogin() {
    const postLogin = async (loginData: ModeratorLoginType) => {
        const response = await apiClient.post<string>("/moderator/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["moderator", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
