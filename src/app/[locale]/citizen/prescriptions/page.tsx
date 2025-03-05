"use client";

import { usePrescriptions } from "@/components/citizen/prescriptions/hooks/usePrescription";
import { PrescriptionDetailDialog } from "@/components/citizen/prescriptions/Prescription/DetailDialog";
import { PrescriptionTabs } from "@/components/citizen/prescriptions/Prescription/Tabs";
import Loader from "@/components/Loader";
import { Prescription } from "@/components/models/Prescription";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CitizenPrescription } from "@/components/models/Citizen";

export default function CitizenPrescriptionsPage() {
    const t = useTranslations("Pages.Citizen.Prescriptions");
    const [selectedPrescription, setSelectedPrescription] =
        useState<CitizenPrescription | null>(null);
    const { groupedPrescriptions, isLoading } = usePrescriptions();

    return (
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{t("title")}</CardTitle>
                <CardDescription>{t("view")}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Loader />
                ) : (
                    <PrescriptionTabs
                        groupedPrescriptions={groupedPrescriptions}
                        onSelectPrescription={setSelectedPrescription}
                        t={(key) => t(`Tabs.${key}`)}
                    />
                )}

                <PrescriptionDetailDialog
                    prescription={selectedPrescription}
                    open={!!selectedPrescription}
                    onOpenChange={(open) =>
                        !open && setSelectedPrescription(null)
                    }
                    t={(key) => t(`Details.${key}`)}
                />
            </CardContent>
        </Card>
    );
}
