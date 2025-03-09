"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { pharmacyOwnerLoginSchema, PharmacyOwnerLoginType } from "@/schemas/pharmacy";
import { usePharmacyOwnerLogin } from "@/api/pharmacy/admin/usePharmacyOwnerLogin";
import { useRouter } from "@/i18n/routing";

export const PharmacyOwnerLoginForm = () => {
    const t = useTranslations("Pages.Auth.Login");

    const form = useForm<PharmacyOwnerLoginType>({
        resolver: zodResolver(pharmacyOwnerLoginSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const router = useRouter();

    const [visible, setVisible] = useState(false);

    const { mutate: pharmacyOwnerLogin } = usePharmacyOwnerLogin();

    const onSubmit = async (values: PharmacyOwnerLoginType) => {
        pharmacyOwnerLogin(values, {
            onSuccess: () => {
                router.push({pathname: "/pharmacy/admin"}, {locale: "bg"});
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-full w-full flex-col justify-between space-y-6 text-black"
            >
                <h3>{t("title")}</h3>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t("email")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex w-full gap-1">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        type={visible ? "text" : "password"}
                                        placeholder={t("password")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? <Eye /> : <EyeOff />}
                    </Button>
                </div>
                <Button type={"submit"}>
                    {t("submit")}
                </Button>
            </form>
        </Form>
    );
};
