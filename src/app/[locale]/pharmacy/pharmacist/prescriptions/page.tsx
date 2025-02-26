"use client";

import ListPrescriptionForm from "@/components/forms/pharmacy/listPrescription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function PharmacistsPage() {
    const t = useTranslations("Pages.Pharmacy.Pharmacist.Prescriptions");
    return (
        <div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ListPrescriptionForm t={(key)=>t(`form.${key}`)} />
                </CardContent>
            </Card>
        </div>
    );
}
