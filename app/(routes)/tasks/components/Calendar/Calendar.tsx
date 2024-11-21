"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import multiMonth from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js";

import axios from "axios";

import { formatDate } from '@/lib/formatDate'

import { CalendarProps } from "./Calendar.types";

export function Calendar(props: CalendarProps) {
  const { companies, events } = props;
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [onSaveNewEvent, setOnSaveNewEvent] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DateSelectArg>()
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    companieSelected: {
      name: "",
      id: ""
    }
  })

  const handleDateClick = async (selected: DateSelectArg) => {
    setOpen(true)
    setSelectedItem(selected)
  }

  return <div>Calendar</div>;
}
