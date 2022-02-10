import React, {useState, useContext} from 'react'
import {GlobalState} from '../store/store'

import Swal from 'sweetalert2'
import axios from 'axios'
import StyledRegistro from '../styles/StyledRegistro';
import {base_url, Api} from '../Env'

const FormCliente = ({history}) => {

  
  const initialData = {
    identification: '',
    names: undefined,
    email: undefined,
    phone: '',
    action: 'registrar'

  }

    const {state, dispatch} = useContext(GlobalState)
    const [FormData, setFormData] = useState(initialData)
    console.log(state, "ESTE ES STATE");


    const onChange = (e) => {
      setFormData({...FormData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => {
      e.preventDefault()
      console.log(FormData, "FORM LOCAL STATE")

      if (FormData.action === 'registrar') {
        console.log(FormData.action, "FORM ACTION ES registrar")
        const {identification, names, email, phone} = FormData
        
        axios.post(base_url(Api, `clients`), {
          identification,
          names,
          email,
          phone
        })
        .then(response => {
          console.log(response, "RESPUESTA CREAR CLIENTE")
          Swal.fire({
            title: 'Usuario Registrado!',
            text: `Se ha creado su billetera `,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        })
        .catch(error => {
          console.log(error, "error response from fetch");
          //dispatch({ type: ERROR_FETCH, payload: error.message })
          Swal.fire({
            title: error.response ?  error.response.data.status : 'ERROR!',
            text: error.response ?  error.response.data.data : error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          
        })

        history.push('/')
      }
      else{  
        
        Swal.fire({
          title: 'ERROR!',
          text: 'Error al enviar los datos',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

    }

    return (
        <StyledRegistro>
          <h1>Registro de Clientes</h1>
        <div className='card-form'>
            <form onSubmit={onSubmit}>

                <p><input type="text" name="identification" id="identification" placeholder="identification" required value={FormData.identification} onChange={onChange}/></p>
                <p><input type="text" name="names" id="names" placeholder="names" required value={FormData.names} onChange={onChange}/></p>
                <p><input type="text" name="email" id="email" placeholder="email" required value={FormData.email} onChange={onChange}/></p>
                <p><input type="text" 
                    name="phone" 
                    id="phone" 
                    placeholder="phone" 
                    required
                    minLength="9" maxLength="9" required
                    value={FormData.phone} onChange={onChange}/></p>
                
                
                <button type="submit">{FormData.action}</button>
            </form>
        
        </div>
            
        </StyledRegistro>
    )
}

export default FormCliente