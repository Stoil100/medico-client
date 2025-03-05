"use client";
import ModeratorPharmacyForm from "@/components/forms/moderators/pharmacy";
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
import { useDeletePharmacy, useGetPharmacies } from "@/api/moderators/pharmacy";
import Loader from "@/components/Loader";

export default function ModeratorsPharmaciesPage() {
    const t = useTranslations("Pages.Moderators.Pharmacies");

    const {data: pharmacies, isFetching} = useGetPharmacies();

    const {mutate: deletePharmacy} = useDeletePharmacy();

    const handleRemovePharmacy = (id: string) => {
        deletePharmacy(id)
    };

    if (isFetching) {
        return <Loader/>;
    }

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
                            <ModeratorPharmacyForm
                                t={(key) => t(`form.${key}`)}
                            />
                        </DialogContent>
                    </Dialog>
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
                            {pharmacies && pharmacies.map((pharmacy) => (
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
        </div>
    );
}
