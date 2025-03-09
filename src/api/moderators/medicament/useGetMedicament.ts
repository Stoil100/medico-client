import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ModeratorMedicament } from "@/models/Moderator";

export function useGetModerators() {
    const getMedicaments = async () => {
        const response = await apiClient.get<ModeratorMedicament[]>("/moderator/medicament/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["moderator", "medicaments", "get"],
        queryFn: getMedicaments,
        retry: 1,
    });
}
