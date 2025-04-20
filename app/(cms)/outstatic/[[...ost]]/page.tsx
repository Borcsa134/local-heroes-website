import { Outstatic } from 'outstatic';
import { OstClient } from 'outstatic/client';
import 'outstatic/outstatic.css';

export default async function Page(props: { params: Promise<{ ost: string[] }> }) {
  const params = await props.params;
  const ostData = await Outstatic();
  return <OstClient ostData={ostData} params={params} />;
}
