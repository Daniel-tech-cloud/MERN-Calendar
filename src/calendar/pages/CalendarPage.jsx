import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEventBox, Navbar } from "../";
import { localizer, getMessageES } from '../../helpers';



const events =[{
  title: 'Cumpleaños jefe',
  notes: 'Hay que comrpar pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user:{
    id: '123',
    name: 'Daniel'
  }
}]


export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = ( event, start, end, isSelected ) =>{
      const style ={
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color:'white'

      }
      return{
        style
      }
      
    }

    const onDoubleClick = ( event ) =>{
      console.log( {doubleClick: event});
    } 

    const onSelect = ( event ) =>{
      console.log( {click: event});
    } 

    const onViewChanged = ( event ) =>{
      localStorage.setItem('lastView', event);
      setLastView(event);
    }

    return (
      <>
        <Navbar />
    
        <Calendar
          culture='es'
          localizer={ localizer }
          events={ events }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px )' }}
          messages={ getMessageES() }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEventBox 
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }

        /> 

      </>
      
      )
}
