import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChangeText: (newValue: string) => void;
}

export default function SearchBox({ onChangeText }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      aria-label="Search notes"
      onChange={handleChange}
    />
  );
}
