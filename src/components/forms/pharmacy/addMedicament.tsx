"use client";
import { addMedicamentsSchema as formSchema } from "@/components/schemas/pharmacy";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

type AddMedicamentFormProps = {
    t: (args: string) => string;
};

export function AddMedicamentForm({ t }: AddMedicamentFormProps) {
    type FormValues = z.infer<typeof formSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            medicaments: [{ id: Date.now(), value: "", number: 1 }],
        },
    });

    async function onSubmit(values: FormValues) {
        console.log(values);
    }

    const { fields, append, remove } = useFieldArray({
        name: "medicaments",
        control: form.control,
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormLabel>{t("title")}</FormLabel>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`medicaments.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={t(
                                                "medicamentPlaceholder"
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`medicaments.${index}.number`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder={t(
                                                "quantityPlaceholder"
                                            )}
                                            min={1}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 1
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="destructive"
                        >
                            <p className="max-md:hidden">
                                {t("removeMedicament")}
                            </p>
                            <Trash2 className="md:hidden" />
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                        append({ id: Date.now(), value: "", number: 1 })
                    }
                >
                    {t("addMedicament")}
                </Button>
                <Button type="submit">{t("submitButton")}</Button>
            </form>
        </FormProvider>
    );
}
