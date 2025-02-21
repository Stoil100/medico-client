"use client";

import type React from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Calendar, Pill } from "lucide-react";

interface Medicament {
    name: string;
    quantity: string;
    id: string;
}

interface Prescription {
    id: string;
    name: string;
    status: "active" | "fulfilled" | "invalid";
    issuedDate: string;
    expirationDate: string;
    medicaments: Medicament[];
    patientName: string;
}

const mockPrescriptions: Prescription[] = [
    {
        id: "1",
        name: "Antibiotic Treatment",
        status: "active",
        issuedDate: "2023-05-01",
        expirationDate: "2023-06-01",
        medicaments: [
            { name: "Amoxicillin", quantity: "500mg 3x daily", id: "med1" },
            { name: "Probiotics", quantity: "1 capsule daily", id: "med2" },
        ],
        patientName: "John Doe",
    },
    {
        id: "2",
        name: "Pain Management",
        status: "fulfilled",
        issuedDate: "2023-04-15",
        expirationDate: "2023-05-15",
        medicaments: [
            { name: "Ibuprofen", quantity: "400mg as needed", id: "med3" },
        ],
        patientName: "Jane Smith",
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
        patientName: "Alice Johnson",
    },
];

export default function DoctorsPage() {
    const t = useTranslations("Pages.Doctor.History");
    const [selectedPrescription, setSelectedPrescription] =
        useState<Prescription | null>(null);

    const groupedPrescriptions = mockPrescriptions.reduce(
        (acc, prescription) => {
            if (!acc[prescription.status]) {
                acc[prescription.status] = [];
            }
            acc[prescription.status].push(prescription);
            return acc;
        },
        {} as Record<string, Prescription[]>
    );

    const PrescriptionItem: React.FC<{ prescription: Prescription }> = ({
        prescription,
    }) => (
        <Button
            variant="ghost"
            className="w-full justify-start text-left"
            onClick={() => setSelectedPrescription(prescription)}
        >
            <div>
                <div className="font-medium">{prescription.name}</div>
                <div className="text-sm text-muted-foreground">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    {prescription.issuedDate}
                </div>
            </div>
        </Button>
    );

    const PrescriptionDetails: React.FC<{ prescription: Prescription }> = ({
        prescription,
    }) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{prescription.name}</h3>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <div className="text-sm font-medium">{t("status")}</div>
                    <div>{prescription.status}</div>
                </div>
                <div>
                    <div className="text-sm font-medium">{t("issuedDate")}</div>
                    <div>{prescription.issuedDate}</div>
                </div>
                <div>
                    <div className="text-sm font-medium">
                        {t("expirationDate")}
                    </div>
                    <div>{prescription.expirationDate}</div>
                </div>
                <div>
                    <div className="text-sm font-medium">{t("patient")}</div>
                    <div>{prescription.patientName}</div>
                </div>
            </div>
            <div>
                <div className="text-sm font-medium mb-2">
                    {t("medicaments")}
                </div>
                <ul className="space-y-2">
                    {prescription.medicaments.map((med) => (
                        <li key={med.id}>
                            <Link
                                href={`/medicaments/${med.id}`}
                                className="flex items-center hover:underline"
                            >
                                <Pill className="w-4 h-4 mr-2" />
                                {med.name} - {med.quantity}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="active">
                    <TabsList>
                        <TabsTrigger value="active">{t("active")}</TabsTrigger>
                        <TabsTrigger value="fulfilled">
                            {t("fulfilled")}
                        </TabsTrigger>
                        <TabsTrigger value="invalid">
                            {t("invalid")}
                        </TabsTrigger>
                    </TabsList>
                    {Object.entries(groupedPrescriptions).map(
                        ([status, prescriptions]) => (
                            <TabsContent key={status} value={status}>
                                <ScrollArea className="h-[300px]">
                                    {prescriptions.map((prescription) => (
                                        <PrescriptionItem
                                            key={prescription.id}
                                            prescription={prescription}
                                        />
                                    ))}
                                </ScrollArea>
                            </TabsContent>
                        )
                    )}
                </Tabs>

                <Dialog
                    open={!!selectedPrescription}
                    onOpenChange={() => setSelectedPrescription(null)}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {t("prescriptionDetails")}
                            </DialogTitle>
                        </DialogHeader>
                        {selectedPrescription && (
                            <PrescriptionDetails
                                prescription={selectedPrescription}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
