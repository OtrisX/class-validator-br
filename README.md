# Class Validator BR

Conjunto de validadores para dados brasileiros utilizando a biblioteca Class Validator.

## Instalação

Você pode instalar o Class Validator BR via npm:

```
npm install class-validator-br
```

## Uso

Atualmente, este pacote oferece um validador para CPFs brasileiros. Para utilizar, você pode decorar seus campos de classe com o decorador `@IsCPF`. Veja um exemplo:

```typescript
import { IsCPF } from "class-validator-br";
import { validate } from "class-validator";

class Usuario {
  @IsCPF()
  cpf: string;
}

const usuario = new Usuario();
usuario.cpf = "47471652071"; // CPF válido

validate(usuario).then((errors) => {
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
});
```

## Futuras Adições

Estou trabalhando para adicionar mais validadores para outros tipos de dados brasileiros, como RG, CNPJ, CEP, entre outros. Fique atento às próximas versões para mais funcionalidades!
