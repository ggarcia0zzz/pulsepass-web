# PulsePass – integración
Node 22.22+; instalar con npm ci y ejecutar npm run dev. Backend en localhost:8080 (proxy Vite). Abrir localhost:5173. Ver dev/INICIO.md del backend para configurar PostgreSQL, JWT y usuarios.

## Comprobación manual
1. Registrar tres usuarios y asignar roles según instrucciones del backend.
2. ADMIN: crear evento futuro, asociar artista, publicar.
3. USER: iniciar sesión, buscar evento, comprar, revisar ticket, comprar otro y cancelar.
4. STAFF: buscar ticket pagado, marcar usado, revisar tickets pagados por evento.
5. Verificar recarga de sesión, logout y acceso denegado por rol.
6. Ejecutar npm run build, npm test y npm run lint.

## Estado
Se sustituyeron los mocks por fetch, Zod y JWT. Se implementaron las páginas antes vacías. La compilación y las pruebas de integración están pendientes: el entorno de edición no dispone del binario Linux de TypeScript incluido en las dependencias Windows originales ni de la base local del usuario. No se garantiza conformidad visual exacta con los 32 diseños ni cobertura completa de pruebas del PRD. No se incluyen node_modules ni .git.
