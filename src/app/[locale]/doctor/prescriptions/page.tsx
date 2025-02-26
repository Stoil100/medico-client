"use client";

import { DoctorForm } from "@/components/forms/doctor";
import { useTranslations } from "next-intl";

export default function DoctorPrescriptionsPage() {
    const t = useTranslations("Pages.Doctor.Prescriptions");

    return (
        <div className="flex flex-col items-center space-y-8 p-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
                <DoctorForm t={(key) => t(`form.${key}`)} />
            </div>
        </div>
    );
}
