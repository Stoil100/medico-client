import { medicoApiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteDoctor() {
    const deleteDoctor = async (id: string) => {
        const response = await medicoApiClient.delete(`/moderator/doctor/delete`,
            {
                params: {
                    doctorId: id
                }
            });
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["moderator", "doctor", "delete"],
        mutationFn: deleteDoctor,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({ queryKey: ["moderator", "doctors", "get"], exact: true })
    });
}
