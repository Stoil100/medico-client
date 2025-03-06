import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { PharmacistPrescriptions } from "@/components/models/Pharmacy";

export function useGetCitizenPrescriptions(ucn: string | undefined) {
    const getCitizenPrescriptions = async () => {
        const response = await apiClient.get<PharmacistPrescriptions[]>(`/pharmacy/pharmacist/prescription/get`, {
            params: {
                citizenUcn: ucn
            }
        });
        return response.data;
    };

    return useQuery({
        queryKey: ["pharmacy", "pharmacist", "citizenPrescription", "get", ucn],
        queryFn: getCitizenPrescriptions,
        retry: 1,
        enabled: !!ucn,
    });
}
