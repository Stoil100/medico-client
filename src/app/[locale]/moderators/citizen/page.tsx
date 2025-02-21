"use client";
import { useTranslations } from "next-intl";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ModeratorCitizenForm from "@/components/forms/moderators/citizen";

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
    const t = useTranslations("Pages.Moderator.Citizens");

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
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("form.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ModeratorCitizenForm t={(key) => t(`form.${key}`)} />
                </CardContent>
            </Card>
        </div>
    );
}
