export interface Doctor {
    firstName: string;
    lastName: string;
    UIN: string;
    avatarUrl?: string;
}

export interface DoctorCitizen {
    id: string;
    firstName: string;
    lastName: string;
    ucn: string;
}

export interface DoctorPrescription {
    id: number;
    name: string;
    status: "active" | "fulfilled" | "invalid";
    issuedDate: string;
    expirationDate: string;
    medicaments: DoctorMedicament[];
}

export interface DoctorMedicament {
    officialName: string;
    quantity: number;
}