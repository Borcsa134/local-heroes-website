'use client';
import { CalendarDate, getLocalTimeZone, parseDateTime, toCalendarDate, today, toZoned } from '@internationalized/date';
import { Calendar } from '@nextui-org/calendar';
import { ScrollShadow } from '@nextui-org/react';
import Link from 'next/link';
import { OstDocument } from 'outstatic';
import React from 'react';

import EventBadge from './eventBadge';

type Events = OstDocument<{
  [key: string]: unknown;
}>;

interface Props {
  events: Events[];
}

function getUpcomingEvents(events: Events[], currentDate: CalendarDate) {
  return events.filter(
    (event) => toCalendarDate(toZoned(parseDateTime(event.eventDate as string), getLocalTimeZone())) > currentDate
  );
}

export default function CalendarBadge(props: Props) {
  const [currentDate, setCurrentDate] = React.useState(today(getLocalTimeZone()));
  return (
    <div className="flex flex-row max-h-[300px] justify-between">
      <Calendar value={currentDate} onChange={setCurrentDate}></Calendar>
      <ScrollShadow>
        {getUpcomingEvents(props.events, currentDate).map((event) => (
          <Link key={event.slug} href={'/events/' + event.slug}>
            <EventBadge key={event.slug} event={event} />
          </Link>
        ))}
      </ScrollShadow>
    </div>
  );
}
