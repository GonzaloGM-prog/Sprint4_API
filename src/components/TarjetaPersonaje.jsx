import useFavoritos from "../hooks/useFavoritos";

export default function TarjetaPersonaje({ personaje }) {
  const { cambiarFavorito, esFavorito } = useFavoritos();

  const favorito = esFavorito(personaje.id);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg transition hover:-translate-y-1">
      <img
        src={personaje.image}
        alt={`Imagen de ${personaje.name}`}
        loading="lazy"
        width="300"
        height="300"
        className="aspect-square w-full object-cover"
        onError={(e) => {
          // Primero anulamos el handler para evitar un bucle si la imagen de reemplazo también falla
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://rickandmortyapi.com/api/character/avatar/1.jpeg";
        }}
      />

      <div className="p-4">
        <h2 className="mb-3 text-xl font-bold text-lime-400">
          {personaje.name}
        </h2>

        <p className="mb-1 text-slate-300">
          <strong className="text-white">Estado:</strong> {personaje.status}
        </p>

        <p className="mb-1 text-slate-300">
          <strong className="text-white">Especie:</strong> {personaje.species}
        </p>

        <p className="mb-4 text-slate-300">
          <strong className="text-white">Género:</strong> {personaje.gender}
        </p>

        <button
          type="button"
          onClick={() => cambiarFavorito(personaje)}
          className={`w-full rounded-lg px-3 py-2 font-bold transition ${
            favorito
              ? "bg-lime-400 text-slate-950 hover:bg-lime-300"
              : "bg-slate-700 text-white hover:bg-slate-600"
          }`}
        >
          {favorito ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}