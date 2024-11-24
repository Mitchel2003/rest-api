import { Router, Request, Response } from "express"

const router = Router()

const getHealth = (req: Request, res: Response) => {
  if (req.params.id) console.log('params inecesary')
  res.status(200).send('ok')
}

//verify auth and action
router.get('/health', getHealth)

export default router