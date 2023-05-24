import { Calendar } from "@fullcalendar/core";
import bootstrapPlugin from '@fullcalendar/bootstrap'
import dayGridPlugin from '@fullcalendar/daygrid'

const calendarEl = document.getElementById('calendar')
const calendar = new Calendar(calendarEl, {
  plugins: [
    bootstrapPlugin,
    dayGridPlugin
  ],
  themeSystem: 'bootstrap', // important!
  initialView: 'dayGridMonth'
})

calendar.render()