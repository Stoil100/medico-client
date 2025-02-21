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
import { moderatorPharmacySchema as formSchema } from "@/components/schemas/moderators";

type ModeratorPharmacyFormValues = z.infer<typeof formSchema>;

type ModeratorPharmacyFormProps = {
    t: (args: string) => string;
};
export default function ModeratorPharmacyForm({
    t,
}: ModeratorPharmacyFormProps) {
    const form = useForm<ModeratorPharmacyFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(data: ModeratorPharmacyFormValues) {
        console.log(data);
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

                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
