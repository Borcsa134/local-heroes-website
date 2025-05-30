'use client';
import { Calendar } from '@heroui/calendar';
import { DateValue, ScrollShadow } from '@heroui/react';
import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  parseDateTime,
  toCalendarDate,
  today,
} from '@internationalized/date';
import Link from 'next/link';
import React from 'react';
import { I18nProvider } from 'react-aria';

import { Event } from '@/payload-types';

import EventBadge from './eventBadge';

interface Props {
  events: Event[];
}

function getUpcomingEvents(events: Event[], currentDate: CalendarDate) {
  return events
    .filter((event) => toCalendarDate(parseAbsoluteToLocal(event.eventDate as string)) >= currentDate)
    .sort((a, b) => parseDateTime(a.eventDate as string).compare(parseDateTime(b.eventDate as string)));
}

export default function CalendarBadge(props: Props) {
  const dateToday = today(getLocalTimeZone());
  const [currentDate, setCurrentDate] = React.useState(dateToday);
  const upcomingEvents = getUpcomingEvents(props.events, currentDate);

  const isDateUnavailable = (date: DateValue) => {
    return (
      props.events.every((event) => date.compare(parseAbsoluteToLocal(event.eventDate as string)) != 0) &&
      date.compare(dateToday) != 0
    );
  };

  return (
    <div className="mb-4 flex sm:flex-row max-h-[315px] justify-between">
      <I18nProvider locale="hu-HU">
        <Calendar
          value={currentDate}
          onChange={setCurrentDate}
          isDateUnavailable={isDateUnavailable}
          calendarWidth={275}
          hideDisabledDates
          showMonthAndYearPickers
          classNames={{
            base: 'hidden sm:block',
            cellButton: '!no-underline',
          }}
        ></Calendar>
      </I18nProvider>
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
