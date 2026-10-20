# Rick and Morty — Explorador de personajes

App para buscar personajes de Rick and Morty, marcarlos como favoritos y que persistan al recargar.

🔗 Demo: [rick-morty-finder-gonzalo.netlify.app](https://rick-morty-finder-gonzalo.netlify.app)

---

## API

Usa la [Rick and Morty API](https://rickandmortyapi.com/documentation), que es pública y no requiere autenticación.

Un detalle: cuando no hay resultados para una búsqueda, la API responde con 404 en lugar de un array vacío. Eso lo manejo en el servicio devolviendo una lista vacía, así el resto de la app no lo trata como un error.

---

## Cómo correrlo

```bash

cd rick-morty-tp
pnpm install
pnpm dev run
```

### Variables de entorno

```env
VITE_RICK_MORTY_API=https://rickandmortyapi.com/api
```

---

## Decisiones que tomé

**`fetch` en lugar de axios** — para este proyecto no necesitaba interceptores ni nada extra, así que no tenía sentido sumar una dependencia.

**Context API para favoritos** — es el único estado global. No valía la pena meter Zustand o Redux para eso.

**Separé servicio / hook / componente** — `personajesService.js` transforma lo que devuelve la API, `usePersonajes.js` maneja el estado y los efectos, y los componentes solo renderizan. Así si la API cambia, toco un solo archivo.

**`localStorage` para favoritos** — el estado inicial se lee con una función lazy de `useState` para no releer el storage en cada render.

---

## Qué usé de sprints anteriores y qué generé con IA

Reutilicé la estructura de custom hooks y la separación por capas (service / hook / componente) que venía trabajando desde sprints anteriores.

La estructura base de componentes y la lógica de paginación las generé con ayuda de IA. Lo que corregí a mano fue un error de sintaxis en `App.jsx` donde quedó un bloque JSX duplicado y mal cerrado tras una edición incremental que salió mal, y algunos ajustes menores en las condiciones de renderizado.
