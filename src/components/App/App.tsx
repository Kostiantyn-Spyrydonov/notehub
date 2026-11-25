import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((newValue: string) => {
    setSearch(newValue);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChangeText={handleSearch} />
        <button className={css.button} type="button" onClick={openModal}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isError && <p>Something went wrong</p>}
      </main>
      <footer></footer>
      {isModalOpen && (
        <Modal onClose={closeModal} label="Create note">
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
