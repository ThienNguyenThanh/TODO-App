

export function Button({ children, onClick }) {
  return (
    <button
      className="block rounded-md bg-app-700 p-5 text-app-100 outline-none transition-colors hover:bg-app-700/95 focus:outline focus:outline-offset-2 focus:outline-app-400 active:bg-app-700/90"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
