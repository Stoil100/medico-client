import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { DoctorCitizen } from "@/models/Doctor";

export function useGetCitizensByCommonUcn(ucn: string) {
    const getCitizenInfo = async () => {
        const response = await medicoApiClient.get<DoctorCitizen[]>(`/doctor/citizens/ucn`, {
            params: {
                citizenUcn: ucn
            }
        });
        return response.data;
    };

    return useQuery({
        queryKey: ["doctor", "citizens", "ucn", "get"],
        queryFn: getCitizenInfo,
        retry: 1,
    });
}
