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

        async getByMail(mail: string){
            const student = await StudentRepository.getByMail(mail);

            if(!student) throw new Error("Estudante não encontrado");

            return student;
        }

        async create(student: IStudent){

            const studentMail = await StudentRepository.getByMail(student.mail);

            if(student.age < 18) throw new Error("Estudante deve ter mais de 18 anos");

            if(studentMail) throw new Error("O email informado já existe");
            
            if(student.password) student.password = await bcrypt.hash(student.password, 10);
            
            return StudentRepository.create(student);
        }

        async authorization(mail: string, password: string){
            const student = await StudentRepository.getByMail(mail);
            
            if(!student) throw new Error("Estudante não encontrado");

            const result = await bcrypt.compare(password, student.password);

            if(result) {
                return jwt.sign({mail: student.mail, _id: student._id}, secretJWT, {
                    expiresIn: '1h'
                });
            }
            throw new Error("Falha na autenticação");
        }

        async remove(mail: string){
            const student = await StudentRepository.getByMail(mail);

            if(!student) throw new Error("Estudante não encontrado");

            return StudentRepository.remove(mail);
        }

        async update(mail: string, student: Partial<IStudent>){
            const studentMail = await StudentRepository.getByMail(mail);

            if(!studentMail) throw new Error("Estudante não encontrado");

            return StudentRepository.update(mail, student);
        }
}

export default new StudentsService();