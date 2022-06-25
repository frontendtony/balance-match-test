export interface Report {
  paymentId: string;
  amount: number;
  projectId: string;
  gatewayId: string;
  userIds: string[];
  modified: string;
  created: string;
}

export interface Project {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
}

export interface Gateway {
  gatewayId: string;
  userIds: string[];
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
  name: string;
}

export interface ApiResponse<T = unknown> {
  code: string;
  data: T;
  error: string | null;
}

export interface SelectOption {
  value: string;
  label: string;
}
