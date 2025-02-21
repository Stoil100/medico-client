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
import { addModeratorSchema as formSchema } from "@/components/schemas/admin";


type ModeratorFormValues = z.infer<typeof formSchema>;

export default function AdminModeratorForm() {
    const t = useTranslations("Forms.AddModerator");

    const form = useForm<ModeratorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            secondName: "",
            surname: "",
            role: "doctor",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: ModeratorFormValues) {
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
                            <FormLabel>{t("firstName")}</FormLabel>
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
                            <FormLabel>{t("secondName")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("secondNameOptional")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("surname")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                            <FormLabel>{t("role")}</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t("selectRole")}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="doctor">
                                        {t("roleDoctor")}
                                    </SelectItem>
                                    <SelectItem value="pharmacy">
                                        {t("rolePharmacy")}
                                    </SelectItem>
                                    <SelectItem value="citizen">
                                        {t("roleCitizen")}
                                    </SelectItem>
                                    <SelectItem value="medicaments">
                                        {t("roleMedicaments")}
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
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" />
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
                            <FormLabel>{t("password")}</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
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
