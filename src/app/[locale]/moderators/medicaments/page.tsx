"use client";
import ModeratorMedicamentForm from "@/components/forms/moderators/medicaments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface Medicament {
    id: string;
    officialName: string;
    activeIngredients: string[];
    ATC: string;
    requiredPrescription: boolean;
}

const mockMedicaments: Medicament[] = [
    {
        id: "1",
        officialName: "Aspirin",
        activeIngredients: ["Acetylsalicylic acid"],
        ATC: "N02BA01",
        requiredPrescription: false,
    },
    {
        id: "2",
        officialName: "Amoxicillin",
        activeIngredients: ["Amoxicillin trihydrate"],
        ATC: "J01CA04",
        requiredPrescription: true,
    },
];

export default function MedicamentsPage() {
    const t = useTranslations("Pages.Moderators.Medicaments");

    const handleDeleteMedicament = (id: string) => {
        console.log(`Delete medicament with id: ${id}`);
    };

    return (
        <div>
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{t("list.title")}</CardTitle>
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                asChild
                                className="w-fit border-2 hover:border-none border-dashed"
                                variant="outline"
                            >
                                <Plus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t("form.title")}</DialogTitle>
                            </DialogHeader>
                            <ModeratorMedicamentForm
                                t={(key) => t(`form.${key}`)}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("list.officialName")}</TableHead>
                                <TableHead>
                                    {t("list.activeIngredients")}
                                </TableHead>
                                <TableHead>{t("list.ATC")}</TableHead>
                                <TableHead>
                                    {t("list.requiredPrescription")}
                                </TableHead>
                                <TableHead className="flex justify-end">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockMedicaments.map((medicament) => (
                                <TableRow key={medicament.id}>
                                    <TableCell>
                                        {medicament.officialName}
                                    </TableCell>
                                    <TableCell>
                                        {medicament.activeIngredients.join(
                                            ", "
                                        )}
                                    </TableCell>
                                    <TableCell>{medicament.ATC}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                medicament.requiredPrescription
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {medicament.requiredPrescription
                                                ? t("list.yes")
                                                : t("list.no")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDeleteMedicament(
                                                    medicament.id
                                                )
                                            }
                                        >
                                            {t("list.delete")}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
