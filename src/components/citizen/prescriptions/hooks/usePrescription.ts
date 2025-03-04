"use client";

import { Prescription } from "@/components/models/Prescription";
import { useEffect, useState } from "react";

export const mockPrescriptions: Prescription[] = [
    {
        id: "1",
        name: "Лечение с Антибиотик",
        status: "active",
        issuedDate: "2023-05-01",
        expirationDate: "2023-06-01",
        medicaments: [
            { name: "Азакс", quantity: "500mg 3x daily", id: "med1" },
            { name: "Пробиотик", quantity: "1 capsule daily", id: "med2" },
        ],
        doctor: {
            firstName: "Петър",
            lastName: "Данаилов",
            UIN: "123456",
            avatarUrl: "/placeholder.svg?height=40&width=40",
        },
    },
    {
        id: "2",
        name: "Премахване на болки",
        status: "active",
        issuedDate: "2023-04-15",
        expirationDate: "2023-05-15",
        medicaments: [
            { name: "Ибупрофен", quantity: "400mg as needed", id: "med3" },
        ],
        doctor: {
            firstName: "Георги",
            lastName: "Петков",
            UIN: "789012",
            avatarUrl: "/placeholder.svg?height=40&width=40",
        },
    },
    {
        id: "3",
        name: "Allergy Relief",
        status: "invalid",
        issuedDate: "2023-03-01",
        expirationDate: "2023-04-01",
        medicaments: [
            { name: "Cetirizine", quantity: "10mg daily", id: "med4" },
        ],
        doctor: {
            firstName: "Alice",
            lastName: "Johnson",
            UIN: "345678",
            avatarUrl: "/placeholder.svg?height=40&width=40",
        },
    },
    {
        id: "4",
        name: "Hypertension Treatment",
        status: "fulfilled",
        issuedDate: "2023-05-10",
        expirationDate: "2023-06-10",
        medicaments: [
            { name: "Lisinopril", quantity: "10mg daily", id: "med5" },
            {
                name: "Hydrochlorothiazide",
                quantity: "12.5mg daily",
                id: "med6",
            },
        ],
        doctor: {
            firstName: "Robert",
            lastName: "Williams",
            UIN: "567890",
            avatarUrl: "/placeholder.svg?height=40&width=40",
        },
    },
];

export function usePrescriptions() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Simulate API call
        const fetchPrescriptions = async () => {
            try {
                // In a real app, this would be an API call
                // const response = await fetch('/api/prescriptions');
                // const data = await response.json();

                // Using mock data for now
                setTimeout(() => {
                    setPrescriptions(mockPrescriptions);
                    setIsLoading(false);
                }, 300);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Failed to fetch prescriptions")
                );
                setIsLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    const groupedPrescriptions = prescriptions.reduce((acc, prescription) => {
        if (!acc[prescription.status]) {
            acc[prescription.status] = [];
        }
        acc[prescription.status].push(prescription);
        return acc;
    }, {} as Record<string, Prescription[]>);

    return {
        prescriptions,
        groupedPrescriptions,
        isLoading,
        error,
    };
}
