"use client";

import { AddMedicamentForm } from "@/components/forms/pharmacy/addMedicament";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function PharmacyPharmacistMedicamentsPage() {
    const t = useTranslations("Pages.Pharmacy.Pharmacist.Medicaments");
    return (
        <div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <AddMedicamentForm t={t} />
                </CardContent>
            </Card>
        </div>
    );
}
