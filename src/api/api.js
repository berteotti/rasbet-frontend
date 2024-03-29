import { getCookie } from "../cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const rasbetFetch = (endpoint, options) => {
  const token = getCookie("token");

  return fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: token && "Bearer " + token,
      "Content-Type": "application/json",
    },
    ...options,
  }).then((res) => {
    if (res.status < 200 || res.status >= 400) throw res?.json();

    if (res.statusText === "OK") return res.json();
    else return null;
  });
};

// users
export const login = (data) => {
  return rasbetFetch(`/login/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const register = (data) =>
  rasbetFetch(`/register/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getUser = () => {
  return rasbetFetch(`/users/`, {
    method: "GET",
  });
};

export const updateUser = (data) =>
  rasbetFetch(`/users/${data.id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// bets
export const getBets = (data) =>
  rasbetFetch(`/bets/`, {
    method: "GET",
  });

export const getBet = (data) =>
  rasbetFetch(`/bets/${data.id}/`, {
    method: "GET",
  });

export const createBet = (data) =>
  rasbetFetch(`/bets/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// bookmakers
export const getBookmakers = (data) =>
  rasbetFetch(`/bookmakers?game=${data.game}&key=${data.key}`, {
    method: "GET",
  });

export const getBookmaker = (data) =>
  rasbetFetch(`/bookmaker/${data.id}/`, {
    method: "GET",
  });

// games
export const getGames = (data) =>
  rasbetFetch(`/games/`, {
    method: "GET",
  });

export const getGame = (data) =>
  rasbetFetch(`/games/${data.id}/`, {
    method: "GET",
  });

// markets
export const getMarkets = (data) =>
  rasbetFetch(`/markets/`, {
    method: "GET",
  });

export const getMarket = (data) =>
  rasbetFetch(`/markets/${data.id}/`, {
    method: "GET",
  });
// outcomes
export const getOutcomes = (data) =>
  rasbetFetch(`/outcomes?bookmaker=${data.bookmaker}`, {
    method: "GET",
  });

export const getOutcome = (data) =>
  rasbetFetch(`/outcomes/${data.id}/`, {
    method: "GET",
  });

export const updateOutcome = (data) =>
  rasbetFetch(`/outcomes/${data.id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const getBetOutcomes = (data) =>
  rasbetFetch(`/bet_outcomes?bet=${data.bet}`, {
    method: "GET",
  });

// wallets
export const getWallet = (data) =>
  rasbetFetch(`/wallets/${data.id}/`, {
    method: "GET",
  });

export const updateWallet = (data) =>
  rasbetFetch(`/wallets/${data.id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const getEvents = (data) =>
  rasbetFetch(`/events/`, {
    method: "GET",
  });

export const updateEvents = (data) =>
  rasbetFetch(`/events/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const getGameSubscriber = (data) =>
  rasbetFetch(`/game_subscribers/`, {
    method: "GET",
  });

export const createGameSubscriber = (data) =>
  rasbetFetch(`/game_subscribers/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteGameSubscriber = (data) =>
  rasbetFetch(`/game_subscribers/${data.id}`, {
    method: "DELETE",
  });
