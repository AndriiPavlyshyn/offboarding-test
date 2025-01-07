import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function postalCodeValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		const postalCodePattern = /^\d{2}-\d{3}$/;

		const valid = postalCodePattern.test(value);

		return valid ? null : { postalCode: true };
	};
}
