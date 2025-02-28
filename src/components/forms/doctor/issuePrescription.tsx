"use client";

import {
    type IssuePrescriptionType,
    issuePrescriptionSchema as formSchema,
} from "@/components/schemas/doctor";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// Sample medicaments data - in a real app, this would likely come from an API
const MEDICAMENTS = [
    "Аспирин",
    "Ibuprofen",
    "Paracetamol",
    "Amoxicillin",
    "Lisinopril",
    "Metformin",
    "Atorvastatin",
    "Omeprazole",
    "Losartan",
    "Simvastatin",
    "Metoprolol",
    "Amlodipine",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Sertraline",
];

type IssuePrescriptionFormProps = {
    t: (args: string) => string;
    citizenId: string;
};

export default function IssuePrescriptionForm({
    t,
    citizenId,
}: IssuePrescriptionFormProps) {
    // Initialize form with Zod validation
    const form = useForm<IssuePrescriptionType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            name:"",
            medicaments: [{ number: 1, value: "" }],
        },
    });

    // Use field array for managing dynamic medicaments
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "medicaments",
    });

    // Memoize the medicaments list to prevent unnecessary re-renders
    const medicamentsList = useMemo(() => MEDICAMENTS, []);

    // Handle form submission
    function handleSubmit(data: IssuePrescriptionType) {
        console.log(data);
    }

    // Add a new medicament field
    const addMedicament = useCallback(() => {
        append({ number: 1, value: "" });
    }, [append]);

    // Remove a medicament field
    const removeMedicament = useCallback(
        (index: number) => {
            if (fields.length > 1) {
                remove(index);
            }
        },
        [fields.length, remove]
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
                noValidate
            >
                <div className="space-y-4">
                    <FormLabel className="text-lg font-medium">
                        {t("title")}
                    </FormLabel>
                    <FormField
                        control={form.control}
                        name="name"
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
                    <ScrollArea className="max-h-[400px] pr-4">
                        <ul className="space-y-4">
                            {fields.map((field, index) => (
                                <li
                                    key={field.id}
                                    className="flex flex-col sm:flex-row sm:items-end gap-4 p-4 border rounded-md bg-card"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`medicaments.${index}.value`}
                                        render={({ field: valueField }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel
                                                    htmlFor={`medicaments-${index}`}
                                                >
                                                    {t("medicaments.label")}
                                                </FormLabel>
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
                                                                    "medicaments.select"
                                                                )}
                                                                className={cn(
                                                                    "w-full justify-between",
                                                                    !valueField.value &&
                                                                        "text-muted-foreground"
                                                                )}
                                                            >
                                                                {valueField.value
                                                                    ? medicamentsList.find(
                                                                          (
                                                                              medicament
                                                                          ) =>
                                                                              medicament ===
                                                                              valueField.value
                                                                      )
                                                                    : t(
                                                                          "medicaments.select"
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
                                                                    "medicaments.search"
                                                                )}
                                                                className="h-9"
                                                            />
                                                            <CommandList>
                                                                <CommandEmpty>
                                                                    {t(
                                                                        "medicaments.notFound"
                                                                    )}
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    <ScrollArea className="h-[200px]">
                                                                        {medicamentsList.map(
                                                                            (
                                                                                medicament
                                                                            ) => (
                                                                                <CommandItem
                                                                                    value={
                                                                                        medicament
                                                                                    }
                                                                                    key={
                                                                                        medicament
                                                                                    }
                                                                                    onSelect={() => {
                                                                                        form.setValue(
                                                                                            `medicaments.${index}.value`,
                                                                                            medicament,
                                                                                            {
                                                                                                shouldValidate:
                                                                                                    true,
                                                                                            }
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        medicament
                                                                                    }
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            medicament ===
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
                                        name={`medicaments.${index}.number`}
                                        render={({ field: numberField }) => (
                                            <FormItem className="w-full sm:w-24">
                                                <FormLabel
                                                    htmlFor={`quantity-${index}`}
                                                >
                                                    {t("medicaments.quantity")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={`quantity-${index}`}
                                                        type="number"
                                                        inputMode="numeric"
                                                        min={1}
                                                        {...numberField}
                                                        onChange={(e) =>
                                                            numberField.onChange(
                                                                Number.parseInt(
                                                                    e.target
                                                                        .value
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
                                        variant="destructive"
                                        size="icon"
                                        className="mt-auto"
                                        onClick={() => removeMedicament(index)}
                                        disabled={fields.length <= 1}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={addMedicament}
                    >
                        <Plus className="h-4 w-4 mr-2" /> {t("medicaments.add")}
                    </Button>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="submit">{t("submit")}</Button>
                </div>
            </form>
        </Form>
    );
}
