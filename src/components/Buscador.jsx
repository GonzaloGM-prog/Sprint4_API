
import { useState } from "react";

export default function Buscador({ onBuscar, cargando }) {
  const [nombre, setNombre] = useState("");

  function manejarEnvio(e) {
    e.preventDefault();
    onBuscar(nombre);
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="mx-auto mb-8 flex max-w-xl flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Buscar personaje por nombre..."
        aria-label="Nombre del personaje"
        className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-lime-400"
      />

      <button
        type="submit"
        disabled={cargando}
        className="rounded-lg bg-lime-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-lime-300 disabled:cursor-wait disabled:opacity-50"
      >
        Buscar
      </button>
    </form>
  );
}
