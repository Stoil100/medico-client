import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetPrescriptions() {
    const getPrescriptions = async () => {
        const response = await apiClient.post("/citizen/prescriptions");
        return response.data;
    };

    return useQuery({
        queryKey: ["getPrescriptions"],
        queryFn: getPrescriptions,
        retry: 1,
    });
}
