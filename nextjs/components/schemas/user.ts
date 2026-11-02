export interface UserRead {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  role: string;
  organization?: string;
}
