import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ModeratorPharmacy } from "@/components/models/Moderator";

export function useGetPharmacies() {
    const getPharmacies = async () => {
        const response = await apiClient.get<ModeratorPharmacy[]>("/moderator/pharma/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["moderator", "pharmacies", "get"],
        queryFn: getPharmacies,
        retry: 1,
    });
}
