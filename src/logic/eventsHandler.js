import {useQuery} from "@tanstack/react-query";
import {getEvents} from "../api/api";


//gets all events
export const useGetEvents = () => {
    const { data: events } = useQuery({
        queryKey: ["events"],
        queryFn: () => getEvents(),
    });
    return events;
}
