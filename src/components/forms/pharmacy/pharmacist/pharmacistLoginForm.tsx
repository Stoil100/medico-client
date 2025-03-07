"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { pharmacistLoginSchema, PharmacistLoginType } from "@/components/schemas/pharmacy";
import { usePharmacistLogin } from "@/api/pharmacy/pharmacist/usePharmacistLogin";
import { useRouter } from "@/i18n/routing";

export const PharmacistLoginForm = () => {
    const t = useTranslations("Pages.Auth.Login");

    const form = useForm<PharmacistLoginType>({
        resolver: zodResolver(pharmacistLoginSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [visible, setVisible] = useState(false);

    const {mutate: pharmacistLogin} = usePharmacistLogin();

    const router = useRouter();

    const onSubmit = async (values: PharmacistLoginType) => {
        pharmacistLogin(values, {
            onSuccess: () => {
                router.push({pathname: "/pharmacy/pharmacist"}, {locale: "bg"})
            }
        })
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
