import { Movie } from "./Movie";

export interface ApiPage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
