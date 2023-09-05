export function Button({
  text,
  handleClick,
}: {
  text: string
  handleClick: (param: any) => void
}) {
  return (
    <button
      className="
          bg-indigo-500
          text-white
          ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 
          hover:bg-indigo-600 
          focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-70 
          outline-none
          transition
          "
      onClick={handleClick}
    >
      {text}
    </button>
  )
}
