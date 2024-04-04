import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'Cumpleaños jefe',
    notes: 'Hay que comrpar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user:{
      id: '123',
      name: 'Daniel'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null 
    },
    reducers: {
        increment: (state, /* action */ ) => {
            //! https://react-redux.js.org/tutorials/quick-start
            state.counter += 1;
        },
    }
});
// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;