import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { DoctorCitizen } from "@/models/Doctor";

export function useGetCitizenInfo(ucn: string, enabled: boolean) {
    const getCitizenInfo = async () => {
        const response = await medicoApiClient.get<DoctorCitizen>(`/doctor/citizen/info`, {
            params: {
                citizenUcn: ucn
            }
        });
        return response.data;
    };

    return useQuery({
        queryKey: ["doctor", "citizen", "get"],
        queryFn: getCitizenInfo,
        retry: 1,
        enabled: enabled,
    });
}
