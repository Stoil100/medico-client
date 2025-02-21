"use client";

import ListPrescriptionForm from "@/components/forms/pharmacy/listPrescription";
import { AddMedicamentForm } from "@/components/forms/pharmacy/addMedicament";
import { useTranslations } from "next-intl";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PharmacistsPage() {
    const t = useTranslations("Pages.Pharmacy.Pharmacist");
    return (
        <div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("prescriptions.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ListPrescriptionForm
                        t={(key) => t(`prescriptions.${key}`)}
                    />
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("medicaments.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <AddMedicamentForm t={(key) => t(`medicaments.${key}`)} />
                </CardContent>
            </Card>
        </div>
    );
}
