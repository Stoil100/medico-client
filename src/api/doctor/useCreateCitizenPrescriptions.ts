import { medicoApiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IssuePrescriptionType } from "@/schemas/doctor";

export function useCreateCitizenPrescriptions() {
    const createCitizenPrescriptions = async (newPrescription: IssuePrescriptionType) => {
        const response = await medicoApiClient.post(`/doctor/citizen/prescription`, newPrescription);
        return response.data;
    };

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["doctor", "citizen", "prescription", "issue"],
        mutationFn: createCitizenPrescriptions,
        retry: 1,
        onSuccess: async () =>
            queryClient.invalidateQueries({queryKey: ["doctor", "citizen", "prescriptions", "get"]})
    });
}
