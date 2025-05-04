import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalPatients = 150;
  appointmentsToday = 27;
  totalRevenue = 76000;

  appointmentTrends = {
    series: [
      {
        name: 'Appointments',
        data: [12, 18, 22, 19, 24, 20, 27]
      }
    ] as ApexAxisChartSeries,
    chart: {
      type: 'area',
      height: 250,
      toolbar: { show: false }
    } as ApexChart,
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    } as ApexXAxis
  };

  appointmentStatus = {
    series: [55, 30, 15] as ApexNonAxisChartSeries,
    chart: {
      type: 'donut',
      height: 250
    } as ApexChart,
    labels: ['Completed', 'Pending', 'Cancelled'] as string[]
  };
}
