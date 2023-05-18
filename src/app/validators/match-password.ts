import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword(firstControl: string, secondControl: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const control1: string = control.get(firstControl).value;
    const control2: string = control.get(secondControl).value;

    if (control1 !== control2) {
      control.get(secondControl).setErrors({ notMatch: true }); // notMatch hatası atanıyor
      return { notMatch: true };
    }

    return null;
  };
}