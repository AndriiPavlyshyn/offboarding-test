import {environment} from '@environments/environment';


export class Api {
	public static readonly employee: any = {
		getAllEmployees: `${environment.apiUrl}/employees`,
		getEmployee: (id: string) => `${environment.apiUrl}/employees/${id}`,
		addEmployee: (id: string) => `${environment.apiUrl}/users/${id}/offboard`,
	};
}
