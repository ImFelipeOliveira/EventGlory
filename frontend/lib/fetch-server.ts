"use server";

import { FetchError } from "./fetch";

export async function actionAPIFetch(input: string, init: RequestInit) {
  return await actionFetch(input, init, apiFetch);
}

async function actionFetch(
  input: string,
  init: RequestInit,
  fetchFn: (endpoint: string, init?: RequestInit) => Promise<Response>
) {
  const config = init?.body
    ? {
        ...init,
        headers: {
          ...init?.headers,
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    : init;

  let response;
  try {
    console.log("config", config)
    response = await fetchFn(input, config);
  } catch (error) {
    console.log("Error", error);

    if (error instanceof FetchError && error.info?.detail) {
      return { error: error.info?.detail };
    }
    if (error instanceof FetchError && error.info?.non_field_errors) {
      return { error: error.info?.non_field_errors };
    }
    return { error: "Ocorreu um erro inesperado" };
  }
  try {
    const data = await response.json();
    if (response.ok) {
      return { data: data };
    }
  } catch (error) {
    return { error: "Ocorreu um erro inesperado" };
  }
}

export async function apiFetch(
  endpoint: string,
  init?: RequestInit
): Promise<Response> {
  const ngnix = process.env.NEXT_PUBLIC_API_URL;
  const url = `${ngnix}${endpoint}`;

  console.log("passei aqui", url);
  const response = await fetch(url, init);

  if (!response.ok) {
    const error = new FetchError("Erro ao buscar os dados");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response;
}
