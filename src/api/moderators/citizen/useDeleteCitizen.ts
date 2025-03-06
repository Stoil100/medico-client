
import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCitizen() {
    const deleteCitizen = async (id: string) => {
        const response = await apiClient.delete(`/moderator/citizen/delete`, {
            params: {
                citizenId: id
            }
        });
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteCitizen"],
        mutationFn: deleteCitizen,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({queryKey: ["moderator", "citizen", "get"]})
    });
}
