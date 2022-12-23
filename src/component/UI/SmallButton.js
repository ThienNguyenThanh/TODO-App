

export function SmallButton({id, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mr-2 flex h-8 w-8 items-center justify-center rounded-md bg-app-300 outline-none transition-colors focus:outline focus:outline-offset-2 focus:outline-app-400"
    >
      <i id={id} className="material-icons">{icon}</i>
    </button>
  );
}
