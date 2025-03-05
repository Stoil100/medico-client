import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { DoctorPrescription } from "@/components/models/Doctor";

export function useGetCitizenPrescriptions(id: string | undefined) {
    const getCitizenPrescriptions = async () => {
        const response = await apiClient.get<DoctorPrescription[]>(`/doctor/citizen/prescription`, {
            params: {
                citizenId: id
            }
        });
        return response.data;
    };

    return useQuery({
        queryKey: ["doctor", "citizen", "prescriptions", "get"],
        queryFn: getCitizenPrescriptions,
        retry: 1,
        enabled: !!id,
    });
}
