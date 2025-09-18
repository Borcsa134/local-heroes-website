import { Card, CardBody } from '@heroui/card';
import { getDayOfWeek, parseAbsoluteToLocal } from '@internationalized/date';

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
      <CardBody className="p-0 min-h-[150px] max-h-[150px]">
        <div className="flex flex-col grow-1 justify-between">
          <h2 className="text-xl md:text-2xl uppercase font-bold pb-2">{event.title}</h2>
          <p className="grow-1 line-clamp-3">{event.summary}</p>
          {event.regularEvent == false && (
            <p>
              {parseAbsoluteToLocal(event.eventDate as string)
                .toDate()
                .toLocaleString('hu-HU', { timeStyle: 'short', dateStyle: 'short' })}
            </p>
          )}
          {event.regularEvent == true && (
            <p>
              Minden héten{' '}
              {weekDays[getDayOfWeek(parseAbsoluteToLocal(event.eventDate as string), 'hu-HU')]
                + ' '
                + parseAbsoluteToLocal(event.eventDate as string)
                  .toDate()
                  .toLocaleString('hu-HU', { timeStyle: 'short' })}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
