export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  birthDate?: Date;
  // gender?: Gender;
  // role: Role;
  profilePicture?: string;
  referralCode?: string;
  referredBy?: number;
  point: number;
  pointExpiredDate?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
