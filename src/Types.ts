export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId?: number;
  position: string;
  status: string;
}

export interface Department {
  id?: number;
  name: string;
  description: string;
}
