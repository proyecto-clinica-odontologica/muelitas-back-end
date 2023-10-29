import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Matches, Max, Min } from 'class-validator';
export class CreateExamengeneralDto{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty({ message: 'El peso es obligatorio' })
    peso?: number;

    @IsNumber()
    @IsPositive({message: 'La talla Respiratoria no debe ser negativo.'})
    @IsNotEmpty({ message: 'La talla es obligatorio' })
    talla?: number;

    @IsNumber()
    @IsPositive({message: 'El indice de masa corporal no debe ser negativo.'})
    @IsNotEmpty({ message: 'El indice de masa corporal es obligatorio' })
    IndiceMasaCorporal?: number;
    
    @IsNotEmpty({ message: 'La piel es obligatorio' })
    @Matches(/^[a-zA-Z\s]*$/, {
        message: 'La piel solo puede contener letras',
    })
    @Length(3, 50, { message: 'La piel debe tener entre 3 y 50 caracteres' })
    piel?: string;

    @IsNotEmpty({ message: 'El anexo del cabello es obligatorio' })
    @Matches(/^[a-zA-Z\s]*$/, {
        message: 'El anexo del cabello solo puede contener letras',
    })
    @Length(3, 50, { message: 'El anexo del cabello debe tener entre 3 y 50 caracteres' })
    AnexosCabello?: string;

    @IsNotEmpty({ message: 'El anexo de uñas es obligatorio' })
    @Matches(/^[a-zA-Z\s]*$/, {
        message: 'El anexo de uñas solo puede contener letras',
    })
    @Length(3, 50, { message: 'El anexo de uñas debe tener entre 3 y 50 caracteres' })
    AnexosUnias?: string;

    @IsNotEmpty({ message: 'La presión arterial del cabello es obligatorio' })

    @Length(3, 50, { message: 'La presión arterial debe tener entre 3 y 50 caracteres' })
    presionArterial?: string;

    @IsNumber()
    @IsPositive({message: 'La frecuencia Respiratoria no debe ser negativo.'})
    @Max(40, { message: 'La frecuencia respiratoria no debe exceder de 40 rpm.' })
    @Min(5, { message: 'La frecuencia respiratoria no debe ser inferior a 5 rpm.' })
    frecuenciaRespiratoria?: number;

    @IsNumber()
    @IsPositive({message: 'La frecuencia Respiratoria no debe ser negativo.'})
    @Max(100, { message: 'El pulso no debe exceder de 100 ppm.' })
    @Min(50, { message: 'El pulso no debe ser inferior a 50 ppm.' })
    pulso?: number;

    @IsNumber()
    @IsPositive({message: 'La temperatura no debe ser negativo.'})
    @Max(100, { message: 'La temperatura no debe exceder de 100 ppm.' })
    @Min(50, { message: 'La temperatura no debe ser inferior a 50 ppm.' })
    temperatura?: number;

    @IsNotEmpty()
    @IsNumber()
    IdPaciente: number;
}