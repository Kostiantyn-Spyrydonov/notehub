import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";

export default function App() {
  return (
    <div className={css.app}>
      <header></header>
      <main></main>
      <footer></footer>
    </div>
  );
}
