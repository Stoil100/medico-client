
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCreateDoctor() {
    const createDoctor = async () => {
        const response = await apiClient.post("/moderator/doctor/create");
        return response.data;
    };

    return useQuery({
        queryKey: ["createDoctor"],
        queryFn: createDoctor,
        retry: 1,
    });
}
