import {useQuery} from "@tanstack/react-query";
import {getBets} from "../api/api";


//gets all bets
export const  useGetBets = () => {
const { data: bets } = useQuery({
    queryKey: ["bets"],
    queryFn: () => getBets(),
});
return bets;
}