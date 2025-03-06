import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAvailablePharmacies(prescriptionId: string | undefined) {
    const getAvailablePharmacies = async () => {
        const response = await apiClient.get("/citizen/availablePharmacies",
            {
                params: {
                    prescriptionId
                }
            });
        return response.data;
    };

    return useQuery({
        queryKey: ["citizen", "availablePharmacies", "get", prescriptionId],
        queryFn: getAvailablePharmacies,
        retry: 1,
    });
}
