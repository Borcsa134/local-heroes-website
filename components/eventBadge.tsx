import { Card, CardBody } from '@nextui-org/card';
import { marked } from 'marked';
import { OstDocument } from 'outstatic';

type Props = {
  event: OstDocument<{
    [key: string]: unknown;
  }>;
  key: string;
};

function toNormalString(mdString: string) {
  return marked.parse(mdString.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''));
}

export default function EventBadge(props: Props) {
  const { event } = props;
  return (
    <Card
      className="py-3 mb-4 md:max-w-[45%]"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(255,255,255,0) 50%, rgba(0,0,0,0.85) 100%), url(${event.coverImage})`,
        backgroundSize: 'cover',
      }}
    >
      <CardBody className="flex flex-row overflow-visible justify-between py-0 min-h-[120px] max-h-[120px]">
        <div className="flex flex-col justify-between">
          <p className="text-xl md:text-2xl uppercase font-bold pb-2">{event.title}</p>
          <div>
            <div dangerouslySetInnerHTML={{ __html: toNormalString(event.content) }}></div>
            {(event.discordChannel as string) && (
              <p className="text-sm sm:text-base">Discord csatorna: {event.discordChannel as string}</p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
