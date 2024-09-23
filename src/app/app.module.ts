import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { PlanService } from './services/plan.service';

@NgModule({
  declarations: [AppComponent, CreatePlanComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [PlanService],
  bootstrap: [AppComponent],
})
export class AppModule {}
