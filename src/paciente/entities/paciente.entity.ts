import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

export class Paciente {
    @PrimaryGeneratedColumn('increment')
    idPaciente: number

    @Column({ type: 'varchar', nullable: false  })
    Nombre: string

    @Column({ type: 'varchar', nullable: false  })
    ApellidoPaterno: string

    @Column({ type: 'varchar', nullable: false  })
    ApellidoMaterno: string

    @Column({ type: 'timestamp', nullable: false  })
    FechaNacimiento: Date

    @Column({ type: 'varchar', nullable: false  })
    Genero: string
    
    @Column({ type: 'varchar', nullable: false,  unique: true, default: '' })
    Celular: string

    @Column({ type: 'int', nullable: false  })
    Edad: number

    @Column({ type: 'varchar', nullable: false,  unique: true  })
    Correo: string

    @Column({ type: 'varchar', nullable: false  })
    TipoDoc: string

    @Column({ type: 'varchar', nullable: false,  unique: true  })
    NumeroDocumento: string

    @Column({ type: 'varchar', nullable: false  })
    EstadoCivil: string

    @Column({ type: 'varchar', nullable: false  })
    Ocupacion: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    GradodeInstruccion: string

    @Column({ type: 'varchar', nullable: false  })
    Domicilio: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    Acompaniante: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    Parentesco: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    AntecedentePatologico: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    AntecedentePersonal: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    AntecedenteFamiliar: string

    @Column({ type: 'float', nullable: false  })
    Peso: number

    @Column({ type: 'float', nullable: false  })
    Talla: number

    @Column({ type: 'float', nullable: false  })
    IMC: number

    @Column({ type: 'varchar', nullable: false, default: ''  })
    Alergias: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    Piel: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    Unias: string

    @Column({ type: 'varchar', nullable: true, default: ''  })
    Cabello: string

    // @OneToMany(() => Cita, (cita) => cita.Paciente)
    // cita: Cita[];
    // @OneToMany(() => Odontograma, (odontrograma) => odontrograma.Paciente)
    // odontrograma: Odontograma[];
    // @OneToMany(() => HistoriaClinica, (historiaClinica) => historiaClinica.Paciente)
    // historiaClinica: HistoriaClinica[];

    @BeforeInsert()
    @BeforeUpdate()
    validacionCampos() {
      this.Nombre = this.Nombre?.toLowerCase();
      this.ApellidoPaterno = this.ApellidoPaterno?.toLowerCase();
      this.ApellidoMaterno = this.ApellidoMaterno?.toLowerCase();
      //this.FechaNacimiento = this.FechaNacimiento?.toLowerCase();
      this.Genero = this.Genero?.toLowerCase();
      this.Celular = this.Celular?.toLowerCase();
      //this.Edad = this.Edad?.toLowerCase();
      this.Correo = this.Correo?.toLowerCase();
      this.TipoDoc = this.TipoDoc?.toLowerCase();
      this.NumeroDocumento = this.NumeroDocumento?.toLowerCase();
      this.EstadoCivil = this.EstadoCivil?.toLowerCase();
      this.Ocupacion = this.Ocupacion?.toLowerCase();
      this.GradodeInstruccion = this.GradodeInstruccion?.toLowerCase();
      this.Domicilio = this.Domicilio?.toLowerCase();
      this.Acompaniante = this.Acompaniante?.toLowerCase();
      this.Parentesco = this.Parentesco?.toLowerCase();
      this.AntecedentePatologico = this.AntecedentePatologico?.toLowerCase();
      this.AntecedentePersonal = this.AntecedentePersonal?.toLowerCase();
      this.AntecedenteFamiliar = this.AntecedenteFamiliar?.toLowerCase();
      //this.Peso = this.Peso?.toLowerCase();
      //this.Talla = this.Talla?.toLowerCase();
      //this.IMC = this.IMC?.toLowerCase();
      this.Alergias = this.Alergias?.toLowerCase();
      this.Piel = this.Piel?.toLowerCase();
      this.Unias = this.Unias?.toLowerCase();
      this.Cabello = this.Cabello?.toLowerCase();
  }
}

