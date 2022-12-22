export function Input() {
  return (
    <input
      className="flex-1 rounded-md bg-app-300 p-5 outline-none focus:outline focus:outline-offset-2 focus:outline-app-400"
      name='newTODO'
      type="text"
      placeholder="e.g. Finish asignments"
    />
  );
}
