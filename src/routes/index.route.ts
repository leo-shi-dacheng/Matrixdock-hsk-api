import { createRouter } from '@/lib/create-app'
import { createRoute, z } from '@hono/zod-openapi' // <--- Import these

const router = createRouter()

// Define schema for the response
const IndexMessageSchema = z.object({
  message: z.string().openapi({ example: 'App API is live!' })
}).openapi('IndexResponseMessage');

// Define the route using createRoute
const rootGetRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['General'],
  summary: 'API Root Endpoint',
  responses: {
    200: {
      description: 'Successful response from API root',
      content: {
        'application/json': {
          schema: IndexMessageSchema
        }
      }
    }
  }
});

// Register the route using router.openapi()
router.openapi(rootGetRoute, (c) => {
  return c.json({ message: 'App API' }, 200)
})

export default router
