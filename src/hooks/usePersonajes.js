import { useEffect, useState } from "react";
import {
  obtenerPersonajes,
  obtenerSiguiente,
} from "../services/personajesService";

export default function usePersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [error, setError] = useState("");
  const [siguiente, setSiguiente] = useState(null);

  async function buscarPersonajes(nombre = "") {
    setCargando(true);
    setError("");
    setPersonajes([]);
    setSiguiente(null);

    try {
      const datos = await obtenerPersonajes(nombre);

      setPersonajes(datos.resultados);
      setSiguiente(datos.siguiente);
    } catch (error) {
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
      const datos = await obtenerSiguiente(siguiente);

      setPersonajes((actuales) => [...actuales, ...datos.resultados]);
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
  };
}

