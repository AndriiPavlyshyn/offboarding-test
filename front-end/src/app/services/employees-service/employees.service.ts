import {HttpClient}                                               from '@angular/common/http';
import {inject, Injectable}                                       from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import type {Employee}                                            from '../../../types/employee';
import {Maybe}                                                    from '../../../types/global';
import {Api}                                                      from '../../api/api';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private readonly http = inject<HttpClient>(HttpClient);

  public employees$ = new BehaviorSubject<Employee[]>([]);
  public currentEmployee$ = new BehaviorSubject<Maybe<Employee>>(null);

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(Api.employee.getAllEmployees)
      .pipe(
        tap((employees: Employee[]) => {
          if (employees.length) {
            this.employees$.next(employees);
          }
        }),
        catchError((error: unknown) => {
          return throwError(() => {
            return {
              message: 'Error in getAllEmployees, something went wrong.',
              error
            }
          });
        })
      );
  }

  public getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(Api.employee.getEmployee(id))
      .pipe(
        tap((employee: Employee) => {
          if (employee) {
            this.currentEmployee$.next(employee);
          }
        }),
        catchError((error: unknown) => {
          return throwError(() => {
            return {
              message: 'Error in getEmployee, something went wrong.',
              error
            }
          });
        })
      );
  }

  public addEmployee(id: string, body: any): Observable<Employee[]> {
    return this.http.post<Employee[]>(Api.employee.addEmployee(id), body)
      .pipe(
        tap((res: Employee[]) => {
          this.employees$.next(res);
        }),
        catchError((error: unknown) => {
          return throwError(() => {
            return {
              message: 'Error in getEmployee, something went wrong.',
              error
            }
          });
        })
      );
  }
}
