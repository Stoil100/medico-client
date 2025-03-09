"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
    moderatorMedicamentSchema as formSchema,
    ModeratorMedicamentType,
} from "@/schemas/moderators";
import { useCreateMedicament } from "@/api/moderators/medicament";

type ModeratorMedicamentFormProps = {
    t: (args: string) => string;
};
export default function ModeratorMedicamentForm({
    t,
}: ModeratorMedicamentFormProps) {
    const form = useForm<ModeratorMedicamentType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            name: "",
            atc: "",
            activeIngredients: [{ value: "" }],
        },
    });

    const {mutate: createMedicament} = useCreateMedicament();

    function onSubmit(data: ModeratorMedicamentType) {
        createMedicament(data);
    }

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control: form.control,
        name: "activeIngredients",
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4 p-4 border rounded-md">
                    <FormField
                        control={form.control}
                        name={`name`}
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
                        name={"atc"}
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
                    <div className="space-y-2">
                        <FormLabel>{t("activeIngredients.label")}</FormLabel>
                        {ingredientFields.map(
                            (_, ingredientIndex) => (
                                <div
                                    key={ingredientIndex}
                                    className="flex space-x-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`activeIngredients.${ingredientIndex}.value`}
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
                                            removeIngredient(ingredientIndex);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            )
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                appendIngredient({
                                    value: "",
                                });
                            }}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {t("addIngredient")}
                        </Button>
                    </div>
                </div>
                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
