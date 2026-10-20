

const API_URL = import.meta.env.VITE_RICK_MORTY_API;

export async function obtenerPersonajes(nombre = "", pagina = 1) {
  if (!API_URL) {
    throw new Error("Falta configurar la URL de la API en .env");
  }

  const parametros = new URLSearchParams();

  parametros.set("page", pagina);

  if (nombre.trim() !== "") {
    parametros.set("name", nombre.trim());
  }

  const url = `${API_URL}/character?${parametros.toString()}`;

  const respuesta = await fetch(url);

  if (respuesta.status === 404) {
    return {
      resultados: [],
      siguiente: null,
    };
  }

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los personajes.");
  }

  const datos = await respuesta.json();

  return {
    resultados: datos.results,
    siguiente: datos.info.next,
  };
}
