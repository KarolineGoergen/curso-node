import {Request, Response, Router} from 'express';

const router = Router();

router.get('/',(req: Request, res: Response) => {
    const helloWorld = {message: 'Aplicação funcionando...'};
    res.send(helloWorld);
});

export default router;