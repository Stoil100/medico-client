"use client";

import { useGetPrescriptions } from "@/api/citizen";
import { CitizenPrescription } from "@/models/Citizen";

export function usePrescriptions() {
    const { data: prescriptions, isLoading, error } = useGetPrescriptions();
    let groupedPrescriptions: Record<string, CitizenPrescription[]> = {};
    if (prescriptions) {


        groupedPrescriptions = prescriptions.reduce((acc, prescription) => {
            if (!acc[prescription.status]) {
                acc[prescription.status] = [];
            }
            acc[prescription.status].push(prescription);
            return acc;
        }, {} as Record<string, CitizenPrescription[]>);
    }

    return {
        prescriptions,
        groupedPrescriptions,
        isLoading,
        error
    };
}
