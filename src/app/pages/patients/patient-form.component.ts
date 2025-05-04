import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnInit {
  form!: FormGroup;
  patientId: string | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      age: [''],
      gender: [''],
      phone: [''],
      address: [''],
      medicalHistory: ['']
    });

    this.patientId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.patientId;

    if (this.isEdit && this.patientId) {
      this.patientService.getPatient(this.patientId).subscribe(data => this.form.patchValue(data));
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    if (this.isEdit && this.patientId) {
      this.patientService.updatePatient(this.patientId, data).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    } else {
      this.patientService.createPatient(data).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    }
  }
}
