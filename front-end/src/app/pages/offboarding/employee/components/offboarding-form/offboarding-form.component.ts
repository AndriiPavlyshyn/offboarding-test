import {JsonPipe}                                                                      from '@angular/common';
import {Component, DestroyRef, inject}                                                 from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators}                       from '@angular/forms';
import {MatButton}                                                                     from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {
	MatError,
	MatFormField,
	MatHint,
	MatLabel
}                                                                                      from '@angular/material/form-field';
import {MatInput}                                                                      from '@angular/material/input';
import {
	MatSnackBar
}                                                                                      from '@angular/material/snack-bar';
import {
	EmployeesService
}                                                                                      from '@services/employees-service/employees.service';
import {
	ControlErrorsComponent
}                                                                                      from '@shared/components/control-errors/control-errors.component';
import {
	postalCodeValidator
}                                                                                      from '@shared/validators/postal-code.validator';
import {EMPTY, Subscription, switchMap, take}                                          from 'rxjs';
import {
	Employee
}                                                                                      from '../../../../../../types/employee';
import {
	Maybe
}                                                                                      from '../../../../../../types/global';
import {
	OnlyNumbersDirective
}                                                                                      from '../../../../../directives/only-numbers/only-numbers.directive';


interface OffboardingForm {
	receiver: FormControl<Maybe<string>>,
	email: FormControl<Maybe<string>>,
	phone: FormControl<Maybe<string>>,
	streetLine: FormControl<Maybe<string>>,
	city: FormControl<Maybe<string>>,
	postalCode: FormControl<Maybe<string>>,
	country: FormControl<Maybe<string>>,
	notes: FormControl<Maybe<string>>,
}


@Component({
  selector: 'app-offboarding-form',
  standalone: true,
	imports: [
		MatDialogContent,
		MatDialogTitle,
		ReactiveFormsModule,
		MatFormField,
		MatInput,
		MatDialogActions,
		MatButton,
		MatLabel,
		MatError,
		OnlyNumbersDirective,
		ControlErrorsComponent,
		JsonPipe,
		MatHint,
		MatDialogClose
	],
  templateUrl: './offboarding-form.component.html',
  styleUrl: './offboarding-form.component.scss'
})
export class OffboardingFormComponent {
	private readonly employeesService = inject<EmployeesService>(EmployeesService);
	private readonly dialog: MatDialog = inject<MatDialog>(MatDialog);
	private readonly snackBar = inject<MatSnackBar>(MatSnackBar);
	private readonly destroyRef = inject<DestroyRef>(DestroyRef);
	private subscription: Subscription = new Subscription();

	public readonly offboardForm = new FormGroup<OffboardingForm>({
		receiver: new FormControl<string>('', [Validators.required]),
		email: new FormControl<string>('', [Validators.required, Validators.email]),
		phone: new FormControl<string>('', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]),
		streetLine: new FormControl<string>(''),
		city: new FormControl<string>(''),
		postalCode: new FormControl<string>('', [Validators.required, postalCodeValidator()]),
		country: new FormControl<string>('', [Validators.required]),
		notes: new FormControl<string>(''),
	});

	constructor() {
		this.destroyRef.onDestroy(() => {
			this.subscription.unsubscribe();
		});
	}

	public submit(): void {
		if (this.offboardForm.valid) {
			const sub: Subscription = this.employeesService.currentEmployee$
				.pipe(
					take(1),
					switchMap((employee: Maybe<Employee>) => {
						return employee ? this.employeesService.addEmployee(employee.id, this.offboardForm.value) : EMPTY;
					}),
				)
				.subscribe(() => {
					const currentEmployee: Maybe<Employee> = this.employeesService.currentEmployee$.getValue();

					this.snackBar.open('Employee successfully offboarded.', 'Close', {
						duration: 2000,
					});
					this.dialog.closeAll();
					this.employeesService.currentEmployee$.next({...currentEmployee, status: currentEmployee?.status === 'OFFBOARDED' ? 'ACTIVE' : 'OFFBOARDED'} as Employee);
				});

			this.subscription.add(sub);
		}
	}
}
