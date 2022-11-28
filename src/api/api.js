const API_URL = process.env.NEXT_PUBLIC_API_URL;

// users
export const login = (data) =>
  fetch(`${API_URL}/login/`, {
    method: "POSt",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const register = (data) =>
  fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const getUser = (data) =>
  fetch(`${API_URL}/users/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());

export const updateUser = (data) =>
  fetch(`${API_URL}/users/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }).then((res) => res.json());

// bets
export const getBets = (data) =>
  fetch(`${API_URL}/bets/`, {
    method: "GET",
  }).then((res) => res.json());

export const getBet = (data) =>
  fetch(`${API_URL}/bets/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());

// bookmakers
export const getBookmakers = (data) =>
  fetch(`${API_URL}/bookmakers/`, {
    method: "GET",
  }).then((res) => res.json());

export const getBookmaker = (data) =>
  fetch(`${API_URL}/bookmaker/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());

// games
export const getGames = (data) =>
  fetch(`${API_URL}/games/`, {
    method: "GET",
  }).then((res) => res.json());

export const getgame = (data) =>
  fetch(`${API_URL}/games/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());

// markets
export const getMarkets = (data) =>
  fetch(`${API_URL}/markets/`, {
    method: "GET",
  }).then((res) => res.json());

export const getMarket = (data) =>
  fetch(`${API_URL}/markets/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());
// outcomes
export const getOutcomes = (data) =>
  fetch(`${API_URL}/outcomes/`, {
    method: "GET",
  }).then((res) => res.json());

export const getOutcome = (data) =>
  fetch(`${API_URL}/outcomes/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());

// wallets
export const getWallet = (data) =>
  fetch(`${API_URL}/wallets/${data.id}`, {
    method: "GET",
  }).then((res) => res.json());
