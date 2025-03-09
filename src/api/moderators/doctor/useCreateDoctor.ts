import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModeratorDoctorType } from "@/schemas/moderators";

export function useCreateDoctor() {
    const createDoctor = async (newDoctor: ModeratorDoctorType) => {
        const response = await apiClient.post("/moderator/doctor/create", newDoctor);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["moderator", "doctor", "create"],
        mutationFn: createDoctor,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["moderator", "doctors", "get"], exact: true })
    });
}
