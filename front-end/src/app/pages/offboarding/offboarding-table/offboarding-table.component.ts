import {AsyncPipe, JsonPipe, NgIf}                                               from '@angular/common';
import {AfterViewInit, Component, DestroyRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {toObservable}                                                            from '@angular/core/rxjs-interop';
import {FormsModule}                                                             from '@angular/forms';
import {MatFormField, MatLabel, MatPrefix}                                       from '@angular/material/form-field';
import {MatIcon}                                                                 from '@angular/material/icon';
import {MatInput}                                                                from '@angular/material/input';
import {MatSort, MatSortHeader}                                                  from '@angular/material/sort';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
	MatTableDataSource
}                                                                                from '@angular/material/table';
import {ActivatedRoute, RouterLink}                                              from '@angular/router';
import {
	EmployeesService
}                                                                                from '@services/employees-service/employees.service';
import {
	MetaService
}                                                                                from '@services/meta-service/meta.service';
import {
	ContentWithHeaderComponent
}                                                                                from '@shared/components/layouts/content-with-header/content-with-header.component';
import {
	PageTitleComponent
}                                                                                from '@shared/components/page-title/page-title.component';
import {Subscription}                                                            from 'rxjs';
import {Employee, EmployeeEquipment}                                             from '../../../../types/employee';


@Component({
	selector: 'app-offboarding-table',
	standalone: true,
	imports: [
		MatCell,
		MatCellDef,
		MatColumnDef,
		MatHeaderCell,
		MatHeaderRow,
		MatHeaderRowDef,
		MatRow,
		MatRowDef,
		MatSort,
		MatLabel,
		MatSortHeader,
		MatTable,
		NgIf,
		MatFormField,
		MatIcon,
		FormsModule,
		MatInput,
		MatPrefix,
		RouterLink,
		MatHeaderCellDef,
		ContentWithHeaderComponent,
		PageTitleComponent,
		AsyncPipe,
		JsonPipe
	],
	templateUrl: './offboarding-table.component.html',
	styleUrl: './offboarding-table.component.scss'
})
export default class OffboardingTableComponent implements AfterViewInit, OnInit {
	private readonly employeesService = inject<EmployeesService>(EmployeesService);
	private readonly destroyRef = inject<DestroyRef>(DestroyRef);
	private readonly route = inject<ActivatedRoute>(ActivatedRoute);
	private readonly metaService = inject<MetaService>(MetaService);

	@ViewChild(MatSort)
	private readonly sort!: MatSort;
	private readonly subscriptions: Subscription = new Subscription();

	public readonly displayedColumns: (keyof Employee)[] = ['name', 'email', 'department', 'equipments', 'status'];
	public readonly employees = new MatTableDataSource<Employee>();
	public search = signal<string>('');
	public pageTitle = this.metaService.pageTitle;

	constructor() {
		this.subscriptions.add(this.employeesService.getAllEmployees().subscribe());
		this.subscriptions.add(this.filteringSubscription());
		this.subscriptions.add(this.employeesSubscription());

		this.metaService.setTitleByRouteData(this.route);

		this.destroyRef.onDestroy(() => {
			this.subscriptions.unsubscribe();
		});
	}

	ngOnInit() {
		this.filterPredicate();
		this.metaService.setTitleByRouteData(this.route);
	}

	ngAfterViewInit() {
		this.employees.sort = this.sort;
	}

	public getEquipmentString(equipment: EmployeeEquipment[]): string {
		return equipment.map((eq: EmployeeEquipment) => eq.name).join(', ');
	}

	private filteringSubscription(): Subscription {
		return toObservable(this.search)
			.subscribe((search: string) => {
				this.employees.filter = search.trim().toLowerCase();
			});
	}

	private employeesSubscription(): Subscription {
		return this.employeesService.employees$.subscribe((employees: Employee[]) => {
			this.employees.data = employees;
		});
	}

	private filterPredicate(): void {
		this.employees.filterPredicate = (data: Employee, filter: string) => {
			const normalizedFilter: string = filter.trim().toLowerCase();

			return (
				data.name.toLowerCase().includes(normalizedFilter) ||
				data.department.toLowerCase().includes(normalizedFilter)
			);
		};
	}
}
