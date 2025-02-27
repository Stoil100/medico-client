
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCreatePharmacy() {
    const createPharmacy = async () => {
        const response = await apiClient.post("/moderator/pharma/create");
        return response.data;
    };

    return useQuery({
        queryKey: ["createPharmacy"],
        queryFn: createPharmacy,
        retry: 1,
    });
}
