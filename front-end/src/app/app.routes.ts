import {Routes} from '@angular/router';


export const routes: Routes = [
	{
		path: '',
		redirectTo: 'offboarding',
		pathMatch: 'full'
	},
	{
		path: 'offboarding',
		loadComponent: () =>
			import('./pages/offboarding/offboarding.component').then((m) => m.default),
		children: [
			{
				path: '',
				redirectTo: 'table',
				pathMatch: 'full',
			},
			{
				path: 'table',
				data: {
					title: 'Offboarding',
				},
				loadComponent: () =>
					import('./pages/offboarding/offboarding-table/offboarding-table.component').then((m) => m.default),
			},
			{
				path: ':id',
				loadComponent: () =>
					import('./pages/offboarding/employee/employee.component').then((m) => m.default),
			},
		],
	},
];
