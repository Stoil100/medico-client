import AdminMedicamentForm from "@/components/forms/moderators/medicaments";
import AdminDoctorForm from "@/components/forms/moderators/doctor";
import AdminPharmacistForm from "@/components/forms/pharmacy";
import AdminPharmacyForm from "@/components/forms/moderators/pharmacy";
import AdminUserForm from "@/components/forms/moderators/citizen";
import { DoctorForm } from "@/components/forms/doctor";
import { LoginForm } from "@/components/forms/login";
import { AddMedicamentForm } from "@/components/forms/pharmacy/addMedicament";
import Image from "next/image";

export default function Home() {
    return <>
    <DoctorForm/>
    </>;
}
