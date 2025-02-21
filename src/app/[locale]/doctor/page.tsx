"use client";

import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Mail, UserCircle } from "lucide-react";

interface Doctor {
    firstName: string;
    secondName: string;
    surname: string;
    age: number;
    birthday: string;
    sex: string;
    UCN: string;
    email: string;
    region: string;
    municipality: string;
    city: string;
    address: string;
}

interface InfoItemProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
}

export default function doctorPage() {
    const t = useTranslations("Pages.Doctor.Info");

    const doctor: Doctor = {
        firstName: "John",
        secondName: "Michael",
        surname: "Doe",
        age: 37,
        birthday: "1988-07-12",
        sex: "male",
        UCN: "8807120000",
        email: "john.doe@example.com",
        region: "Varna",
        city: "Varna",
        municipality: "Varna",
        address: "varna",
    };

    const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon }) => (
        <div className="flex items-center space-x-2  flex-wrap">
            {icon}
            <span className="font-medium">{label}:</span>
            <span>{value || "N/A"}</span>
        </div>
    );

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                    {t("title")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                        label={t("firstName")}
                        value={doctor.firstName}
                        icon={<User className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("secondName")}
                        value={doctor.secondName}
                        icon={<User className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("surname")}
                        value={doctor.surname}
                        icon={<User className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("age")}
                        value={doctor.age}
                        icon={<UserCircle className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("birthday")}
                        value={doctor.birthday}
                        icon={<UserCircle className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("sex")}
                        value={doctor.sex}
                        icon={<UserCircle className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("ucn")}
                        value={doctor.UCN}
                        icon={<UserCircle className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("email")}
                        value={doctor.email}
                        icon={<Mail className="w-4 h-4" />}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
