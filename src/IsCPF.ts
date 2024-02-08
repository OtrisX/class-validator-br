import { ValidationArguments, registerDecorator } from "class-validator";

const invalidCPFs: string[] = [
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999",
];

function firstDigitValidator(cpf: string): boolean {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let rest = sum % 11;
  let digit = rest < 2 ? 0 : 11 - rest;

  return digit === Number(cpf[9]);
}

function secondDigitValidator(cpf: string): boolean {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  let rest = sum % 11;
  let digit = rest < 2 ? 0 : 11 - rest;

  return digit === Number(cpf[10]);
}

export function IsCPF() {
  return function (target: Object, propertyName: string) {
    registerDecorator({
      name: "isCPF",
      target: target.constructor,
      constraints: [],
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== "string") {
            args.constraints.push("O cpf deve ser uma string");
            return false;
          }

          if (value.length !== 11) {
            args.constraints.push("O cpf deve ter 11 dígitos");
            return false;
          }

          if (!value.match(/^\d+$/)) {
            args.constraints.push("O cpf deve conter apenas números");
            return false;
          }

          if (!firstDigitValidator(value)) {
            args.constraints.push("O primeiro dígito verificador é inválido");
            return false;
          }

          if (!secondDigitValidator(value)) {
            args.constraints.push("O segundo dígito verificador é inválido");
            return false;
          }

          if (invalidCPFs.includes(value)) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return args.constraints[0] || "CPF inválido";
        },
      },
    });
  };
}
