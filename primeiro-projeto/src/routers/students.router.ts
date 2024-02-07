import {Router} from 'express';
import StudentsController from '../controllers/students.controller'
import { authorizationMiddleware } from '../middlewares/auth.middleware';

const routes = Router();

routes.post("/auth", StudentsController.auth);
routes.post("/students", StudentsController.createStudent);
routes.get("/students", authorizationMiddleware, StudentsController.getAllStudents);
routes.get("/students/:mail", authorizationMiddleware, StudentsController.getStudentByEmail);
routes.put("/students/:mail",authorizationMiddleware, StudentsController.updateStudent);
routes.delete("/students/:mail",authorizationMiddleware, StudentsController.deleteStudent);

export default routes;