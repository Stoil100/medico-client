"use client"

import type React from "react"

import { listPrescriptionsSchema as formSchema } from "@/components/schemas/pharmacy"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"

type ListPrescriptionFormProps = {
  t: (args: string) => string
}

// Mock data (unchanged)
const mockCitizens = [
  { ucn: "1234567890", name: "Петър Димитров" },
  { ucn: "2345678901", name: "Jane Smith" },
  { ucn: "3456789012", name: "Alice Johnson" },
]

// Update the mockPrescriptions structure
const mockPrescriptions = {
  "1234567890": [
    {
      id: 1,
      medicaments: [
        { id: 1, name: "Aspirin", quantity: 30, fulfilled: false },
        { id: 2, name: "Ibuprofen", quantity: 20, fulfilled: false },
      ],
    },
    {
      id: 2,
      medicaments: [{ id: 3, name: "Paracetamol", quantity: 40, fulfilled: false }],
    },
  ],
  "2345678901": [
    {
      id: 3,
      medicaments: [
        { id: 4, name: "Amoxicillin", quantity: 14, fulfilled: false },
        { id: 5, name: "Omeprazole", quantity: 28, fulfilled: false },
      ],
    },
  ],
  "3456789012": [
    {
      id: 4,
      medicaments: [
        { id: 6, name: "Metformin", quantity: 60, fulfilled: false },
        { id: 7, name: "Lisinopril", quantity: 30, fulfilled: false },
      ],
    },
  ],
}

// Update the prescriptions state type
const ListPrescriptionForm: React.FC<ListPrescriptionFormProps> = ({ t }) => {
  const [prescriptions, setPrescriptions] = useState<
    {
      id: number
      medicaments: {
        id: number
        name: string
        quantity: number
        fulfilled: boolean
      }[]
    }[]
  >([])

  const [openAutocomplete, setOpenAutocomplete] = useState(false)

  // Update the form type and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ucn: "",
      prescriptions: [],
    },
  })

  // Update the updatePrescriptions function
  const updatePrescriptions = (ucn: string) => {
    if (mockPrescriptions.hasOwnProperty(ucn)) {
      const newPrescriptions = mockPrescriptions[ucn as keyof typeof mockPrescriptions]
      setPrescriptions(newPrescriptions)
      form.setValue("prescriptions", newPrescriptions, {
        shouldValidate: true,
      })
    } else {
      setPrescriptions([])
      form.setValue("prescriptions", [], { shouldValidate: true })
    }
  }

  const handleUcnSelect = (selectedUcn: string) => {
    form.setValue("ucn", selectedUcn)
    setOpenAutocomplete(false)
    updatePrescriptions(selectedUcn)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted prescriptions:", values.prescriptions)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("title")}</h2>
        <FormField
          control={form.control}
          name="ucn"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{t("ucnLabel")}</FormLabel>
              <Popover open={openAutocomplete} onOpenChange={setOpenAutocomplete}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? mockCitizens.find((citizen) => citizen.ucn === field.value)?.ucn +
                          " " +
                          mockCitizens.find((citizen) => citizen.ucn === field.value)?.name
                        : t("selectPatient")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={t("searchPlaceholder")} />
                    <CommandList>
                      <CommandEmpty>{t("noPatientFound")}</CommandEmpty>
                      <CommandGroup>
                        {mockCitizens.map((citizen, index) => (
                          <CommandItem
                            value={citizen.ucn}
                            key={index}
                            onSelect={() => handleUcnSelect(citizen.ucn)}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <User className="h-4 w-4" />
                            <div className="flex flex-col">
                              <p className="font-medium">{citizen.name}</p>
                              <p className="text-sm">{citizen.ucn}</p>
                            </div>
                            <Check
                              className={cn("ml-auto", citizen.ucn === field.value ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {prescriptions.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-700">{t("prescriptionsList")}</h3>
            {prescriptions.map((prescription, prescriptionIndex) => (
              <div key={prescription.id} className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="text-md font-semibold mb-2">Prescription #{prescription.id}</h4>
                {prescription.medicaments.map((medicament, medicamentIndex) => (
                  <FormField
                    key={medicament.id}
                    control={form.control}
                    name={`prescriptions.${prescriptionIndex}.medicaments.${medicamentIndex}.fulfilled`}
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 py-2 border-b last:border-b-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                        </FormControl>
                        <FormLabel className="font-normal flex-grow">
                          <span className="font-medium">{medicament.name}</span>
                          <br />
                          <span className="text-sm text-gray-500">
                            {t("quantity")}: {medicament.quantity}
                          </span>
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        <Button type="submit" className="w-full mt-6">
          {t("submitButton")}
        </Button>
      </form>
    </Form>
  )
}

export default ListPrescriptionForm

