import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const noHomeroValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log(control);

  if (
    typeof control.value === 'string' &&
    control.value.toLowerCase().includes('homero')
  ) {
    return {
      noHomero: true,
    };
  }

  return null; // Si el retorno es null, significaria que el campo NO TIENE errores, (es valido);
};

export function telefonoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const telefonoRegex = /^\+?(\d{2})?\s*\(?(0?\d{1,4})\)?[-.\s]?(\d{2})[-.\s]?(\d{2})[-.\s]?(\d{2})$/;

    if (!control.value) {
      return null;
    }

    const isValid = telefonoRegex.test(control.value);

    return isValid ? null : { telefonoInvalido: true };
  };
}

export function isValidCUITCUIL(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const cuitCUIL: string = control.value.replace(/\D/g, ''); // Elimina cualquier caracter que no sea dígito
    const validLengths = [11, 13]; // Longitudes válidas para CUIT y CUIL
    const validFormats = [/^\d{11}$/, /^\d{2}-\d{8}-\d{1}$/]; // Formatos válidos para CUIT y CUIL

    if (!validFormats.some(format => format.test(cuitCUIL)) || !validLengths.includes(cuitCUIL.length)) {
      return { 'cuitCUILInvalido': true }; // Devuelve un error si el formato o la longitud son incorrectos
    }

    const verificador = parseInt(cuitCUIL[cuitCUIL.length - 1], 10);
    const codes = "6789456789";
    let resultado = 0;

    for (let x = 0; x < 10; x++) {
      let digitoValidador = parseInt(codes[x], 10);
      let digito = parseInt(cuitCUIL[x], 10);
      let digitoValidacion = digitoValidador * digito;
      resultado += digitoValidacion;
    }

    resultado = resultado % 11;
    const rv = (resultado === verificador);

    return rv ? null : { 'cuitCUILInvalido': true }; // Devuelve un error si el CUIT/CUIL es inválido
  };
}
