"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { moderatorDoctorSchema as formSchema } from "@/components/schemas/moderators";

type ModeratorDoctorFormValues = z.infer<typeof formSchema>;

type ModeratorDoctorFormProps = {
    t: (args: string) => string;
};

export default function ModeratorDoctorForm({ t }: ModeratorDoctorFormProps) {
    const form = useForm<ModeratorDoctorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            uin: "",
        },
    });

    function onSubmit(data: ModeratorDoctorFormValues) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("firstName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("firstName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("middleName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("middleName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("lastName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("lastName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="uin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("uin.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("uin.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
