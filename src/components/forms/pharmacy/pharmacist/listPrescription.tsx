"use client";

import React, { useEffect } from "react";

import {
    listPrescriptionsSchema as formSchema,
    ListPrescriptionsType
} from "@/schemas/pharmacy";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useGetCitizenPrescriptions } from "@/api/pharmacy/pharmacist/useGetCitizenPrescriptions";
import { useFulfillMedicamentFromPrescription } from "@/api/pharmacy/pharmacist/useFulfillMedicamentFromPrescription";

type ListPrescriptionFormProps = {
    t: (args: string) => string;
};

const ListPrescriptionForm: React.FC<ListPrescriptionFormProps> = ({ t }) => {

    const [ucn, setUcn] = useState<string>("");

    const { data: prescriptions } = useGetCitizenPrescriptions(ucn);

    // Update the form type and default values
    const form = useForm<ListPrescriptionsType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            ucn: "",
            prescriptions: []
        }
    });

    const {mutate: fulfillMedicament} = useFulfillMedicamentFromPrescription();

    const onSubmit = (values: ListPrescriptionsType) => {
        let temp: ListPrescriptionsType = {ucn: "", prescriptions: []};
        temp.ucn = values.ucn;
        for (let i = 0; i < temp.prescriptions.length; i++) {
            if (!values.prescriptions[i].id && values.prescriptions[i].id!=""){
                temp.prescriptions.push(values.prescriptions[i]);
            }
        }
        fulfillMedicament(temp);
        console.log(values);
    };

    return (
        <>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {t("title")}
                    </h2>
                    <FormField
                        control={form.control}
                        name="ucn"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>{t("ucnLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("selectPatient")}
                                        {...field}
                                        onInput={(event)=> {setUcn(event.currentTarget.value)}}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {prescriptions && prescriptions.length > 0 && (
                        <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {t("prescriptionsList")}
                            </h3>
                            {prescriptions.map(
                                (prescription, prescriptionIndex) => (
                                    <FormField
                                        key={prescription.id}
                                        control={form.control}
                                        name={`prescriptions.${prescriptionIndex}.id`}
                                        render={({ field }) => (
                                            <FormItem
                                                className="flex items-start space-x-3 py-2 border-b last:border-b-0">
                                                <FormControl>
                                                    <Checkbox
                                                        value={field.value}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) field.onChange(prescription.id);
                                                            else field.onChange(undefined);
                                                        }
                                                        }
                                                        className="mt-1"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal flex-grow">
                                                            <span className="font-medium">
                                                                {
                                                                    prescription.name
                                                                }
                                                            </span>
                                                    {prescription.medicaments.map((medicament, index) => (
                                                        <span key={index}><br/>{medicament.officialName}</span>
                                                    ))}
                                                    <br />
                                                </FormLabel>
                                            </FormItem>
                                        )}/>)
                                )
                            }
                        </div>
                    )}
                    <Button type="submit" className="w-full mt-6">
                        {t("submitButton")}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ListPrescriptionForm;
