import { forwardRef } from "react";

const FormValue = forwardRef(function FormValue({ title, type }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        htmlFor="projectProps"
        className="text-sm font-bold uppercase text-stone-500"
      >
        {title}
      </label>
      {type === "textarea" ? (
        <textarea name="projectProps" ref={ref} className={classes} />
      ) : (
        <input
          id="projectProps"
          type={type}
          ref={ref}
          className={classes}
          min={type === "date" ? getTodayDate() : undefined}
        />
      )}
    </p>
  );
});

export default FormValue;
