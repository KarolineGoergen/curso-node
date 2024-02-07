import { IStudent, Student } from "../models/student.model";

class StudentRepository {
    getAll(){
        return Student.find();
    }

    getByMail(mail: string){
        return Student.findOne({ mail: mail });
    }

    create(student: IStudent){
        return Student.create(student);
    }

    update(mail: string, student: Partial<IStudent>){
        return Student.updateOne({ mail: mail }, { $set:student });
    }

    async remove(mail:string){
        return Student.deleteOne({ mail: mail });
    }
}

export default new StudentRepository();