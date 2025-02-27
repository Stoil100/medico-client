
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetModerators() {
    const getPharmacies = async () => {
        const response = await apiClient.get("/moderator/pharma/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["getPharmacies"],
        queryFn: getPharmacies,
        retry: 1,
    });
}
