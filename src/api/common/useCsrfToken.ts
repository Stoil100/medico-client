import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCsrfToken() {
    const getModerators = async () => {
        const response = await medicoApiClient.get("/csrf/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["csrf", "get"],
        queryFn: getModerators,
        retry: 1,
    });
}