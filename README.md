# Mis temas

Chuleta de bajo para los temas del grupo: notas por partes, repeticiones y estructura. Pensada para el iPad.

Web publicada en GitHub Pages, **cifrada con contraseña** (StatiCrypt): el código del repo es público, pero las canciones solo se ven tras introducir la contraseña.

## Cómo funciona

- `songs/*.json`: un archivo por tema. El orden de la lista está en `songs/_order.json`.
- `src/app.html`: la app (lista de temas + página de cada tema).
- `src/lock.html`: pantalla de contraseña.
- `build.mjs`: mete los temas dentro de la app → `build/index.html`.
- `.github/workflows/deploy.yml`: en cada push a `main` construye, cifra con el secret `SITE_PASSWORD` y publica en Pages.

`.staticrypt.json` guarda la *salt* (no es secreta). Mantenerla fija hace que "Recordarme" siga funcionando después de cada deploy.

## Formato de un tema

```json
{
  "title": "...", "artist": "...", "key": "Em", "bpm": 108,
  "tuning": "Estándar (E A D G)",
  "sections": [
    { "id": "verso", "name": "Verso", "lines": ["E . E E | G A-B"], "repeat": 4, "hint": "pista corta" }
  ],
  "structure": [ { "id": "intro", "repeat": 1 }, { "id": "verso", "repeat": 2 } ]
}
```

Notación en `lines`: `|` separa compases, `.` silencio o nota sostenida, `A-B` ligado, `C~D` slide, `(A)` nota de pedal o fantasma, `x` nota muteada y `(×3)` repetir la línea.

Las notas salen de tabs de internet: son aproximadas, así que hay que comprobarlas con la grabación.

## Probar en local

```bash
node build.mjs   # luego abre build/index.html
```
