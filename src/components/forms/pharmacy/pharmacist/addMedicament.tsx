"use client";

import {
  AddMedicamentsType,
  addMedicamentsSchema as formSchema,
} from "@/components/schemas/pharmacy";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useGetMedicamentsByCommonName } from "@/api/doctor/useGetMedicamentsByCommonName";
import { useAddMedicamentsToBranch } from "@/api/pharmacy/pharmacist/useAddMedicamentsToBranch";

type AddMedicamentsFormProps = {
    t: (args: string) => string;
};

export function AddMedicamentsForm({ t }: AddMedicamentsFormProps) {
    const form = useForm<AddMedicamentsType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            medicaments: [{ id: "", quantity: 1 }],
        },
    });

    const {mutate: addMedicament} = useAddMedicamentsToBranch()

    async function onSubmit(values: AddMedicamentsType) {
        addMedicament(values)
    }

    const [medicamentName, setMedicamentName] = useState<string>("");
    const {data: medicaments} = useGetMedicamentsByCommonName(medicamentName);

    const { fields, append, remove } = useFieldArray({
        name: "medicaments",
        control: form.control,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
            >
                <FormLabel className="text-2xl font-semibold text-gray-800 mb-4 block">
                    {t("title")}
                </FormLabel>
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-100"
                    >
                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name={`medicaments.${index}.value`}*/}
                        {/*    render={({ field }) => (*/}
                        {/*        <FormItem className="flex-grow">*/}
                        {/*            <FormControl>*/}
                        {/*                <Input*/}
                        {/*                    {...field}*/}
                        {/*                    placeholder={t("medicament")}*/}
                        {/*                    className="w-full"*/}
                        {/*                />*/}
                        {/*            </FormControl>*/}
                        {/*            <FormMessage />*/}
                        {/*        </FormItem>*/}
                        {/*    )}*/}
                        {/*/>*/}

                        <FormField
                            control={form.control}
                            name={`medicaments.${index}.id`}
                            render={({ field: valueField }) => (
                                <FormItem className="flex-1">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    id={`medicaments-${index}`}
                                                    aria-expanded={
                                                        false
                                                    }
                                                    aria-label={t(
                                                        "medicament.select"
                                                    )}
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !valueField.value &&
                                                        "text-muted-foreground"
                                                    )}
                                                >
                                                    {valueField.value
                                                        ? medicaments && medicaments.find(
                                                        (
                                                            medicament
                                                        ) =>
                                                            medicament.id ===
                                                            valueField.value
                                                    )?.officialName
                                                        : t(
                                                            "medicament.select"
                                                        )}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-full p-0"
                                            align="start"
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder={t(
                                                        "medicament.search"
                                                    )}
                                                    className="h-9"
                                                    onValueChange={setMedicamentName}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        {t(
                                                            "medicament.notFound"
                                                        )}
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        <ScrollArea className="h-[200px]">
                                                            {medicaments && medicaments.map(
                                                                (
                                                                    medicament
                                                                ) => (

                                                                    <CommandItem
                                                                        value={
                                                                            medicament.officialName
                                                                        }
                                                                        key={
                                                                            medicament.id
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                `medicaments.${index}.id`,
                                                                                medicament.id,
                                                                                {
                                                                                    shouldValidate:
                                                                                        true,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            medicament.officialName
                                                                        }
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                medicament.id ===
                                                                                valueField.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </ScrollArea>
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`medicaments.${index}.quantity`}
                            render={({ field }) => (
                                <FormItem className="w-24">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder={t("quantity")}
                                            min={1}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 1
                                                )
                                            }
                                            className="w-full"
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
                            className="mt-2 sm:mt-0 w-full sm:w-auto transition-all duration-300 ease-in-out hover:bg-red-600"
                        >
                            <span className="hidden sm:inline">
                                {t("remove")}
                            </span>
                            <Trash2 className="sm:ml-2 h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            append({ id: "", quantity: 1 })
                        }
                        className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:bg-gray-200"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        {t("add")}
                    </Button>
                    <Button
                        type="submit"
                        className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:bg-blue-600"
                    >
                        {t("submit")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
