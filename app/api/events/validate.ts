import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import { NextResponse } from "next/server";

export async function validateDto<T extends object>(
  dtoClass: ClassConstructor<T>, 
  data: Record<string, unknown> 
): Promise<{ errors?: string[]; validatedData?: T }> {
  const dtoInstance = plainToInstance(dtoClass, data);
  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    const errorMessages = errors.flatMap((error) =>
      Object.values(error.constraints || {})
    );
    return { errors: errorMessages };
  }

  return { validatedData: dtoInstance };
}
