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
import { moderatorPharmacySchema as formSchema, ModeratorPharmacyType } from "@/schemas/moderators";
import { useCreatePharmacy } from "@/api/moderators/pharmacy";

type ModeratorPharmacyFormProps = {
    t: (args: string) => string;
};
export default function ModeratorPharmacyForm({
    t,
}: ModeratorPharmacyFormProps) {
    const form = useForm<ModeratorPharmacyType>({
        resolver: zodResolver(formSchema((key)=>t(`errors.${key}`))),
        defaultValues: {
            name: "",
            ownerEmail: "",
            ownerName: "",
            ownerPassword: ""
        },
    });

    const {mutate: createPharmacy}= useCreatePharmacy();

    function onSubmit(data: ModeratorPharmacyType) {
        createPharmacy(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("name.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("ownerName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("ownerName.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ownerEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("ownerEmail.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("ownerEmail.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ownerPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("ownerPassword.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("ownerPassword.placeholder")}
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
