import createApp from '@/lib/create-app'
import index from '@/routes/index.route'
import auth from '@/routes/auth/auth.index'
import { swaggerUI } from '@hono/swagger-ui'

const app = createApp()

const routes = [
    index,
    auth,
  ] as const;

routes.forEach((route) => {
  // Since createRouter now returns OpenAPIHono, app.route will correctly merge
  // OpenAPIHono instances. If routes within 'index' or 'auth' are defined
  // using .openapi(), they will be included in the main spec.
  app.route('/', route)
})

// Configure OpenAPI specification document
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Matrixdock HSK API',
    description: 'API documentation for Matrixdock HSK services. Explore and test API endpoints.',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Development Server' } // Adjust if your dev port is different
  ],
  // You can add more OpenAPI configurations here, like components, security schemes, etc.
});

// Add Swagger UI endpoint
app.get('/doc', swaggerUI({ url: '/openapi.json' }))

export default app