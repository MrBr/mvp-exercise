export const makeRequest =
  <T, U>(url: string, method: "GET" | "POST" | "PUT" | "DELETE") =>
  (data: T) => {
    const headers: { [key: string]: string } = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return fetch(process.env.REACT_APP_API_URL + url, {
      headers,
      method: method,
      body: data ? JSON.stringify(data) : undefined,
    }).then((response) => {
      return response.json();
    }) as Promise<U>;
  };
