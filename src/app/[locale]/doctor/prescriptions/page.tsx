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
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useGetCitizenInfo, useGetCitizenPrescriptions } from "@/api/doctor";

export default function DoctorPrescriptionsPage() {
    const t = useTranslations("Pages.Doctor.Prescriptions");
    const [citizenUcn, setCitizenUcn] = useState<string>("");

    const {data: currentCitizen} = useGetCitizenInfo(citizenUcn, citizenUcn.length === 10);

    const citizenId = currentCitizen?.id;

    const {data: prescriptions} = useGetCitizenPrescriptions(citizenId)

    return (
        <div className="flex flex-col items-center space-y-8 p-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <SearchCitizenForm
                    t={(key) => t(`forms.search.${key}`)}
                    setCitizenUcn={setCitizenUcn}
                />
                {citizenUcn && (
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
                                        {prescriptions && prescriptions.map((prescription) => (
                                            <TableRow key={prescription.id}>
                                                <TableCell className="font-medium">
                                                    {prescription.name}
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
                                                                        medicament.officialName
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
