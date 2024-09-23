import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private apiUrl = 'http://localhost:3000/plans'; // Replace with your mock API URL

  constructor(private http: HttpClient) {}

  createPlan(planData: any): Observable<any> {
    return this.http.post(this.apiUrl, planData);
  }
}
