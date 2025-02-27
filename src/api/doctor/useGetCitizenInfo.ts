import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCitizenInfo() {
    const getCitizenInfo = async () => {
        const response = await apiClient.get(`/doctor/citizen/info`);
        return response.data;
    };

    return useQuery({
        queryKey: ["getCitizenInfo"],
        queryFn: getCitizenInfo,
        retry: 1,
    });
}
