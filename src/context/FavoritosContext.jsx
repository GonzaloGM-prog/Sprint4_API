
import { createContext, useEffect, useState } from "react";

export const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem("favoritos");
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    } catch {
      console.error("No se pudieron guardar los favoritos.");
    }
  }, [favoritos]);

  function cambiarFavorito(personaje) {
    setFavoritos((actuales) => {
      const existe = actuales.some(
        (favorito) => favorito.id === personaje.id
      );

      if (existe) {
        return actuales.filter(
          (favorito) => favorito.id !== personaje.id
        );
      }

      return [...actuales, personaje];
    });
  }

  function esFavorito(id) {
    return favoritos.some((favorito) => favorito.id === id);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, cambiarFavorito, esFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
