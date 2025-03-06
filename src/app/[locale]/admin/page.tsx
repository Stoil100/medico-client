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
import { useDeleteModerator , useGetModerators } from "@/api/admin";
import Loader from "@/components/Loader";

export default function AdminPage() {
    const t = useTranslations("Pages.Admin");

    const { data: moderators, isFetching } = useGetModerators();

    const {mutate: deleteModerator} = useDeleteModerator();


    if (isFetching) {
        return <Loader/>;
    }

    const handleDeleteModerator = (id: string) => {
        deleteModerator(id);
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
                                <TableHead>{t("list.lastName")}</TableHead>
                                <TableHead>{t("list.email")}</TableHead>
                                <TableHead>{t("list.type")}</TableHead>
                                <TableHead className="w-[100px]">
                                    {t("list.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {moderators && moderators.map((moderator) => (
                                <TableRow key={moderator.id}>
                                    <TableCell>{moderator.firstName}</TableCell>
                                    <TableCell>{moderator.lastName}</TableCell>
                                    <TableCell>{moderator.email}</TableCell>
                                    <TableCell>
                                        {t(
                                            `list.types.${moderator.type.toLowerCase()}`
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
