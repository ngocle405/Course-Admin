import { TreeNode } from 'primeng/api';

export interface OrganizationChartModel {
  id: number;
  code: string;
  vietnameseName: string;
  parentCode?: string;
}
