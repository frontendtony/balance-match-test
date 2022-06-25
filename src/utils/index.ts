import { Gateway, Project, Report } from 'types';

export function groupReportsByProject(reports: Report[], projects: Project[]) {
  const projectToReportsMap: Record<string, Project & { reports: Report[] }> = projects.reduce(
    (a, c) => ({ ...a, [c.projectId]: { ...c, reports: [] } }),
    { [projects[0].projectId]: { ...projects[0], reports: [] } }
  );

  reports.forEach((r) => {
    projectToReportsMap[r.projectId]?.reports.push(r);
  });

  return projectToReportsMap;
}

export function groupReportsByGateway(reports: Report[], gateways: Gateway[]) {
  const gatewayToReportsMap: Record<string, Gateway & { reports: Report[] }> = gateways.reduce(
    (a, c) => ({ ...a, [c.gatewayId]: { ...c, reports: [] } }),
    { [gateways[0].gatewayId]: { ...gateways[0], reports: [] } }
  );

  reports.forEach((r) => {
    gatewayToReportsMap[r.gatewayId]?.reports.push(r);
  });

  return gatewayToReportsMap;
}

export function addThousandSeparator(value: number | string, fractionalDigits = 2) {
  return Number(Number(value).toFixed(fractionalDigits)).toLocaleString('en', {
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: fractionalDigits,
  });
}
