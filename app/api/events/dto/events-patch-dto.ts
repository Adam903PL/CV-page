import { Expose } from "class-transformer";
import { 
  IsString, 
  IsNumber, 
  IsPositive, 
  Max, 
  MinLength, 
  IsNotEmpty, 
  IsDateString,
  IsOptional
} from "class-validator";

export class PatchEventsDTO {
    
    @IsOptional()
    @IsString()
    @MinLength(3, { message: "Nazwa musi mieć co najmniej 5 znaków" })
    @Expose()
    name!: string;

    @IsOptional()
    @IsDateString({}, { message: "Niepoprawny format daty, użyj YYYY-MM-DD" })
    @Expose()
    date!: string;

    @IsOptional()
    @IsString()
    @MinLength(3, { message: "Lokalizacja musi mieć co najmniej 3 znaki" })
    @Expose()
    location!: string;

    @IsOptional()
    @IsNumber({}, { message: "Pojemność musi być liczbą" }) 
    @IsPositive({ message: "Pojemność musi być liczbą dodatnią" })
    @Max(10000, { message: "Maksymalna pojemność to 10 000" })
    @Expose()
    capacity!: number;
}
