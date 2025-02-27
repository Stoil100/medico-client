import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAvailablePharmacies() {
    const getAvailablePharmacies = async () => {
        const response = await apiClient.get("/citizen/available_pharmacies");
        return response.data;
    };

    return useQuery({
        queryKey: ["getAvailablePharmacies"],
        queryFn: getAvailablePharmacies,
        retry: 1,
    });
}
