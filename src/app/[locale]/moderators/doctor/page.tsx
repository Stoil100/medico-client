"use client";
import ModeratorDoctorForm from "@/components/forms/moderators/doctor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDeleteDoctor, useGetDoctors } from "@/api/moderators/doctor";

export default function DoctorsPage() {
    const t = useTranslations("Pages.Moderators.Doctors");

    const { data: doctors, isFetching } = useGetDoctors();

    const { mutate: deleteDoctor } = useDeleteDoctor();

    if (isFetching) {
        return <div>Loading...</div>;
    }

    const handleDeleteDoctor = (id: string) => {
        deleteDoctor(id);
    };

    return (
        <div className="space-y-2">
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
                            <ModeratorDoctorForm
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
                                <TableHead>{t("list.UIN")}</TableHead>
                                <TableHead className="flex justify-end">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctors && doctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell>{doctor.firstName}</TableCell>
                                    <TableCell>{doctor.secondName}</TableCell>
                                    <TableCell>{doctor.lastName}</TableCell>
                                    <TableCell>{doctor.uin}</TableCell>
                                    <TableCell className="flex justify-end">
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDeleteDoctor(doctor.id)
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
