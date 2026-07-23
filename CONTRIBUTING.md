# Contribuir

Gracias por querer contribuir a este proyecto. Sigue estos pasos para que tus cambios sean fáciles de revisar:

1. Crea una rama desde `main` para tu trabajo:
   - `git checkout -b feature/descripcion-corta`
2. Mantén commits pequeños y con mensajes claros (en español):
   - `git add .`
   - `git commit -m "feat: añadir X"`
3. Ejecuta linters, tipos y pruebas antes de push:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test`
4. Abre un Pull Request hacia `main` describiendo:
   - Qué se cambió
   - Por qué
   - Cómo probarlo localmente

Para cambios grandes, abre un issue primero para discutir el diseño.

## Convención de commits

Usamos prefijos para identificar el tipo de cambio:

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de errores |
| `docs:` | Cambios en documentación |
| `style:` | Formato, espacios, sin cambios de lógica |
| `refactor:` | Refactorización de código |
| `test:` | Añadir o modificar tests |