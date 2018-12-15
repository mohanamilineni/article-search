import http from "./httpService";

export function getArticles({ query, page, hitsPerPage }) {
  return http.get(`?query=${query}&page=${page}&hitsPerPage=${hitsPerPage}`);
}
