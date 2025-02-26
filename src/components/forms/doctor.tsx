"use client";

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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import {
    DoctorType,
    doctorSchema as formSchema,
} from "../schemas/doctor";

const patients = [
    { name: "Петър Димитров", ucn: "0105050505" },
    { name: "Jane Smith", ucn: "0205050505" },
    { name: "Alice Johnson", ucn: "0305050505" },
    { name: "Bob Williams", ucn: "0405050505" },
    { name: "Charlie Brown", ucn: "0505050505" },
] as const;
const medicaments = [
    "Аспирин",
    "Ibuprofen",
    "Paracetamol",
    "Amoxicillin",
    "Lisinopril",
    "Metformin",
];

type DoctorFormProps = {
    t: (args: string) => string;
};

export function DoctorForm({ t }: DoctorFormProps) {
    const form = useForm<DoctorType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            prescriptions: [
                {
                    patient: "",
                    ucn: "",
                    medicaments: [{ number: 1, value: "" }],
                },
            ],
        },
    });

    const {
        fields: prescriptionFields,
        append: appendPrescription,
        remove: removePrescription,
    } = useFieldArray({
        control: form.control,
        name: "prescriptions",
    });

    const onSubmit = (data: DoctorType) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {prescriptionFields.map(
                    (prescriptionField, prescriptionIndex) => (
                        <div
                            key={prescriptionField.id}
                            className="space-y-4 p-6 border rounded-md bg-gray-50"
                        >
                            <FormField
                                control={form.control}
                                name={`prescriptions.${prescriptionIndex}.patient`}
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>{t("patient")}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? patients.find(
                                                                  (patient) =>
                                                                      patient.name ===
                                                                      field.value
                                                              )?.name
                                                            : t(
                                                                  "selectPatient"
                                                              )}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder={t(
                                                            "selectPatient"
                                                        )}
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            {t(
                                                                "noPatientFound"
                                                            )}
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {patients.map(
                                                                (
                                                                    patient,
                                                                    index
                                                                ) => (
                                                                    <CommandItem
                                                                        value={
                                                                            patient.name
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                `prescriptions.${prescriptionIndex}.patient`,
                                                                                patient.name
                                                                            );
                                                                            form.setValue(
                                                                                `prescriptions.${prescriptionIndex}.ucn`,
                                                                                patient.ucn
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            patient.name
                                                                        }
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                patient.name ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
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
                                name={`prescriptions.${prescriptionIndex}.ucn`}
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>{t("ucn")}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? patients.find(
                                                                  (patient) =>
                                                                      patient.ucn ===
                                                                      field.value
                                                              )?.ucn
                                                            : t("selectUCN")}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder={t(
                                                            "selectUCN"
                                                        )}
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            {t(
                                                                "noPatientFound"
                                                            )}
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {patients.map(
                                                                (
                                                                    patient,
                                                                    index
                                                                ) => (
                                                                    <CommandItem
                                                                        value={
                                                                            patient.ucn
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                `prescriptions.${prescriptionIndex}.patient`,
                                                                                patient.name
                                                                            );
                                                                            form.setValue(
                                                                                `prescriptions.${prescriptionIndex}.ucn`,
                                                                                patient.ucn
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            patient.ucn
                                                                        }
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                patient.ucn ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormLabel>{t("medicaments")}</FormLabel>
                                <ul className="space-y-4 mt-2">
                                    {form
                                        .watch(
                                            `prescriptions.${prescriptionIndex}.medicaments`
                                        )
                                        .map((_, medicamentIndex) => (
                                            <li
                                                key={medicamentIndex}
                                                className="flex items-end gap-4"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name={`prescriptions.${prescriptionIndex}.medicaments.${medicamentIndex}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel>
                                                                {t(
                                                                    "medicament"
                                                                )}
                                                            </FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger
                                                                    asChild
                                                                >
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className={cn(
                                                                                "w-full justify-between",
                                                                                !field.value &&
                                                                                    "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value
                                                                                ? medicaments.find(
                                                                                      (
                                                                                          medicament
                                                                                      ) =>
                                                                                          medicament ===
                                                                                          field.value
                                                                                  )
                                                                                : t(
                                                                                      "selectMedicament"
                                                                                  )}
                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-full p-0">
                                                                    <Command>
                                                                        <CommandInput
                                                                            placeholder={t(
                                                                                "selectMedicament"
                                                                            )}
                                                                        />
                                                                        <CommandList>
                                                                            <CommandEmpty>
                                                                                {t(
                                                                                    "noMedicamentFound"
                                                                                )}
                                                                            </CommandEmpty>
                                                                            <CommandGroup>
                                                                                <div>
                                                                                    {medicaments.map(
                                                                                        (
                                                                                            medicament,
                                                                                            index
                                                                                        ) => (
                                                                                            <CommandItem
                                                                                                value={
                                                                                                    medicament
                                                                                                }
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                onSelect={() => {
                                                                                                    form.setValue(
                                                                                                        `prescriptions.${prescriptionIndex}.medicaments.${medicamentIndex}.value`,
                                                                                                        medicament
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    medicament
                                                                                                }
                                                                                                <Check
                                                                                                    className={cn(
                                                                                                        "ml-auto",
                                                                                                        medicament ===
                                                                                                            field.value
                                                                                                            ? "opacity-100"
                                                                                                            : "opacity-0"
                                                                                                    )}
                                                                                                />
                                                                                            </CommandItem>
                                                                                        )
                                                                                    )}
                                                                                </div>
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
                                                    name={`prescriptions.${prescriptionIndex}.medicaments.${medicamentIndex}.number`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    {...field}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        field.onChange(
                                                                            Number.parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ) ||
                                                                                1
                                                                        )
                                                                    }
                                                                    min={1}
                                                                    className="w-20"
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
                                                        const medicaments =
                                                            form.getValues(
                                                                `prescriptions.${prescriptionIndex}.medicaments`
                                                            );
                                                        if (
                                                            medicaments.length >
                                                            1
                                                        ) {
                                                            const updatedMedicaments =
                                                                medicaments.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        medicamentIndex
                                                                );
                                                            form.setValue(
                                                                `prescriptions.${prescriptionIndex}.medicaments`,
                                                                updatedMedicaments
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </li>
                                        ))}
                                </ul>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => {
                                        const medicaments = form.getValues(
                                            `prescriptions.${prescriptionIndex}.medicaments`
                                        );
                                        form.setValue(
                                            `prescriptions.${prescriptionIndex}.medicaments`,
                                            [
                                                ...medicaments,
                                                { number: 1, value: "" },
                                            ]
                                        );
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />{" "}
                                    {t("addMedicament")}
                                </Button>
                            </div>

                            {prescriptionFields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() =>
                                        removePrescription(prescriptionIndex)
                                    }
                                >
                                    {t("removePrescription")}
                                </Button>
                            )}
                        </div>
                    )
                )}
                <div className="space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            appendPrescription({
                                patient: "",
                                ucn: "",
                                medicaments: [{ number: 1, value: "" }],
                            })
                        }
                    >
                        {t("addPrescription")}
                    </Button>

                    <Button type="submit">{t("submit")}</Button>
                </div>
            </form>
        </Form>
    );
}
