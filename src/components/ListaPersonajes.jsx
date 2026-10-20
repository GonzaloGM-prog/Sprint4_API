import TarjetaPersonaje from "./TarjetaPersonaje";

export default function ListaPersonajes({ personajes }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {personajes.map((personaje) => (
        <TarjetaPersonaje key={personaje.id} personaje={personaje} />
      ))}
    </section>
  );
}