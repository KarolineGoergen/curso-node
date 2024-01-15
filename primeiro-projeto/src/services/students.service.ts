import StudentRepository from "../repositories/student.repository";
import { IStudent } from "../models/student.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretJWT = process.env.JWT_SECRET || "";

export class StudentsService {
  
        getAll(){
            return StudentRepository.getAll();
        }

        getByMail(mail: string){
            return StudentRepository.getByMail(mail);
        }

        async create(student: IStudent){
            if(student.password){
                student.password = await bcrypt.hash(student.password, 10);
            }
            return StudentRepository.create(student);
        }

        async authorization(mail: string, password: string){
            const student = await StudentRepository.getByMail(mail);

            if(!student) throw new Error("Estudante não encontrado");

            const result = await bcrypt.compare(password, student.password);

            if(result) {
                return jwt.sign({_id: student._id, nome: student.name}, secretJWT, {
                    expiresIn: '1h'
                });
            }
            throw new Error("Falha na autenticação");
        }

        remove(mail: string){
            return StudentRepository.remove(mail);
        }

        update(mail: string, student: Partial<IStudent>){
            return StudentRepository.update(mail, student);
        }
}

export default new StudentsService();