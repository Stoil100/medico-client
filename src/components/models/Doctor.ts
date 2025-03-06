export interface Doctor {
    firstName: string;
    lastName: string;
    uin: string;
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
    id: string;
    officialName: string;
    quantity: number;
}