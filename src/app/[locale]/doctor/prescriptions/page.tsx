"use client";

import IssuePrescriptionForm from "@/components/forms/doctor/issuePrescription";
import SearchCitizenForm from "@/components/forms/doctor/searchCitizen";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Medicament {
    value: string;
    quantity: number;
}

interface Prescription {
    id: number;
    name: string;
    status: "active" | "fulfilled" | "invalid";
    issuedDate: string;
    expirationDate: string;
    medicaments: Medicament[];
}
export default function DoctorPrescriptionsPage() {
    const t = useTranslations("Pages.Doctor.Prescriptions");
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [citizenId, setCitizenId] = useState<string>();
    useEffect(() => {
        if (!citizenId) return;

        const fetchPrescriptions = async () => {
            try {
                // Simulating a real API request
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${citizenId}`
                );

                // Simulating mock data transformation from API response
                const mockPrescriptions: Prescription[] = [
                    {
                        id: 1,
                        name: "Blood Pressure Control",
                        status: "active",
                        issuedDate: "2025-02-15",
                        expirationDate: "2025-08-15",
                        medicaments: [
                            { value: "Lisinopril", quantity: 30 },
                            { value: "Amlodipine", quantity: 30 },
                        ],
                    },
                    {
                        id: 2,
                        name: "Pain Relief",
                        status: "fulfilled",
                        issuedDate: "2024-12-01",
                        expirationDate: "2025-06-01",
                        medicaments: [
                            { value: "Ibuprofen", quantity: 20 },
                            { value: "Paracetamol", quantity: 15 },
                        ],
                    },
                    {
                        id: 3,
                        name: "Diabetes Treatment",
                        status: "invalid",
                        issuedDate: "2023-05-20",
                        expirationDate: "2023-11-20",
                        medicaments: [
                            { value: "Metformin", quantity: 60 },
                            { value: "Insulin Glargine", quantity: 10 },
                        ],
                    },
                ];

                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                setPrescriptions(mockPrescriptions);
            } catch (err) {
                console.error("Failed to fetch prescriptions");
            }
        };

        fetchPrescriptions();
    }, [citizenId]);

    return (
        <div className="flex flex-col items-center space-y-8 p-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <SearchCitizenForm
                    t={(key) => t(`forms.search.${key}`)}
                    setCitizenId={setCitizenId}
                />
                {citizenId && (
                    <div className="mt-8">
                        <Tabs defaultValue="issue" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="issue">
                                    {t("tabs.prescriptions")}
                                </TabsTrigger>
                                <TabsTrigger value="history">
                                    {t("tabs.history")}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="issue" className="mt-4">
                                <IssuePrescriptionForm
                                    t={(key) => t(`forms.prescription.${key}`)}
                                    citizenId={citizenId}
                                />
                            </TabsContent>
                            <TabsContent value="history" className="mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                {t("table.id")}
                                            </TableHead>
                                            <TableHead>
                                                {t("table.date")}
                                            </TableHead>
                                            <TableHead>
                                                {t("table.medications")}
                                            </TableHead>
                                            <TableHead className="self-end">
                                                {t("table.status")}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {prescriptions.map((prescription) => (
                                            <TableRow key={prescription.id}>
                                                <TableCell className="font-medium">
                                                    {prescription.id}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        prescription.issuedDate
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    {prescription.medicaments.map(
                                                        (medicament, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex gap-2"
                                                            >
                                                                <p>
                                                                    {
                                                                        medicament.value
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        medicament.quantity
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {prescription.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            </div>
        </div>
    );
}
