"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
    moderatorCitizenSchema as formSchema,
    ModeratorCitizenType,
} from "@/schemas/moderators";
import { useCreateCitizen } from "@/api/moderators/citizen";

type ModeratorCitizenFormProps = {
    t: (args: string) => string;
};

export default function ModeratorCitizenForm({ t }: ModeratorCitizenFormProps) {
    const form = useForm<ModeratorCitizenType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            firstName: "",
            secondName: "",
            lastName: "",
            ucn: "",
            email: "",
            password: "",
        },
    });

    const {mutate: createDoctor} = useCreateCitizen();


    function onSubmit(values: ModeratorCitizenType) {
        createDoctor(values);
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
                    name="secondName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("secondName.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("secondName.placeholder")}
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
                    name="ucn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("ucn.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("ucn.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("email.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("email.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("password.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder={t("password.placeholder")}
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
