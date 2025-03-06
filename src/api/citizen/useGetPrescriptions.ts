import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CitizenPrescription } from "@/components/models/Citizen";

export function useGetPrescriptions() {
    const getPrescriptions = async () => {
        const response = await apiClient.get<CitizenPrescription[]>("/citizen/prescriptions");
        return response.data;
    };

    return useQuery({
        queryKey: ["citizen", "prescriptions", "get"],
        queryFn: getPrescriptions,
        retry: 1,

    });
}
