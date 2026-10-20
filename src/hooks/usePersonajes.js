
import { useEffect, useState } from "react";
import { obtenerPersonajes } from "../services/personajesService";

async function consultarSiguiente(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar más personajes.");
  }

  const datos = await respuesta.json();

  return {
    resultados: datos.results,
    siguiente: datos.info.next,
  };
}

export default function usePersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [error, setError] = useState("");
  const [siguiente, setSiguiente] = useState(null);
  const [busquedaActual, setBusquedaActual] = useState("");

  async function buscarPersonajes(nombre = "") {
    setCargando(true);
    setError("");
    setBusquedaActual(nombre);
    setPersonajes([]);
    setSiguiente(null);

    try {
      const datos = await obtenerPersonajes(nombre, 1);

      setPersonajes(datos.resultados);
      setSiguiente(datos.siguiente);
    } catch (error) {
      setPersonajes([]);
      setError(error.message || "Ocurrió un error.");
    } finally {
      setCargando(false);
    }
  }

  async function cargarMas() {
    if (!siguiente || cargandoMas) {
      return;
    }

    setCargandoMas(true);
    setError("");

    try {
      const datos = await consultarSiguiente(siguiente);

      setPersonajes((actuales) => [
        ...actuales,
        ...datos.resultados,
      ]);

      setSiguiente(datos.siguiente);
    } catch (error) {
      setError(error.message || "No se pudieron cargar más personajes.");
    } finally {
      setCargandoMas(false);
    }
  }

  useEffect(() => {
    buscarPersonajes();
  }, []);

  return {
    personajes,
    cargando,
    cargandoMas,
    error,
    siguiente,
    buscarPersonajes,
    cargarMas,
    busquedaActual,
  };
}

