import {AsyncPipe, JsonPipe}                                           from '@angular/common';
import {Component, DestroyRef, inject}                                 from '@angular/core';
import {MatButton}                                                     from '@angular/material/button';
import {MatDialog}                                                     from '@angular/material/dialog';
import {MatIcon}                                                       from '@angular/material/icon';
import {MatList, MatListItem}                                          from '@angular/material/list';
import {ActivatedRoute, ParamMap, RouterLink}                          from '@angular/router';
import {
	EmployeeDetailsComponent
}                                                                      from '@pages/offboarding/employee/components/employee-details/employee-details.component';
import {
	OffboardingFormComponent
}                                                                      from '@pages/offboarding/employee/components/offboarding-form/offboarding-form.component';
import {
	EmployeesService
}                                                                      from '@services/employees-service/employees.service';
import {MetaService}                                                   from '@services/meta-service/meta.service';
import {
	ContentWithHeaderComponent
}                                                                      from '@shared/components/layouts/content-with-header/content-with-header.component';
import {
	PageTitleComponent
}                                                                      from '@shared/components/page-title/page-title.component';
import {EMPTY, map, Observable, Subject, Subscription, switchMap, tap} from 'rxjs';
import {Employee, EmployeeDetailsItem}                                 from '../../../../types/employee';
import {Maybe}                                                         from '../../../../types/global';


@Component({
	selector: 'app-employee$',
	standalone: true,
	imports: [
		AsyncPipe,
		MatIcon,
		RouterLink,
		ContentWithHeaderComponent,
		PageTitleComponent,
		MatButton,
		EmployeeDetailsComponent,
		JsonPipe,
		MatList,
		MatListItem,
	],
	templateUrl: './employee.component.html',
	styleUrl: './employee.component.scss'
})
export default class EmployeeComponent {
	private readonly destroyRef = inject<DestroyRef>(DestroyRef);
	private readonly employeesService = inject<EmployeesService>(EmployeesService);
	private readonly activatedRoute = inject<ActivatedRoute>(ActivatedRoute);
	private readonly metaService = inject<MetaService>(MetaService);
	private readonly dialog: MatDialog = inject(MatDialog);

	public readonly employee$: Subject<Maybe<Employee>> = this.employeesService.currentEmployee$;
	public readonly employeeDetails$: Observable<EmployeeDetailsItem[]> = this.employeesService.currentEmployee$
		.pipe(
			map((employee: Maybe<Employee>) => {
				return this.mapDetails(employee);
			})
		);
	public pageTitle = this.metaService.pageTitle;

	constructor() {
		const currentEmployeeSub = this.setCurrentEmployee();

		this.destroyRef.onDestroy(() => {
			currentEmployeeSub.unsubscribe();
		});
	}

	public offboard(): void {
		this.dialog.open(OffboardingFormComponent, {
			maxWidth: '700px',
			width: '95vw'
		})
	}

	private setCurrentEmployee(): Subscription {
		return this.activatedRoute.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					const employeeId: Maybe<string> = params.get('id');

					return employeeId ? this.employeesService.getEmployee(employeeId) : EMPTY;
				}),
				tap((employee: Employee) => {
					this.metaService.setTitle(employee.name);
				})
			)
			.subscribe();
	}

	private mapDetails(employee: Maybe<Employee>): EmployeeDetailsItem[] {
		const allowed: (keyof Employee)[] = ['email', 'department', 'name'];

		if(employee) {
			return allowed.map((key: keyof Employee) => {
				const res: EmployeeDetailsItem = {
					key: key.toLowerCase() as keyof Employee,
					value: employee[key as keyof Employee].toString()
				};

				return res;
			});
		} else {
			return [];
		}
	}
}
