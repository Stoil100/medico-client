
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useDeleteCitizen(id: string) {
    const deleteCitizen = async () => {
        const response = await apiClient.delete(`/moderator/citizen/delete?${id}`);
        return response.data;
    };

    return useQuery({
        queryKey: ["deleteCitizen"],
        queryFn: deleteCitizen,
        retry: 1,
    });
}
