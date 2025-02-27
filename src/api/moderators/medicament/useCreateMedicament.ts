
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCreateMedicament() {
    const createMedicament = async () => {
        const response = await apiClient.post("/moderator/medicament/create");
        return response.data;
    };

    return useQuery({
        queryKey: ["createMedicament"],
        queryFn: createMedicament,
        retry: 1,
    });
}
