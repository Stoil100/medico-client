
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useDeletePharmacy(id: string) {
    const deletePharmacy = async () => {
        const response = await apiClient.delete(`/moderator/pharma/delete?${id}`);
        return response.data;
    };

    return useQuery({
        queryKey: ["deletePharmacy"],
        queryFn: deletePharmacy,
        retry: 1,
    });
}
