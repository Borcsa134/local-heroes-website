import { Card, CardBody } from '@heroui/card';
import { getDayOfWeek, parseAbsoluteToLocal } from '@internationalized/date';

import { RichText } from './richText';

const defaultClassNames = 'p-4 mb-4';
const regularClassNames = 'p-4 md:first:mr-2 md:[&:nth-child(n+2):nth-last-child(n+2)]:mx-2 md:last:ml-2';

export default function EventBadge(props) {
  const weekDays = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
  const { event } = props;
  return (
    <Card
      className={event.regularEvent == 'true' ? regularClassNames : defaultClassNames}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(var(--starting-color)) 20%, rgba(var(--ending-color)) 100%), url(${event.coverImage})`,
        backgroundSize: 'cover',
      }}
    >
      <CardBody className="flex flex-row overflow-visible justify-between p-0 min-h-[150px] max-h-[150px]">
        <div className="flex flex-col justify-between">
          <p className="text-xl md:text-2xl uppercase font-bold pb-2">{event.title}</p>
          {event.regularEvent == true && (
            <div>
              <RichText data={event.content} />
              {(event.discordChannel as string) && (
                <p className="text-sm sm:text-base">Discord csatorna: {event.discordChannel as string}</p>
              )}
            </div>
          )}
          {event.regularEvent == false && (
            <div>
              {parseAbsoluteToLocal(event.eventDate as string)
                .toDate()
                .toLocaleString('hu-HU', { timeStyle: 'short', dateStyle: 'short' })}
            </div>
          )}
          {event.regularEvent == true && (
            <div>
              Minden héten{' '}
              {weekDays[getDayOfWeek(parseAbsoluteToLocal(event.eventDate as string), 'hu-HU')]
                + ' '
                + parseAbsoluteToLocal(event.eventDate as string)
                  .toDate()
                  .toLocaleString('hu-HU', { timeStyle: 'short' })}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
