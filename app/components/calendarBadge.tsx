'use client';
import { Calendar } from '@heroui/calendar';
import { DateValue, ScrollShadow, Switch } from '@heroui/react';
import {
  CalendarDate,
  getDayOfWeek,
  getLocalTimeZone,
  parseAbsoluteToLocal,
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

function convertToCalendarDate(dateString: string) {
  return toCalendarDate(parseAbsoluteToLocal(dateString));
}

function getUpcomingEvents(events: Event[], currentDate: CalendarDate) {
  return events
    .filter((event) => convertToCalendarDate(event.eventDate as string) >= currentDate)
    .sort((a, b) => convertToCalendarDate(a.eventDate as string).compare(convertToCalendarDate(b.eventDate as string)));
}

function getNonRegularEvents(events: Event[]) {
  return events.filter((event) => event.regularEvent === false);
}
function getRegularEvents(events: Event[]) {
  return events.filter((event) => event.regularEvent === true);
}

export default function CalendarBadge(props: Props) {
  const dateToday = today(getLocalTimeZone());
  const [currentDate, setCurrentDate] = React.useState(dateToday);
  const [showRegularEvents, setShowRegularEvents] = React.useState(true);

  const nonRegularEvents = getNonRegularEvents(props.events);
  const regularEvents = getRegularEvents(props.events);

  const upcomingNonRegularEvents = getUpcomingEvents(nonRegularEvents, currentDate);
  const upcomingEvents = [...upcomingNonRegularEvents, ...regularEvents];

  const isDateUnavailable = (date: DateValue) => {
    const nonRegularEventAvailable = nonRegularEvents.every(
      (event) => date.compare(parseAbsoluteToLocal(event.eventDate as string)) != 0 && date.compare(dateToday) != 0,
    );
    const regularEventAvailable = regularEvents.every(
      (event) =>
        date.compare(parseAbsoluteToLocal(event.eventDate as string)) != 0
        && getDayOfWeek(date, 'hu-HU') != getDayOfWeek(parseAbsoluteToLocal(event.eventDate as string), 'hu-HU'),
    );
    return showRegularEvents ? nonRegularEventAvailable && regularEventAvailable : nonRegularEventAvailable;
  };

  return (
    <div className="mb-4 flex sm:flex-row max-h-[600px] justify-between">
      <div>
        <I18nProvider locale="hu-HU">
          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            isDateUnavailable={isDateUnavailable}
            calendarWidth={275}
            hideDisabledDates
            showMonthAndYearPickers
            classNames={{
              base: 'hidden sm:block max-h-[315px] mt-5 ml-5',
              cellButton: '!no-underline',
            }}
          ></Calendar>
        </I18nProvider>
        <Switch
          isSelected={showRegularEvents}
          onValueChange={setShowRegularEvents}
          className="hidden sm:block ml-5 mt-5"
          classNames={{ label: 'ms-5' }}
        >
          Mutasd a heti nyitásokat
        </Switch>
      </div>
      <ScrollShadow className="grow sm:ml-4 px-5 pt-5">
        {(showRegularEvents ? upcomingEvents : upcomingNonRegularEvents).map((event) => (
          <Link key={event.slug} href={'/events/' + event.slug}>
            <EventBadge key={event.slug} event={event} />
          </Link>
        ))}
        {!(showRegularEvents ? upcomingEvents : upcomingNonRegularEvents).length && (
          <div className="flex flex-col justify-center h-full">
            <p className="text-center italic text-gray-500">A közeljövőben nincs esemény</p>
          </div>
        )}
      </ScrollShadow>
    </div>
  );
}
