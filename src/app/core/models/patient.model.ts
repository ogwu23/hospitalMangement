export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    phone: string;
    address: string;
    medicalHistory?: string;
  }
  