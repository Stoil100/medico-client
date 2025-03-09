"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import {
    AddBranchType,
    addBranchSchema as formSchema,
} from "@/schemas/pharmacy";
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
import L, { LatLngTuple } from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useCreateBranch } from "@/api/pharmacy/admin/useCreateBranch";

type LocationMapProps = {
    form: UseFormReturn<
        { name: string; latitude: number; longitude: number },
        any,
        undefined
    >;
};
export function LocationMap({ form }: LocationMapProps) {
    const [position, setPosition] = useState<LatLngTuple | null>();
    const defaultCenter: LatLngTuple = [43.204666, 27.910543];

    const pinIcon = L.icon({
        iconUrl: "/pinIcon.png",
        iconAnchor: [18, 40],
        iconSize: [36, 36],
    });
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                form.setValue("latitude", lat);
                form.setValue("longitude", lng);
                setPosition([lat, lng]);
            },
        });

        return position ? <Marker position={position} icon={pinIcon} /> : null;
    };

    return (
        <MapContainer
            className="w-full h-full"
            center={defaultCenter}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker />
        </MapContainer>
    );
}

type PharmacyAddBranchFormProps = {
    t: (args: string) => string;
};
export default function PharmacyAddBranchForm({
    t,
}: PharmacyAddBranchFormProps) {
    // Initialize the form with react-hook-form
    const form = useForm<AddBranchType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            name: "",
            latitude: "" as unknown as number, // Explicitly forcing type
            longitude: "" as unknown as number,
        },
    });

    const { mutate: createBranch } = useCreateBranch();

    // Define the submit handler
    function onSubmit(values: AddBranchType) {
        createBranch(values, {
            onSuccess: () => {
                form.reset();
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>{t("lat.label")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="number"
                                            step="any"
                                            {...field}
                                            placeholder={t("lat.placeholder")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>{t("lng.label")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            type="number"
                                            step="any"
                                            {...field}
                                            placeholder={t("lng.placeholder")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="md:h-[450px] h-[300px] rounded-md overflow-hidden">
                        <LocationMap form={form} />
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    {t("submit")}
                </Button>
            </form>
        </Form>
    );
}
