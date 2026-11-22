import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header>
        <SearchBox value={search} onChangeText={handleSearch} />
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isError && <p>Something went wrong</p>}
      </main>
      <footer></footer>
    </div>
  );
}
