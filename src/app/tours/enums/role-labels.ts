import { Role } from './role';

export const ROLE_LABELS: Record<Role, string> = {
  [Role.USER]: 'User',
  [Role.GUIDE]: 'Guide',
  [Role.LEAD_GUIDE]: 'Lead Guide',
  [Role.ADMIN]: 'Admin',
};
