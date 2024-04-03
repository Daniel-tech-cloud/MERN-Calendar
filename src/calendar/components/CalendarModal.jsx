import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';

import './CalendarModalStyles.css';
import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert2/dist/sweetalert2.min.css'

import es from 'date-fns/locale/es';

registerLocale( 'es', es );

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState( true );
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [ formValue, setFormValues ] = useState({
        title: 'Daniel',
        notes: 'Barrera',
        start: new Date(),
        end: addHours(new Date(), 2),

    });

    const titleClass = useMemo(() => {
        if( !formSubmitted ) return '';

        return( formValue.title.length > 0 )
            ? 'is-valid'
            : 'is-invalid';

    }, [ formValue.title, formSubmitted])

    const onInputChanged = ( { target } ) => {
        setFormValues({
            ...formValue,
            [ target.name ]: target.value
        })
    }
    
    const onCloseModal = () =>{
        setIsOpen( false );
    }

    const onDateChanged  = ( event, changing ) => {
        setFormValues({
            ...formValue, 
            [changing]: event
        })

    }

    const onSubmit = ( event ) =>{
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds( formValue.end, formValue.start );
        if(isNaN( difference ) || difference <= 0 ){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }
        if( formValue.title.length <= 0 ) 
            return;
        console.log(formValue);
    }


    return (
        <Modal 
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }

        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                   
                        selected={ formValue.start }
                        onChange={ ( event ) => onDateChanged(event, 'start') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'


                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={ formValue.start }
                        selected={ formValue.end }
                        onChange={ ( event ) => onDateChanged(event, 'end') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'

                        
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValue.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValue.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
        

    )
}
