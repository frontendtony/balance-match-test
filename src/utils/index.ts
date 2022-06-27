import { Gateway, Project, Report } from 'types';

export function groupReportsByProject(reports: Report[], projects: Project[], gateways: Gateway[]) {
  const projectToReportsMap: Record<
    string,
    Project & { reports: (Report & { gateway: string })[]; totalAmount: number }
  > = projects.reduce((a, c) => ({ ...a, [c.projectId]: { ...c, reports: [], totalAmount: 0 } }), {
    [projects[0].projectId]: { ...projects[0], reports: [], totalAmount: 0 },
  });

  const gatewaysToObject = gateways.reduce((a, c) => ({ ...a, [c.gatewayId]: c }), {
    [gateways[0].gatewayId]: gateways[0],
  });
  reports.forEach((r) => {
    projectToReportsMap[r.projectId]?.reports.push({
      ...r,
      gateway: gatewaysToObject[r.gatewayId].name,
    });
    projectToReportsMap[r.projectId].totalAmount += r.amount;
  });

  return Object.values(projectToReportsMap);
}

export function groupReportsByGateway(reports: Report[], gateways: Gateway[]) {
  const gatewayToReportsMap: Record<string, Gateway & { reports: Report[]; totalAmount: number }> =
    gateways.reduce((a, c) => ({ ...a, [c.gatewayId]: { ...c, reports: [], totalAmount: 0 } }), {
      [gateways[0].gatewayId]: { ...gateways[0], reports: [], totalAmount: 0 },
    });

  reports.forEach((r) => {
    gatewayToReportsMap[r.gatewayId]?.reports.push(r);
    gatewayToReportsMap[r.gatewayId].totalAmount += r.amount;
  });

  return Object.values(gatewayToReportsMap);
}

export function addThousandSeparator(value: number | string, fractionalDigits = 2) {
  return Number(Number(value).toFixed(fractionalDigits)).toLocaleString('en', {
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: fractionalDigits,
  });
}
