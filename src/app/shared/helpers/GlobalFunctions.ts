import { FormControl, FormGroup } from '@angular/forms';

abstract class GlobalFunctions {
  public static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public static convertToFormData(data: any): FormData {
    const formData = new FormData();

    for (const key of Object.keys(data)) {
      const value = data[key];

      if (Array.isArray(value)) {
        value.forEach(val => {
          formData.append(`${key}[]`, val);
        });
      } else {
        formData.append(key, value);
      }
    }

    return formData;
  }

  public static getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  public static shallowEqual<T extends object>(a: T, b: T): boolean {
    const keysA = Object.keys(a) as (keyof T)[];
    return keysA.every(key => a[key] === b[key]);
  }
}

export default GlobalFunctions;
