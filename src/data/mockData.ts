import { Organization, Personnel, OperationLog } from '../types';

export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: '科技创新集团',
    type: 'company',
    description: '领先的科技创新企业集团',
    establishedDate: '2020-01-15',
    status: 'active',
    location: '北京市朝阳区',
    manager: '张总',
    employeeCount: 1250,
    createdBy: '系统管理员',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '2',
    name: '技术研发部',
    type: 'department',
    parentId: '1',
    description: '负责核心技术研发工作',
    establishedDate: '2020-03-01',
    status: 'active',
    location: '北京总部A座',
    manager: '李部长',
    employeeCount: 85,
    createdBy: '张总',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '3',
    name: '前端开发组',
    type: 'team',
    parentId: '2',
    description: '负责前端界面开发',
    establishedDate: '2020-04-10',
    status: 'active',
    location: '北京总部A座12层',
    manager: '王组长',
    employeeCount: 12,
    createdBy: '李部长',
    createdAt: '2024-02-01T14:15:00Z'
  },
  {
    id: '4',
    name: '市场营销部',
    type: 'department',
    parentId: '1',
    description: '负责市场推广和销售工作',
    establishedDate: '2020-02-20',
    status: 'active',
    location: '北京总部B座',
    manager: '陈部长',
    employeeCount: 45,
    createdBy: '张总',
    createdAt: '2024-01-25T11:00:00Z'
  },
  {
    id: '5',
    name: '上海分公司',
    type: 'branch',
    parentId: '1',
    description: '上海地区业务分支机构',
    establishedDate: '2021-06-01',
    status: 'active',
    location: '上海市浦东新区',
    manager: '刘总',
    employeeCount: 180,
    createdBy: '张总',
    createdAt: '2024-03-01T09:30:00Z'
  }
];

export const mockPersonnel: Personnel[] = [
  {
    id: '1',
    name: '张伟',
    position: '高级前端工程师',
    organizationId: '3',
    email: 'zhang.wei@company.com',
    phone: '13800138001',
    joinDate: '2023-03-15',
    status: 'active',
    department: '技术研发部',
    manager: '王组长',
    createdBy: '李部长',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '2',
    name: '李娜',
    position: 'UI设计师',
    organizationId: '3',
    email: 'li.na@company.com',
    phone: '13800138002',
    joinDate: '2023-05-20',
    status: 'active',
    department: '技术研发部',
    manager: '王组长',
    createdBy: '李部长',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '3',
    name: '王强',
    position: '产品经理',
    organizationId: '4',
    email: 'wang.qiang@company.com',
    phone: '13800138003',
    joinDate: '2022-11-10',
    status: 'active',
    department: '市场营销部',
    manager: '陈部长',
    createdBy: '陈部长',
    createdAt: '2024-01-25T11:00:00Z'
  }
];

export const mockOperationLogs: OperationLog[] = [
  {
    id: '1',
    type: 'create',
    entityType: 'organization',
    entityId: '3',
    operatorName: '李部长',
    operatorId: 'user_002',
    timestamp: '2024-02-01T14:15:00Z',
    description: '创建前端开发组'
  },
  {
    id: '2',
    type: 'update',
    entityType: 'personnel',
    entityId: '1',
    operatorName: '王组长',
    operatorId: 'user_003',
    timestamp: '2024-02-15T16:20:00Z',
    changes: {
      position: { old: '前端工程师', new: '高级前端工程师' }
    },
    description: '更新张伟职位信息'
  },
  {
    id: '3',
    type: 'create',
    entityType: 'personnel',
    entityId: '2',
    operatorName: '李部长',
    operatorId: 'user_002',
    timestamp: '2024-01-20T10:30:00Z',
    description: '录入新员工李娜'
  }
];