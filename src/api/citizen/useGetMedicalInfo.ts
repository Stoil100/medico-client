import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Citizen } from "@/models/Citizen";

export function useMedicalInfo() {
    const postLogin = async () => {
        const response = await medicoApiClient.get<Citizen>("/citizen/medicalInfo");
        return response.data;
    };

    return useQuery({
        queryKey: ["citizen", "medicalInfo", "get"],
        queryFn: postLogin,
        retry: 1,
    });
}
