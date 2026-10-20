
import { useState } from "react";
import Buscador from "./components/Buscador";
import ListaPersonajes from "./components/ListaPersonajes";
import ControlesFavoritos from "./components/ControlesFavoritos";
import usePersonajes from "./hooks/usePersonajes";
import useFavoritos from "./hooks/useFavoritos";

function App() {
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const { personajes, cargando, cargandoMas, error, siguiente, buscarPersonajes, cargarMas } =
    usePersonajes();

  const { favoritos } = useFavoritos();

  const listaMostrar = mostrarFavoritos ? favoritos : personajes;

  function manejarBusqueda(nombre) {
    setMostrarFavoritos(false);
    buscarPersonajes(nombre);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <header className="mx-auto mb-8 max-w-3xl text-center">
        <p className="mb-2 font-bold tracking-[0.25em] text-lime-400">
          UNIVERSO RICK AND MORTY
        </p>

        <h1 className="mb-4 text-3xl font-extrabold sm:text-5xl">
          Explorador de personajes
        </h1>

        <p className="text-slate-300">
          Buscá personajes y guardá tus favoritos.
        </p>
      </header>

      <Buscador
        onBuscar={manejarBusqueda}
        cargando={cargando}
      />

      <ControlesFavoritos
        mostrarFavoritos={mostrarFavoritos}
        onCambiarVista={setMostrarFavoritos}
        cantidadFavoritos={favoritos.length}
      />

      {cargando && !mostrarFavoritos && (
        <p className="my-8 text-center text-slate-300">
          Cargando personajes...
        </p>
      )}

      {!mostrarFavoritos && error && (
        <p
          role="alert"
          className="mx-auto my-8 max-w-xl rounded-lg bg-red-950 p-4 text-center text-red-200"
        >
          {error}
        </p>
      )}

      {(!cargando || mostrarFavoritos) && !(error && !mostrarFavoritos) && (
        <>
          {listaMostrar.length > 0 ? (
            <ListaPersonajes personajes={listaMostrar} />
          ) : (
            <p className="my-8 text-center text-slate-300">
              {mostrarFavoritos
                ? "Todavía no guardaste favoritos."
                : "No se encontraron personajes."}
            </p>
          )}

          {!mostrarFavoritos && siguiente && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={cargarMas}
                disabled={cargandoMas}
                className="rounded-lg bg-lime-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-lime-300 disabled:cursor-wait disabled:opacity-50"
              >
                {cargandoMas ? "Cargando..." : "Cargar más"}
              </button>
            </div>
          )}
        </>
      )}

      <footer className="mt-12 text-center text-sm text-slate-400">
        Datos obtenidos de{" "}
        <a
          href="https://rickandmortyapi.com/documentation"
          target="_blank"
          rel="noreferrer"
          className="text-lime-400 underline"
        >
          Rick and Morty API
        </a>
      </footer>
    </main>
  );
}

export default App;
