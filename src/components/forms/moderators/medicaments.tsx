"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { PlusCircle, Trash2 } from "lucide-react";
import { moderatorMedicamentsSchema as formSchema, ModeratorMedicamentsType } from "@/components/schemas/moderators";


type ModeratorMedicamentFormProps = {
    t: (args: string) => string;
};
export default function ModeratorMedicamentForm({
    t,
}: ModeratorMedicamentFormProps) {
    const form = useForm<ModeratorMedicamentsType>({
        resolver: zodResolver(formSchema((key)=>t(`errors.${key}`))),
        defaultValues: {
            medicaments: [
                { name: "", atc: "", activeIngridients: [{ value: "" }] },
            ],
        },
    });

    const {
        fields: medicamentFields,
        append: appendMedicament,
        remove: removeMedicament,
    } = useFieldArray({
        control: form.control,
        name: "medicaments",
    });

    function onSubmit(data: ModeratorMedicamentsType) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {medicamentFields.map((medicamentField, medicamentIndex) => (
                    <div
                        key={medicamentField.id}
                        className="space-y-4 p-4 border rounded-md"
                    >
                        {/* Medicament Name */}
                        <FormField
                            control={form.control}
                            name={`medicaments.${medicamentIndex}.name`}
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

                        {/* ATC Code */}
                        <FormField
                            control={form.control}
                            name={`medicaments.${medicamentIndex}.atc`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("atc.label")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("atc.placeholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Active Ingredients */}
                        <div className="space-y-2">
                            <FormLabel>
                                {t("activeIngredients.label")}
                            </FormLabel>
                            {form
                                .watch(
                                    `medicaments.${medicamentIndex}.activeIngridients`
                                )
                                .map((_, ingredientIndex) => (
                                    <div
                                        key={ingredientIndex}
                                        className="flex space-x-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`medicaments.${medicamentIndex}.activeIngridients.${ingredientIndex}.value`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            placeholder={t(
                                                                "activeIngredients.placeholder"
                                                            )}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const currentIngredients =
                                                    form.getValues(
                                                        `medicaments.${medicamentIndex}.activeIngridients`
                                                    );
                                                if (
                                                    currentIngredients.length >
                                                    1
                                                ) {
                                                    form.setValue(
                                                        `medicaments.${medicamentIndex}.activeIngridients`,
                                                        currentIngredients.filter(
                                                            (_, i) =>
                                                                i !==
                                                                ingredientIndex
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            {/* Add Active Ingredient */}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const currentIngredients = form.getValues(
                                        `medicaments.${medicamentIndex}.activeIngridients`
                                    );
                                    form.setValue(
                                        `medicaments.${medicamentIndex}.activeIngridients`,
                                        [
                                            ...currentIngredients,
                                            {
                                                id: Date.now().toString(),
                                                value: "",
                                            },
                                        ]
                                    );
                                }}
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                {t("addIngredient")}
                            </Button>
                        </div>

                        {/* Remove Medicament */}
                        {medicamentFields.length > 1 && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() =>
                                    removeMedicament(medicamentIndex)
                                }
                            >
                                {t("removeMedicament")}
                            </Button>
                        )}
                    </div>
                ))}

                {/* Add Medicament */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        appendMedicament({
                            name: "",
                            atc: "",
                            activeIngridients: [
                                { id: Date.now().toString(), value: "" },
                            ],
                        })
                    }
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {t("addMedicament")}
                </Button>

                {/* Submit Button */}
                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
