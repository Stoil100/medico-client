import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddBranchType } from "@/components/schemas/pharmacy";
import { apiClient } from "@/api";

export function useCreateBranch() {
    const postNewBranch = async (newBranch: AddBranchType) => {
        const response = await apiClient.post("/pharmacy/owner/branch/new", newBranch);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["pharmacy", "owner", "branch", "create"],
        mutationFn: postNewBranch,
        retry: 1,
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: ["pharmacy", "owner", "branches"]})
    })
}