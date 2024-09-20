export default function Task({ title, onClear, props }) {
  return (
    <li {...props} className="flex justify-between my-4">
      <span>{title}</span>
      <button
        className="text-stone-700 hover:text-red-500"
        onClick={() => onClear(title)}
      >
        Clear
      </button>
    </li>
  );
}
