import {Request, Response, Router} from 'express';
import StudentsService from '../services/students.service';

class StudentsController {

  static async getAllStudents(req: Request, res: Response) {
    const students = await StudentsService.getAll();
    res.send(students);
  }
  
  static async getStudentByEmail (req: Request, res: Response) {

    try {
      const student = await StudentsService.getByMail(req.params.mail);
      res.status(200).json(student);
    }catch(error: any) {
        res.status(404).json({ error: error.message });
    }
  
  }
  
  static async createStudent(req: Request, res: Response) {
    try{
      await StudentsService.create(req.body);
      res.status(201).json(req.body);
    }catch(error: any){
      res.status(400).json({ error: error.message });
    }
   
  }
  
  static async deleteStudent(req: Request, res: Response) {
    try{
      await StudentsService.remove(req.params.mail);
      res.status(200).json({message: "Estudante removido com sucesso"});
    }catch(error: any){
      res.status(404).json({ error: error.message });
    }
  }
  
  static async updateStudent(req: Request, res: Response) {
    try{
      await StudentsService.update(req.params.mail, req.body);
      res.status(200).json(req.body);
    }catch(error: any){
      res.status(404).json({ error: error.message });
    }
  }
  
  static async auth(req: Request, res: Response) {
    try{
      const token = await StudentsService.authorization(req.body.mail, req.body.password);
      res.status(200).json({token});
    }catch(error: any){
      res.status(403).json({ error: error.message });
    }
  }
  
}

export default StudentsController;