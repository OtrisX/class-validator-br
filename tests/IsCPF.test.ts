import { validate } from 'class-validator';
import { IsCPF } from '/home/matheus/projects/class-validator-br/src/IsCPF';

class TestClass {
  @IsCPF()
  cpf: string = '';
}

describe('IsCPF', () => {
  it('should validate a valid CPF', async () => {
    const obj = new TestClass();
    obj.cpf = '11489158006';

    const errors = await validate(obj);
    expect(errors.length).toBe(0);
  });

  it('should invalidate an invalid CPF with incorrect first digit', async () => {
    const obj = new TestClass();
    obj.cpf = '11489158007';
    const errors = await validate(obj);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessage = errors[0].constraints?.['IsCPF'];
    expect(errorMessage).toContain('CPF inválido');
  });

  it('should invalidate an invalid CPF with incorrect second digit', async () => {
    const obj = new TestClass();
    obj.cpf = '11489158005';
    const errors = await validate(obj);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessage = errors[0].constraints?.['IsCPF'];
    expect(errorMessage).toContain('CPF inválido');
  });

  it('should invalidate an invalid CPF with repeated digits', async () => {
    const obj = new TestClass();
    obj.cpf = '11111111111';
    const errors = await validate(obj);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessage = errors[0].constraints?.['IsCPF'];
    expect(errorMessage).toContain('CPF inválido');
  });

  it('should invalidate an invalid CPF with invalid length', async () => {
    const obj = new TestClass();
    obj.cpf = '12345678';
    const errors = await validate(obj);
    expect(errors.length).toBeGreaterThan(0);

    const errorMessage = errors[0].constraints?.['IsCPF'];
    expect(errorMessage).toContain('CPF inválido');
  });
});