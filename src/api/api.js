import { getCookie } from "../cookie";
import { queryClient } from "../query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const rasbetFetch = (endpoint, options) => {
  const token = getCookie("token");

  return fetch(`${API_URL}${endpoint}/`, {
    headers: {
      Authorization: token && "Bearer " + token,
      "Content-Type": "application/json",
    },
    ...options,
  }).then((res) => {
    if (res.status !== 200) throw res.json();

    return res.json();
  });
};

// users
export const login = (data) => {
  return rasbetFetch(`/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const register = (data) =>
  rasbetFetch(`/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getUser = () => {
  return rasbetFetch(`/users`, {
    method: "GET",
  });
};

export const updateUser = (data) =>
  rasbetFetch(`/users/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// bets
export const getBets = (data) =>
  rasbetFetch(`/bets`, {
    method: "GET",
  });

export const getBet = (data) =>
  rasbetFetch(`/bets/${data.id}`, {
    method: "GET",
  });

// bookmakers
export const getBookmakers = (data) =>
  rasbetFetch(`/bookmakers`, {
    method: "GET",
  });

export const getBookmaker = (data) =>
  rasbetFetch(`/bookmaker/${data.id}`, {
    method: "GET",
  });

// games
export const getGames = (data) =>
  rasbetFetch(`/games`, {
    method: "GET",
  });

export const getgame = (data) =>
  rasbetFetch(`/games/${data.id}`, {
    method: "GET",
  });

// markets
export const getMarkets = (data) =>
  rasbetFetch(`/markets`, {
    method: "GET",
  });

export const getMarket = (data) =>
  rasbetFetch(`/markets/${data.id}`, {
    method: "GET",
  });
// outcomes
export const getOutcomes = (data) =>
  rasbetFetch(`/outcomes`, {
    method: "GET",
  });

export const getOutcome = (data) =>
  rasbetFetch(`/outcomes/${data.id}`, {
    method: "GET",
  });

// wallets
export const getWallet = (data) =>
  rasbetFetch(`/wallets/${data.id}`, {
    method: "GET",
  });
