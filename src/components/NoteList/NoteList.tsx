import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              className={css.button}
              type="button"
              onClick={() => handleDeleteNote(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
