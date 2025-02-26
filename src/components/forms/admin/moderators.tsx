"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AddModeratorType,
    addModeratorSchema as formSchema,
} from "@/components/schemas/admin";

type AddModeratorFormProps = {
    t: (args: string) => string;
};
export default function AddModeratorForm({ t }: AddModeratorFormProps) {
    const form = useForm<AddModeratorType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            firstName: "",
            secondName: "",
            surname: "",
            role: "doctor",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: AddModeratorType) {
        console.log(data);
        // Here you would typically send the data to your API
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("firstName.label")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                                    {...field}
                                    placeholder={t("secondName.placeholder")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("surname.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={t("surname.placeholder")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("roles.label")}</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t("roles.placeholder")}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="doctor">
                                        {t("roles.doctor")}
                                    </SelectItem>
                                    <SelectItem value="pharmacy">
                                        {t("roles.pharmacy")}
                                    </SelectItem>
                                    <SelectItem value="citizen">
                                        {t("roles.citizen")}
                                    </SelectItem>
                                    <SelectItem value="medicaments">
                                        {t("roles.medicaments")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
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
                                    {...field}
                                    type="email"
                                    placeholder={t("email.placeholder")}
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
                                    {...field}
                                    type="password"
                                    placeholder={t("password.placeholder")}
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
