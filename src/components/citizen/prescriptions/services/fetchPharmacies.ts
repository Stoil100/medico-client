import { Pharmacy } from "@/components/models/Pharmacy";

// Mock function to fetch pharmacy coordinates
export const fetchPharmacies = (
    prescriptionId: string
): Promise<Pharmacy[]> => {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve([
                {
                    id: "pharm1",
                    name: "Поли",
                    address: "Варна",
                    lat: 43.2137466,
                    lng: 27.9059872,
                    distance: "0.8 km",
                },
                {
                    id: "pharm2",
                    name: "К-Крес",
                    address: "Варна",
                    lat: 43.2127215,
                    lng: 27.9054693,
                    distance: "1.2 km",
                },
                {
                    id: "pharm3",
                    name: "Санита",
                    address: "Варна",
                    lat: 43.2071491,
                    lng: 27.9102908,
                    distance: "1.5 km",
                },
            ]);
        }, 1000);
    });
};
