import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useLogout() {
    const postLogout = async () => {
        const response = await apiClient.post("/moderator/citizen/logout");
        return response.data;
    };

    return useQuery({
        queryKey: ["postLogout"],
        queryFn: postLogout,
        retry: 1,
    });
}
