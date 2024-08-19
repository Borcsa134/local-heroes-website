'use client';
import { CalendarDate, getLocalTimeZone, parseDateTime, toCalendarDate, today, toZoned } from '@internationalized/date';
import { Calendar } from '@nextui-org/calendar';
import { DateValue, ScrollShadow } from '@nextui-org/react';
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
    (event) => toCalendarDate(toZoned(parseDateTime(event.eventDate as string), getLocalTimeZone())) >= currentDate
  );
}

export default function CalendarBadge(props: Props) {
  const dateToday = today(getLocalTimeZone());
  const [currentDate, setCurrentDate] = React.useState(dateToday);
  const upcomingEvents = getUpcomingEvents(props.events, currentDate);

  const isDateUnavailable = (date: DateValue) => {
    return (
      props.events.some(
        (event) => date.compare(toZoned(parseDateTime(event.eventDate as string), getLocalTimeZone())) != 0
      ) && date.compare(dateToday) != 0
    );
  };

  return (
    <div className="flex sm:flex-row max-h-[300px] justify-between px-3">
      <Calendar
        value={currentDate}
        onChange={setCurrentDate}
        isDateUnavailable={isDateUnavailable}
        calendarWidth={256}
        classNames={{
          base: 'hidden sm:block',
          cellButton: '!no-underline',
        }}
      ></Calendar>
      <ScrollShadow className="grow sm:ml-4">
        {upcomingEvents.map((event) => (
          <Link key={event.slug} href={'/events/' + event.slug}>
            <EventBadge key={event.slug} event={event} />
          </Link>
        ))}
        {!upcomingEvents.length && (
          <div className="flex flex-col justify-center h-full">
            <p className="text-center italic text-gray-500">A közeljövőben nincs esemény</p>
          </div>
        )}
      </ScrollShadow>
    </div>
  );
}
