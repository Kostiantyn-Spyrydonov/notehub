import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChangeText: (newValue: string) => void;
}

export default function SearchBox({ value, onChangeText }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      value={value}
      placeholder="Search notes"
      aria-label="Search notes"
      onChange={handleChange}
    />
  );
}
