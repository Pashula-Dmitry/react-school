export const fetcher = (input: RequestInfo | URL, config?: RequestInit & { params: { [key: string]: any } } ) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { params, ...conf } = config;
  const url = new URL(input as string);
  const queries = new URLSearchParams(params);

  url.search = queries.toString();

  return fetch(url.href, conf as RequestInit)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
};
