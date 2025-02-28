"use client";

import { Pharmacy } from "@/components/models/Pharmacy";
import { useEffect, useState } from "react";
import { fetchPharmacies } from "../services/fetchPharmacies";
import { Prescription } from "@/components/models/Prescription";

export function usePharmacies(selectedPrescription: Prescription | null) {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState<
        Pharmacy | undefined
    >();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (selectedPrescription && selectedPrescription.status === "active") {
            setIsLoading(true);
            fetchPharmacies(selectedPrescription.id)
                .then((coordinates) => {
                    setPharmacies(coordinates);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching pharmacy coordinates:", err);
                    setError(
                        err instanceof Error
                            ? err
                            : new Error("Failed to fetch pharmacies")
                    );
                    setIsLoading(false);
                });
        } else {
            setPharmacies([]);
        }
    }, [selectedPrescription]);

    return {
        pharmacies,
        selectedPharmacy,
        setSelectedPharmacy,
        isLoading,
        error,
    };
}
