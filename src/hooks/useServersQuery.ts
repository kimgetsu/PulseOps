import { useQuery } from "@tanstack/react-query";
import { getServersList } from "../api/servers";

export function useServersQuery() {
    return useQuery({
        queryKey: ['servers'],
        queryFn: getServersList,
        staleTime: 60_000,
    })
}