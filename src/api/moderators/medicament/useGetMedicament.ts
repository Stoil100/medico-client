
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetModerators() {
    const getMedicaments = async () => {
        const response = await apiClient.get("/moderator/medicament/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["getMedicaments"],
        queryFn: getMedicaments,
        retry: 1,
    });
}
