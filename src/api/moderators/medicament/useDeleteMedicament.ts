
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useDeleteMedicament(id: string) {
    const deleteMedicament = async () => {
        const response = await apiClient.delete(`/moderator/medicament/delete?${id}`);
        return response.data;
    };

    return useQuery({
        queryKey: ["deleteMedicament"],
        queryFn: deleteMedicament,
        retry: 1,
    });
}
