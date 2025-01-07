export type EmployeeStatus = 'ACTIVE' | 'OFFBOARDED';

export interface Employee {
	id: string;
	name: string;
	department: string;
	status: EmployeeStatus;
	email: string;
	equipments: EmployeeEquipment[];
}

export interface EmployeeEquipment {
	id: string;
	name: string;
}

export interface EmployeeDetailsItem {
	key: keyof Employee;
	value: string;
}
