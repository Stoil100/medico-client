
import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetDoctors() {
    const getDoctors = async () => {
        const response = await apiClient.get("/moderator/doctor/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["getDoctors"],
        queryFn: getDoctors,
        retry: 1,
    });
}
