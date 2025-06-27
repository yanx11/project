export interface Organization {
  id: string;
  name: string;
  type: 'company' | 'department' | 'team' | 'branch';
  parentId?: string;
  description?: string;
  establishedDate: string;
  status: 'active' | 'inactive' | 'pending';
  location?: string;
  manager?: string;
  employeeCount: number;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface Personnel {
  id: string;
  name: string;
  position: string;
  organizationId: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  department: string;
  manager?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface OperationLog {
  id: string;
  type: 'create' | 'update' | 'delete';
  entityType: 'organization' | 'personnel';
  entityId: string;
  operatorName: string;
  operatorId: string;
  timestamp: string;
  changes?: Record<string, { old: any; new: any }>;
  description: string;
}

export interface Statistics {
  totalOrganizations: number;
  totalPersonnel: number;
  activeOrganizations: number;
  activePersonnel: number;
  recentOperations: number;
  organizationsByType: Record<string, number>;
}