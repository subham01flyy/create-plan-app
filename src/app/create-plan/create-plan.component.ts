import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css'],
})
export class CreatePlanComponent implements OnInit {
  planForm: FormGroup;

  constructor(private fb: FormBuilder, private planService: PlanService) {
    this.planForm = this.fb.group({
      planName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)],
      ],
      shortDescription: [
        '',
        [Validators.required, Validators.pattern(/^[\w\s\W]+$/)],
      ],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      cgst: [0, [Validators.required, Validators.min(0)]],
      sgst: [0, [Validators.required, Validators.min(0)]],
      igst: [0, [Validators.required, Validators.min(0)]],
      totalTax: [{ value: 0, disabled: true }],
      totalAmount: [{ value: 0, disabled: true }],
      isActive: [true],
      servicesType: ['', [Validators.required]],
      validForDays: [0, [Validators.required, Validators.min(0)]],
      dueDays: [0, [Validators.required, Validators.min(0)]],
      eligibilities: [[]],
    });
  }

  ngOnInit(): void {
    this.planForm
      .get('cgst')
      ?.valueChanges.subscribe(() => this.calculateTotalTax());
    this.planForm
      .get('sgst')
      ?.valueChanges.subscribe(() => this.calculateTotalTax());
    this.planForm
      .get('igst')
      ?.valueChanges.subscribe(() => this.calculateTotalTax());
    this.planForm
      .get('basePrice')
      ?.valueChanges.subscribe(() => this.calculateTotalAmount());
  }

  calculateTotalTax() {
    const cgst = this.planForm.get('cgst')?.value || 0;
    const sgst = this.planForm.get('sgst')?.value || 0;
    const igst = this.planForm.get('igst')?.value || 0;
    const totalTax = cgst + sgst + igst;
    this.planForm.patchValue({ totalTax });
  }

  calculateTotalAmount() {
    const basePrice = this.planForm.get('basePrice')?.value || 0;
    const totalTax = this.planForm.get('totalTax')?.value || 0;
    const totalAmount = basePrice + totalTax;
    this.planForm.patchValue({ totalAmount });
  }

  onSubmit() {
    if (this.planForm.valid) {
      this.planService.createPlan(this.planForm.value).subscribe(
        (response) => {
          console.log('Plan created successfully!', response);
          alert('Plan created successfully!'); // Show success alert
          // Handle successful response
        },
        (error) => {
          console.error('Error creating plan', error);
          alert('Error creating plan. Please try again.');
          // Handle error
        }
      );
    }
  }
}
