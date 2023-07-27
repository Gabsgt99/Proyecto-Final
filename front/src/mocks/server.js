import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Aquí es donde puedes simular las respuestas a tus solicitudes de axios
const server = setupServer(
  // Ejemplo de una respuesta exitosa para una solicitud GET a /api/users
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json({ data: 'Respuesta simulada' }));
  })
);

export { server };
