import { getLocalTimeZone, parseDateTime, toZoned } from '@internationalized/date';
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

const defaultClassNames = 'p-4 mb-4';
const regularClassNames = 'p-4 md:first:mr-2 md:[&:nth-child(n+2):nth-last-child(n+2)]:mx-2 md:last:ml-2';

export default function EventBadge(props: Props) {
  const { event } = props;
  return (
    <Card
      className={event.regularEvent == 'true' ? regularClassNames : defaultClassNames}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(var(--starting-color)) 20%, rgba(var(--ending-color)) 100%), url(${event.coverImage})`,
        backgroundSize: 'cover',
      }}
    >
      <CardBody className="flex flex-row overflow-visible justify-between p-0 min-h-[120px] max-h-[120px]">
        <div className="flex flex-col justify-between">
          <p className="text-xl md:text-2xl uppercase font-bold pb-2">{event.title}</p>
          {event.regularEvent == 'true' && (
            <div>
              <div dangerouslySetInnerHTML={{ __html: toNormalString(event.content) }}></div>
              {(event.discordChannel as string) && (
                <p className="text-sm sm:text-base">Discord csatorna: {event.discordChannel as string}</p>
              )}
            </div>
          )}
          {(event.regularEvent == 'false' || event.regularEvent == '') && (
            <div>
              {toZoned(parseDateTime(event.eventDate as string), getLocalTimeZone())
                .toDate()
                .toLocaleString('hu-HU', { timeStyle: 'short', dateStyle: 'short' })}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
