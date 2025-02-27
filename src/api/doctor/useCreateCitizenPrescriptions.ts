import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCreateCitizenPrescriptions() {
    const createCitizenPrescriptions = async () => {
        const response = await apiClient.post(`/doctor/citizen/prescription`);
        return response.data;
    };

    return useQuery({
        queryKey: ["createCitizenPrescriptions"],
        queryFn: createCitizenPrescriptions,
        retry: 1,
    });
}
