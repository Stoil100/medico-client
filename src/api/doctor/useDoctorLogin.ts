import { medicoApiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { DoctorLoginType } from "@/schemas/doctor";

export function useDoctorLogin() {
    const postLogin = async (loginData: DoctorLoginType) => {
        const response = await medicoApiClient.post("/doctor/login", loginData);
        return response.data;
    };

    return useMutation({
        mutationKey: ["doctor", "login"],
        mutationFn: postLogin,
        retry: 1,
    });
}
