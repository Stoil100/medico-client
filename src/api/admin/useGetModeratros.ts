import { medicoApiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Moderator } from "@/models/Admin";

export const getModeratorsQueryKeys = ["admin", "moderators", "get"];

export function useGetModerators() {
    return useQuery({
        queryKey: getModeratorsQueryKeys,
        queryFn: () =>
            medicoApiClient.get<Moderator[]>("/admin/moderator/get").then(response => response.data),
        retry: 1,
    });
}
