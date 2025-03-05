import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useDoctorLogout() {
    const postLogout = async () => {
        const response = await apiClient.post("/doctor/logout");
        return response.data;
    };

    return useMutation({
        mutationKey: ["doctor", "logout"],
        mutationFn: postLogout,
        retry: 1,
    });
}
