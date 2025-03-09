
import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModeratorCitizenType } from "@/schemas/moderators";

export function useCreateCitizen() {
    const createCitizen = async (newCitizen: ModeratorCitizenType) => {
        const response = await apiClient.post("/moderator/citizen/create", newCitizen);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["moderator", "citizen", "create"],
        mutationFn: createCitizen,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({queryKey: ["moderator", "citizen", "get"]})
    });
}
