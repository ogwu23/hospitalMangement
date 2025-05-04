import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'patients',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/patients/patient-list.component').then(m => m.PatientListComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./pages/patients/patient-form.component').then(m => m.PatientFormComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/patients/patient-form.component').then(m => m.PatientFormComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/patients/patient-detail.component').then(m => m.PatientDetailComponent)
          }
        ]
      },
      /*{
        path: 'doctors',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/doctors/doctor-list.component').then(m => m.DoctorListComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./pages/doctors/doctor-form.component').then(m => m.DoctorFormComponent)
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/doctors/doctor-form.component').then(m => m.DoctorFormComponent)
          }
        ]
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./pages/appointments/appointments.component').then(m => m.AppointmentsComponent)
      },
      {
        path: 'billing',
        loadComponent: () =>
          import('./pages/billing/billing.component').then(m => m.BillingComponent)
      }*/
      // More modules (e.g. reports, inventory, staff) can be added here
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
