import { getBetOutcomes, getOutcome } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../query";

const OutcomeRow = ({ outcomeId }) => {
  const { data: outcome } = useQuery({
    queryKey: ["outcome", outcomeId],
    queryFn: () => getOutcome({ id: outcomeId }),
    // onSuccess: (data) =>
    //   queryClient.setQueryData(["outcomes", outcomeId], data),
    onError: console.log,
  });

  return (
    <div>
      <p>
        {outcome?.home_team} - {outcome?.away_team}
      </p>
      <p>{outcome?.result}</p>
      <p>{outcome?.multiplier}</p>
    </div>
  );
};

export default function BetRow({ bet }) {
  const { data: betOutcomes } = useQuery({
    queryKey: ["betOutcomes", bet.id],
    queryFn: () => getBetOutcomes({ bet: bet.id }),
    onSuccess: (data) =>
      queryClient.setQueryData(["betOutcomes", bet.id], data.results),
    onError: console.log,
  });

  return (
    <div>
      {betOutcomes.length > 1 ? `Multiple (${betOutcomes.length})` : "Simple"}
      <p>Status: {bet.status}</p>
      <p>Odd: {bet.multiplier}</p>
      <p>Paied: {bet.stake}€</p>
      <p>Prize: {bet.prize}</p>
      {betOutcomes?.map(({ outcome }) => (
        <OutcomeRow outcomeId={outcome} key={outcome} />
      ))}
    </div>
  );
}
