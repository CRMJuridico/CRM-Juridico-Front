export type UserType = 'Admin' | 'Lawyer' | 'Intern' | 'Financial' | 'Secretary';

export interface User {
  id: number;
  fullName: string;
  nickname?: string;
  email: string;
  phone?: string;
  cpf: string;
  userType: UserType;
  position?: string;
  photoUrl?: string;
  isActive: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
}

export interface UserFormData extends Omit<User, 'id'> {
  password: string;
  confirmPassword: string;
}

export interface UserTableData {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  telefone?: string;
} 