import { useQuery } from 'react-query';
import { Gateway } from 'types';

export default function useGateways() {
  const query = useQuery('gateways', async () => {
    const response = await fetch('http://178.63.13.157:8090/mock-api/api/gateways');
    const { data, error }: { code: string; data: Gateway[]; error: string | null } =
      await response.json();

    if (error) throw new Error(error);

    return data;
  });

  return query;
}
