export interface ModeratorDoctor {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    uin: string;
}

export interface ModeratorCitizen {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    ucn: string;
}

export interface ModeratorMedicament {
    id: string;
    name: string;
    activeIngredients: string[];
    atc: string;
}

export interface ModeratorPharmacy {
    id: string;
    name: string;
    ownerName: string;
}