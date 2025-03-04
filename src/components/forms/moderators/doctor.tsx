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
import { moderatorDoctorSchema as formSchema, ModeratorDoctorType } from "@/components/schemas/moderators";
import { useCreateDoctor } from "@/api/moderators/doctor";

type ModeratorDoctorFormProps = {
    t: (args: string) => string;
};

export default function ModeratorDoctorForm({ t }: ModeratorDoctorFormProps) {
    const form = useForm<ModeratorDoctorType>({
        resolver: zodResolver(formSchema((key)=>t(`errors.${key}`))),
        defaultValues: {
            firstName: "",
            secondName: "",
            lastName: "",
            uin: "",
            email: "",
            password: ""
        },
    });

    const {mutate: createDoctor} = useCreateDoctor();


    function onSubmit(data: ModeratorDoctorType) {
        createDoctor(data);
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
