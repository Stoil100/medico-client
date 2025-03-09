import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { DoctorMedicament } from "@/models/Doctor";

export function useGetMedicamentsByCommonName(name: string) {
    const getCitizenInfo = async () => {
        const response = await medicoApiClient.get<DoctorMedicament[]>(`/pharmacy/pharmacist/medicaments/commonName`, {
            params: {
                name
            }
        });
        return response.data;
    };

    return useQuery({
        queryKey: ["pharmacy", "pharmacist", "medicaments", "getByCommonName", name],
        queryFn: getCitizenInfo,
        retry: 1,
    });
}
