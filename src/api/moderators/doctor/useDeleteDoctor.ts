
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useDeleteDoctor(id: string) {
    const deleteDoctor = async () => {
        const response = await apiClient.delete(`/moderator/doctor/delete?${id}`);
        return response.data;
    };

    return useQuery({
        queryKey: ["deleteDoctor"],
        queryFn: deleteDoctor,
        retry: 1,
    });
}
