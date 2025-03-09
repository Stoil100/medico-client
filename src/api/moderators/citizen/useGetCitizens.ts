import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ModeratorCitizen } from "@/models/Moderator";

export function useGetCitizens() {
    const getCitizens = async () => {
        const response = await medicoApiClient.get<ModeratorCitizen[]>("/moderator/citizen/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["moderator", "citizen", "get"],
        queryFn: getCitizens,
        retry: 1,
    });
}
