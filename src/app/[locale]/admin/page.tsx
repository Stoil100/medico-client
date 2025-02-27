"use client";

import AddModeratorForm from "@/components/forms/admin/moderators";
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
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
type Moderator = {
    id: string;
    firstName: string;
    surname: string;
    email: string;
    role: "doctor" | "citizen" | "medicaments" | "pharmacy";
};
const moderators: Moderator[] = [
    {
        id: "1",
        firstName: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        role: "doctor",
    },
    {
        id: "2",
        firstName: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        role: "citizen",
    },
    {
        id: "3",
        firstName: "Alex",
        surname: "Johnson",
        email: "alex.johnson@example.com",
        role: "medicaments",
    },
    {
        id: "4",
        firstName: "Maria",
        surname: "Garcia",
        email: "maria.garcia@example.com",
        role: "pharmacy",
    },
];
export default function AdminPage() {
    const t = useTranslations("Pages.Admin");

    const handleDeleteModerator = (id: string) => {
        console.log(`Delete doctor with id: ${id}`);
        // Implement delete doctor logic
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
                            <AddModeratorForm t={(key) => t(`form.${key}`)} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("list.firstName")}</TableHead>
                                <TableHead>{t("list.surname")}</TableHead>
                                <TableHead>{t("list.email")}</TableHead>
                                <TableHead>{t("list.role")}</TableHead>
                                <TableHead className="w-[100px]">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {moderators.map((moderator) => (
                                <TableRow key={moderator.id}>
                                    <TableCell>{moderator.firstName}</TableCell>
                                    <TableCell>{moderator.surname}</TableCell>
                                    <TableCell>{moderator.email}</TableCell>
                                    <TableCell>
                                        {t(
                                            `list.roles.${moderator.role.toLowerCase()}`
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteModerator(
                                                    moderator.id
                                                )
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
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
