import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCitizenPrescriptions() {
    const getCitizenPrescriptions = async () => {
        const response = await apiClient.get(`/doctor/citizen/prescription`);
        return response.data;
    };

    return useQuery({
        queryKey: ["getCitizenPrescriptions"],
        queryFn: getCitizenPrescriptions,
        retry: 1,
    });
}
