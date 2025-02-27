
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useLogin() {
    const postLogin = async () => {
        const response = await apiClient.post("/citizen/login");
        return response.data;
    };

    return useQuery({
        queryKey: ["postLogin"],
        queryFn: postLogin,
        retry: 1,
    });
}
