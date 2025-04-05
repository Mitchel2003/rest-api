import { Router, Request, Response } from "express"
const router = Router()

// health route (to compensate delay "deployment")
router.get('/health', (req: Request, res: Response) => {
  if (req.params.id) console.log('params inecesaries')
  res.status(200).send('ok')
})

export default router