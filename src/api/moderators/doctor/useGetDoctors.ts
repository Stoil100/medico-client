import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ModeratorDoctor } from "@/models/Moderator";

export function useGetDoctors() {
    const getDoctors = async () => {
        const response = await medicoApiClient.get<ModeratorDoctor[]>("/moderator/doctor/get");
        return response.data;
    };

    return useQuery({
        queryKey: ["moderator", "doctors", "get"],
        queryFn: getDoctors,
        retry: 1,
    });
}
