
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCitizens() {
    const getCitizens = async () => {
        const response = await apiClient.get("/moderator/citizen/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["getCitizens"],
        queryFn: getCitizens,
        retry: 1,
    });
}
