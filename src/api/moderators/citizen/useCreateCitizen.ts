
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCreateCitizen() {
    const createCitizen = async () => {
        const response = await apiClient.post("/moderator/citizen/create");
        return response.data;
    };

    return useQuery({
        queryKey: ["createCitizen"],
        queryFn: createCitizen,
        retry: 1,
    });
}
