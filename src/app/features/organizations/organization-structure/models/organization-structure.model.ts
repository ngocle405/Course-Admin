export interface OrganizationStructureModel {
  id: string;
  organizationCode: string;
  organizationName: string;
  determineNum: string;
  signedPerson: string;
  signedDate: string;
  startDate: string;
  endDate: string;
  note: string;
  status: boolean;
  versionList?: VersionListModel[];
}

export interface VersionListModel {
  id: string;
  organizationStructureVersionCode: string;
  organizationStructureVersionNumber: number;
  startDate: string;
  endDate: string;
  organizationStructureId: string;
}
