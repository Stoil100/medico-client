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

interface Citizen {
    id: string;
    firstName: string;
    secondName: string;
    surname: string;
    UCN: string;
}

const mockCitizens: Citizen[] = [
    {
        id: "1",
        firstName: "Emma",
        secondName: "Rose",
        surname: "Taylor",
        UCN: "9876543210",
    },
    {
        id: "2",
        firstName: "Liam",
        secondName: "James",
        surname: "Brown",
        UCN: "1234567890",
    },
];

export default function CitizensPage() {
    const t = useTranslations("Pages.Moderators.Citizens");

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
                                <TableHead>{t("list.surname")}</TableHead>
                                <TableHead className="flex justify-end">
                                    {t("list.UCN")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCitizens.map((citizen) => (
                                <TableRow key={citizen.id}>
                                    <TableCell>{citizen.firstName}</TableCell>
                                    <TableCell>{citizen.secondName}</TableCell>
                                    <TableCell>{citizen.surname}</TableCell>
                                    <TableCell className="flex justify-end">
                                        {citizen.UCN}
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
