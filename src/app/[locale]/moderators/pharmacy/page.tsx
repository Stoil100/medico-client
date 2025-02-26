"use client";
import ModeratorPharmacyForm from "@/components/forms/moderators/pharmacy";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

interface Pharmacy {
    id: string;
    name: string;
    ownerName: string;
}

const mockPharmacies: Pharmacy[] = [
    { id: "1", name: "City Pharmacy", ownerName: "Alice Johnson" },
    { id: "2", name: "Health Plus", ownerName: "Bob Williams" },
];

export default function ModeratorsPharmaciesPage() {
    const t = useTranslations("Pages.Moderators.Pharmacies");

    const handleRemovePharmacy = (id: string) => {
        console.log(`Remove pharmacy with id: ${id}`);
    };

    return (
        <div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("list.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("list.name")}</TableHead>
                                <TableHead>{t("list.ownerName")}</TableHead>
                                <TableHead className="flex justify-end">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPharmacies.map((pharmacy) => (
                                <TableRow key={pharmacy.id}>
                                    <TableCell>{pharmacy.name}</TableCell>
                                    <TableCell>{pharmacy.ownerName}</TableCell>
                                    <TableCell className="flex justify-end">
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleRemovePharmacy(
                                                    pharmacy.id
                                                )
                                            }
                                        >
                                            {t("list.remove")}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("form.pharmacy.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ModeratorPharmacyForm
                        t={(key) => t(`form.pharmacy.${key}`)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
