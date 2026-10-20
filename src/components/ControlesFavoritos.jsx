
export default function ControlesFavoritos({
  mostrarFavoritos,
  onCambiarVista,
  cantidadFavoritos,
}) {
  return (
    <nav
      aria-label="Vistas de personajes"
      className="mb-8 flex flex-wrap justify-center gap-3"
    >
      <button
        type="button"
        onClick={() => onCambiarVista(false)}
        className={`rounded-lg px-4 py-3 font-bold transition ${
          !mostrarFavoritos
            ? "bg-lime-400 text-slate-950"
            : "bg-slate-800 text-white hover:bg-slate-700"
        }`}
      >
        Todos los personajes
      </button>

      <button
        type="button"
        onClick={() => onCambiarVista(true)}
        className={`rounded-lg px-4 py-3 font-bold transition ${
          mostrarFavoritos
            ? "bg-lime-400 text-slate-950"
            : "bg-slate-800 text-white hover:bg-slate-700"
        }`}
      >
        Mis favoritos ({cantidadFavoritos})
      </button>
    </nav>
  );
}
