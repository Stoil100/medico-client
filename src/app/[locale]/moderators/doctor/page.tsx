"use client";
import ModeratorDoctorForm from "@/components/forms/moderators/doctor";
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

interface Doctor {
    id: string;
    firstName: string;
    secondName: string;
    surname: string;
    UIN: string;
}

const mockDoctors: Doctor[] = [
    {
        id: "1",
        firstName: "John",
        secondName: "Michael",
        surname: "Doe",
        UIN: "1234567890",
    },
    {
        id: "2",
        firstName: "Jane",
        secondName: "Elizabeth",
        surname: "Smith",
        UIN: "0987654321",
    },
];

export default function DoctorsPage() {
    const t = useTranslations("Pages.Moderators.Doctors");

    const handleChangePassword = (id: string) => {
        console.log(`Change password for doctor with id: ${id}`);
        // Implement password change logic
    };

    const handleDeleteDoctor = (id: string) => {
        console.log(`Delete doctor with id: ${id}`);
        // Implement delete doctor logic
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
                                <TableHead>{t("list.surname")}</TableHead>
                                <TableHead>{t("list.UIN")}</TableHead>
                                <TableHead className="flex justify-end">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockDoctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell>{doctor.firstName}</TableCell>
                                    <TableCell>{doctor.secondName}</TableCell>
                                    <TableCell>{doctor.surname}</TableCell>
                                    <TableCell>{doctor.UIN}</TableCell>
                                    <TableCell className="flex justify-end">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleChangePassword(doctor.id)
                                            }
                                            className="mr-2"
                                        >
                                            {t("list.changePassword")}
                                        </Button>
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
