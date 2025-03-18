import { Expose } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsPositive,
  Max,
  MinLength,
  IsNotEmpty,
  IsDateString,
  Min,
  IsUUID,
} from "class-validator";

export class EventsPutDTO {

  @IsNotEmpty({ message: "Pole 'name' jest wymagane" })
  @IsString()
  @MinLength(5, { message: "Nazwa musi mieć co najmniej 5 znaków" })
  @Expose()
  name!: string;

  @IsNotEmpty({ message: "Pole 'date' jest wymagane" })
  @IsDateString({}, { message: "Niepoprawny format daty, użyj YYYY-MM-DD" })
  @Expose()
  date!: string;

  @IsNotEmpty({ message: "Pole 'location' jest wymagane" })
  @IsString()
  @Expose()
  location!: string;

  @IsNotEmpty({ message: "Pole 'capacity' jest wymagane" })
  @IsNumber({}, { message: "Pojemność musi być liczbą" })
  @IsPositive({ message: "Pojemność musi być liczbą dodatnią" })
  @Min(0, { message: "Min pojemność to 0" })
  @Expose()
  capacity!: number;
}
