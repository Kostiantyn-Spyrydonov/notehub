import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesParams {
  search: string;
  page: number;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const NOTES_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes({
  search,
  page,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(NOTES_URL, {
    params: { page, perPage: 12, search },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
}
