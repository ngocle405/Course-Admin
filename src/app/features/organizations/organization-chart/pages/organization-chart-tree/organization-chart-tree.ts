import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModel } from '../../models/organization-chart.model';
import { OrganizationChartService } from '../../services/organization-chart.service';
import * as _ from 'lodash';

@Component({
  templateUrl: './organization-chart-tree.html',
  styleUrls: ['./organization-chart-tree.scss'],
})
export class OrganizationChartTreeComponent implements OnInit {
  constructor(private service: OrganizationChartService) {}

  data!: TreeNode<OrganizationChartModel>[];

  selectedNode?: TreeNode<OrganizationChartModel>;

  ngOnInit() {
    this.service.getDataTree().subscribe({
      next: (dataTree: OrganizationChartModel[]) => {
        const listNode: TreeNode<OrganizationChartModel>[] = _.map(dataTree, (item) => {
          return <TreeNode<OrganizationChartModel>>{
            data: item,
            label: item.vietnameseName,
            expanded: true,
            styleClass: 'department',
          };
        });
        this.data = _.filter(listNode, (item) => !item.data!.parentCode);
        this.mapTreePermission(listNode, this.data);
      },
    });
  }

  mapTreePermission(list: TreeNode<OrganizationChartModel>[], listParent: TreeNode<OrganizationChartModel>[]) {
    for (const item of listParent) {
      const listChildren = list?.filter((i) => i.data!.parentCode === item.data!.code);
      if (listChildren.length > 0) {
        item.children = listChildren;
        this.mapTreePermission(list, item.children);
      }
    }
  }
}
