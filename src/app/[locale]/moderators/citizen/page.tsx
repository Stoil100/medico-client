"use client";
import ModeratorCitizenForm from "@/components/forms/moderators/citizen";
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
import { useDeleteCitizen, useGetCitizens } from "@/api/moderators/citizen";

export default function CitizensPage() {
    const t = useTranslations("Pages.Moderators.Citizens");

    const { data: citizens, isFetching } = useGetCitizens();

    const { mutate: deleteCitizen } = useDeleteCitizen();

    if (isFetching) {
        return <div>Loading...</div>;
    }

    const handleDeleteDoctor = (id: string) => {
        deleteCitizen(id);
    };

    return (
        <div className="p-4 space-y-2">
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
                            <ModeratorCitizenForm
                                t={(key) => t(`form.${key}`)}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("list.firstName")}</TableHead>
                                <TableHead>{t("list.secondName")}</TableHead>
                                <TableHead>{t("list.lastName")}</TableHead>
                                <TableHead>{t("list.UCN")}</TableHead>
                                <TableHead className="flex justify-end">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {citizens && citizens.map((citizen) => (
                                <TableRow key={citizen.id}>
                                    <TableCell>{citizen.firstName}</TableCell>
                                    <TableCell>{citizen.secondName}</TableCell>
                                    <TableCell>{citizen.lastName}</TableCell>
                                    <TableCell>{citizen.ucn}</TableCell>
                                    <TableCell className="flex justify-end">
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDeleteDoctor(citizen.id)
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
