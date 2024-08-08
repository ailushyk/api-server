import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    checks: [
      {
        name: 'API health check',
        status: 'UP',
      },
    ],
  })
})

export default router
