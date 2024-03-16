import { Card, CardBody } from '@nextui-org/card';
import { OstDocument } from 'outstatic';

type Props = {
  event: OstDocument<{
    [key: string]: unknown;
  }>;
  key: string;
};

export default function EventBadge(props: Props) {
  const { event } = props;
  return (
    <Card className="py-3 mb-4 md:max-w-[45%]">
      <CardBody className="flex flex-row overflow-visible justify-between py-0 min-h-[120px] max-h-[120px]">
        <div className="flex flex-col">
          <p className="text-xl md:text-2xl uppercase font-bold pb-2">{event.title}</p>
          <p className="italic pb-2">{event.content}</p>
          <p className="text-sm sm:text-base">Discord csatorna: {event.discordChannel as string}</p>
        </div>
      </CardBody>
    </Card>
  );
}
