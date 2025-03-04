"use client";

import PharmacyAddBranchForm from "@/components/forms/pharmacy/admin/addBranch";
import PharmacyAddPharmacistForm from "@/components/forms/pharmacy/admin/addPharmacist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hospital, Pill, UserRoundPen } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PharmacyAdminPage() {
    const t = useTranslations("Pages.Pharmacy.Admin");

    return (
        <div className="container mx-auto py-4 md:py-8 md:px-4">
            <div className="mb-8 flex flex-col items-center text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Pill className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {t("title")}
                </h1>
                <p className="mt-2 text-muted-foreground">{t("description")}</p>
            </div>

            <Tabs defaultValue="pharmacist" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="pharmacist"
                        className="flex gap-2 justify-center bg-white"
                    >
                        <UserRoundPen />
                        <h4 className="max-md:hidden">
                            {t("Pharmacist.title")}
                        </h4>
                    </TabsTrigger>
                    <TabsTrigger
                        value="branch"
                        className="flex gap-2 justify-center bg-white"
                    >
                        <Hospital />
                        <h4 className="max-md:hidden">{t("Branch.title")}</h4>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="pharmacist">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("Pharmacist.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PharmacyAddPharmacistForm
                                t={(key) => t(`Pharmacist.form.${key}`)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="branch">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("Branch.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PharmacyAddBranchForm
                                t={(key) => t(`Branch.form.${key}`)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
