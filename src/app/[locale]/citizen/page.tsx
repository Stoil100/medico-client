"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, User, UserCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import { useMedicalInfo } from "@/api/citizen/useGetMedicalInfo";
import Loader from "@/components/Loader";


interface InfoItemProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
}

export default function CitizenPage() {
    const t = useTranslations("Pages.Citizen.Info");

    const {data: citizen} = useMedicalInfo();

    const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon }) => (
        <div className="flex items-center space-x-2">
            {icon}
            <span className="font-medium">{label}:</span>
            <span>{value || "N/A"}</span>
        </div>
    );

    if (!citizen) {
        return <Loader/>;
    }

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
                        value={citizen.firstName}
                        icon={<User className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("secondName")}
                        value={citizen.secondName}
                        icon={<User className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("lastName")}
                        value={citizen.lastName}
                        icon={<User className="w-4 h-4" />}
                    />
                    {/*<InfoItem*/}
                    {/*    label={t("age")}*/}
                    {/*    value={citizen.age}*/}
                    {/*    icon={<UserCircle className="w-4 h-4" />}*/}
                    {/*/>*/}
                    {/*<InfoItem*/}
                    {/*    label={t("birthday")}*/}
                    {/*    value={citizen.birthday}*/}
                    {/*    icon={<UserCircle className="w-4 h-4" />}*/}
                    {/*/>*/}
                    {/*<InfoItem*/}
                    {/*    label={t("sex")}*/}
                    {/*    value={citizen.sex}*/}
                    {/*    icon={<UserCircle className="w-4 h-4" />}*/}
                    {/*/>*/}
                    <InfoItem
                        label={t("ucn")}
                        value={citizen.ucn}
                        icon={<UserCircle className="w-4 h-4" />}
                    />
                    <InfoItem
                        label={t("email")}
                        value={citizen.email}
                        icon={<Mail className="w-4 h-4" />}
                    />
                </div>

                {/*<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>*/}
                {/*    <DialogTrigger asChild>*/}
                {/*        <Button variant="outline">{t("doctor.view")}</Button>*/}
                {/*    </DialogTrigger>*/}
                {/*    <DialogContent className="sm:max-w-[425px]">*/}
                {/*        <DialogHeader>*/}
                {/*            <DialogTitle>{t("doctor.title")}</DialogTitle>*/}
                {/*        </DialogHeader>*/}
                {/*        <div className="grid gap-4 py-4">*/}
                {/*            <InfoItem*/}
                {/*                label={t("doctor.firstName")}*/}
                {/*                value={citizen.personalDoctor.firstName}*/}
                {/*                icon={<User className="w-4 h-4" />}*/}
                {/*            />*/}
                {/*            <InfoItem*/}
                {/*                label={t("doctor.secondName")}*/}
                {/*                value={citizen.personalDoctor.secondName}*/}
                {/*                icon={<User className="w-4 h-4" />}*/}
                {/*            />*/}
                {/*            <InfoItem*/}
                {/*                label={t("doctor.lastName")}*/}
                {/*                value={citizen.personalDoctor.lastName}*/}
                {/*                icon={<User className="w-4 h-4" />}*/}
                {/*            />*/}
                {/*            <InfoItem*/}
                {/*                label={t("doctor.uin")}*/}
                {/*                value={citizen.personalDoctor.UIN}*/}
                {/*                icon={<UserCircle className="w-4 h-4" />}*/}
                {/*            />*/}
                {/*            <InfoItem*/}
                {/*                label={t("doctor.email")}*/}
                {/*                value={citizen.personalDoctor.email}*/}
                {/*                icon={<Mail className="w-4 h-4" />}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </DialogContent>*/}
                {/*</Dialog>*/}
            </CardContent>
        </Card>
    );
}
