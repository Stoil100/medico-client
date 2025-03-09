import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { PharmacyOwnerBranch } from "@/models/Pharmacy";

export function useGetBranchesByCommonName(name: string) {
    const getAvailablePharmacies = async () => {
        const response = await apiClient.get<PharmacyOwnerBranch[]>("/pharmacy/owner/branches/commonName",
            {
                params: {
                    name
                }
            });
        return response.data;
    };

    return useQuery({
        queryKey: ["pharmacy", "owner", "branches", "getByCommonName", name],
        queryFn: getAvailablePharmacies,
        retry: 1,
    });
}
