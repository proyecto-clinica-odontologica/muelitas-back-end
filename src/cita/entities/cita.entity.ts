import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Seguimiento } from "src/seguimiento/entities/seguimiento.entity";
import { Tratamiento } from "src/tratamiento/entities/tratamiento.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cita {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(()=> Tratamiento, (tratamiento) => tratamiento.citas)
    tratamiento: Tratamiento;

    @OneToMany(()=> Seguimiento, (seguimientos) => seguimientos.cita)
    seguimientos: Seguimiento[];

    @ManyToOne(()=> Estudiante, (estudiante)=>estudiante.citas)
    estudiante: Estudiante;

    // TODO: relacione la entidad Cita con la entidad Paciente
    // @ManyToOne(()=> Paciente, (paciente)=>paciente.citas)
    // paciente: Paciente;
}
