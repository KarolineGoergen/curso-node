import {Request, Response, Router} from 'express';
import StudentsService from '../services/students.service';
import { authorizationMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
  const students = await StudentsService.getAll();
  res.send(students);
});

router.get('/:mail', authorizationMiddleware, async (req: Request, res: Response) => {
  const student = await StudentsService.getByMail(req.params.mail);
  if(!student) return res.status(404).send({message: "Estudante não encontrado"});
  res.status(200).send(student);
})

router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
  if(req.body.age < 18){
    res.status(400).send({message: "Estudante deve ter mais de 18 anos"});
  }
  await StudentsService.create(req.body);
  res.status(201).send(req.body);
});

router.delete('/delete/:mail', authorizationMiddleware, async (req: Request, res: Response) => {
  try{
    await StudentsService.remove(req.params.mail);
    res.status(204);
  }catch(error){
    res.status(404).send({message: "Estudante não encontrado"});
  }
  
});

router.put('/:mail', authorizationMiddleware, async (req: Request, res: Response) => {
  try{
    await StudentsService.update(req.params.mail, req.body);
    res.status(204);
  }catch(error){
    res.status(404).send({message: "Estudante não encontrado"});
  }
});

router.post('/auth', async (req: Request, res: Response) => {
  try{
    const token = await StudentsService.authorization(req.body.mail, req.body.password);
    res.status(200).send({token});
  }catch(error){
    res.status(403).send({message: "Estudante não autoriado"});
  }
})

export default router;