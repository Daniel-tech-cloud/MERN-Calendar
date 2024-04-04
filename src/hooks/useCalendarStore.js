import { useSelector } from "react-redux";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector(state => state.calendar );
    
    const onAddEvent = () =>{

    }
    const onDeletEvent = () =>{

    }
  
    return {
        //* Propiedades
        events,
        activeEvent,

        //* Métodosks

  }
}
