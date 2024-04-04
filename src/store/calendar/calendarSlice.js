import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        counter: 10
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