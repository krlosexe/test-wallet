import React, {useState, useEffect, useReducer, useContext} from 'react'
import {GlobalState, reducer, initialState} from '../store/store'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment';
import StyledBilletera from '../styles/StyledBilletera'
import {base_url, Api} from '../Env'


axios.defaults.withCredentials = true




const Billetera = ({history}) => {

  
  const initialData = {
        cliente: '',
        identification: '',
        saldo: 0,
        recarga: 0,
        ultima_actividad: '',
        token: 0,
        action: 'consultar',
        monto_pago: 0,
        mail: '',
        phone: null
  }

    const [FormData, setFormData] = useState(initialData)
    const [InforBilletera, setInforBilletera] = useState(initialData)
      

    const onChange = (e) => {
      //console.log([e.target.name], e.target.value);
      setFormData({...FormData, [e.target.name]: e.target.value})
      //console.log(FormData, "FORMDATA");
    }

    const onChangePagarConfirmar = (e) => {
        //console.log([e.target.name], e.target.value);
        setInforBilletera({...InforBilletera, [e.target.name]: e.target.value})
        console.log(InforBilletera, "SALDO A PAGAR");
      }
    
    
      const Recargar = () => {

        setInforBilletera({
          ...InforBilletera, 
          action: 'recargar'})
        console.log(FormData, "FORM DATa DESPUES DE PREPAGAR")

        let {recarga, saldo, identification, phone} = InforBilletera

        saldo = parseInt(saldo)
        recarga = parseInt(recarga)
        phone = parseInt(phone)

        if(recarga > 0) {
            axios.post(base_url(Api, `wallet`), {
          recarga,
          identification,
          phone,
        })
        .then(response => {
          console.log(response, "RESPUESTA CONSULTAr BILLETERA")
          Swal.fire({
            title: 'Recarga Exitosa',
            text: `Se han agregado ${recarga} a su billetera`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          setInforBilletera({
            ...InforBilletera, 
            recarga: 0,
            saldo: saldo + recarga
          })
        console.log(InforBilletera, "INFO DE BILLETERA AL PROCESAR SOLICTUD DE PAGO")
        })
        .catch(error => {
          console.log(error, "ERROR AL RECARGAR");
          //dispatch({ type: ERROR_FETCH, payload: error.message })
          Swal.fire({
            title: error.response ?  error.response.data.status : 'ERROR!',
            text: error.response ?  error.response.data.data : error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
        }
    }


    const PrePagar = () =>{
            setInforBilletera({
                ...InforBilletera, 
                action: 'pagar'})
            console.log(FormData, "FORM DATa DESPUES DE PREPAGAR")

        let {monto_pago, saldo, identification, phone, mail} = InforBilletera

        saldo = parseInt(saldo)
        monto_pago = parseInt(monto_pago)
        phone = parseInt(phone)

        if(monto_pago != 0) {
            axios.post('http://localhost:4000/api/billetera/pagar/', {
          saldo,
          monto_pago,
          identification,
          phone,
          mail
        })
        .then(response => {
          console.log(response, "RESPUESTA CONSULTAr BILLETERA")
          Swal.fire({
            title: 'Solicitud de Pago Realizada',
            text: `Se ha enviado a su mail ${mail} la informacion para confirmar el pago`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        console.log(InforBilletera, "INFO DE BILLETERA AL PROCESAR SOLICTUD DE PAGO")
        })
        .catch(error => {
          console.log(error, "ERROR AL SOLICITAR EL PAGO");
          //dispatch({ type: ERROR_FETCH, payload: error.message })
          Swal.fire({
            title: error.response ?  error.response.data.status : 'ERROR!',
            text: error.response ?  error.response.data.data : error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
        }            
    }

    const PreConfirmar = () => {
        setInforBilletera({
            ...InforBilletera, 
            action: 'confirmar'
        })
        let {token, monto_pago, saldo} = InforBilletera

        token = parseInt(token)
        if(token !== 0) {
            axios({ 
                url: 'http://localhost:4000/api/billetera/confirmar/',
                method: 'post',
                data: {token},
                withCredentials: true
            })
        .then(response => {
          console.log(response, "RESPUESTA A CONFIRMAR PAGO")
          Swal.fire({
            title: 'PAGO CONFIRMADO',
            text: `Se ha descontado de su cuenta ${monto_pago}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          console.log(InforBilletera, "INFO DE BILLETERA AL CONFIRMAR PAGO")
        
            setInforBilletera({
            ...InforBilletera, 
            token: 0,
            saldo: (parseInt(saldo)-parseInt(monto_pago))
          })
        })
        .catch(error => {
          console.log(error, "ERROR AL CONFIRMAR PAGO");
          //dispatch({ type: ERROR_FETCH, payload: error.message })
          Swal.fire({
            title: error.response ?  error.response.data.status : 'ERROR!',
            text: error.response ?  error.response.data.data : error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
      }
        console.log(FormData, "FORM DATa DESPUES DE PRECONFIRMR ")
    }

    const onSubmit = async(e) => {
      e.preventDefault()
      console.log(FormData, "FORM LOCAL STATE")
      if (FormData.action === 'consultar') {
        console.log(FormData.action, "FORM ACTION ES CONSULTAr")
        const {identification, phone} = FormData
        
        axios.post(base_url(Api, `wallet/get`), {
          identification,
          phone,
        })
        .then(response => {
          console.log(response.data.names, "RESPUESTA CONSULTAr BILLETERA")
          Swal.fire({
            title: 'Busqueda Exitosa!',
            text: `A continuacion se mustran los datos de su billetera`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          setInforBilletera({
                ...InforBilletera, 
                saldo: 123,
                ultima_actividad: null,
                cliente: response.data.names,
                identification: response.data.identification,
                mail: response.data.email,
                phone: response.data.phone,
                
          })
          console.log(InforBilletera, "INFO DE BILLETERA")
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
          setInforBilletera('')
        })
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
        <StyledBilletera>
          <div className='card-form'>
              <form onSubmit={onSubmit}>
                <input type="text" name="identification" id="identification" placeholder="identification" required value={FormData.identification} onChange={onChange}/>
                <input type="text" 
                        name="phone" 
                        id="phone" 
                        placeholder="phone" 
                        required
                        minLength="9" maxLength="9" required
                        value={FormData.phone} onChange={onChange}/>                
                <button type="submit">{FormData.action}</button>
              </form>
          </div>
          <div className="card-billetera">
              {InforBilletera.saldo
              ? 
              <div className="datos-billetera">
                <section className="saldo">
                  <p>SALDO</p>
                  <h2>{InforBilletera.saldo}</h2>
                </section>
                <section className="actividad">
                  <p>Ultima Actividad</p>
                  <h3>{moment(InforBilletera.ultima_actividad, moment.ISO_8601).fromNow()}</h3>
                </section>
                <section className="usuario">
                <p>USUARIO</p>
                  <h3>{InforBilletera.cliente}</h3>
                  </section>
                <section className="acciones">
                  <button onClick={Recargar}>Recargar</button>
                  {
                      InforBilletera.action === 'recargar' && 
                      <input type='number' 
                            name='recarga' 
                            id='recarga'
                            placeholder='0'
                            min="1"
                            max="999999"
                            required
                            onChange={onChangePagarConfirmar}
                            value={InforBilletera.recarga}/>
                            
                  }
                  <button onClick={PrePagar}>Pagar</button>
                  {
                      InforBilletera.action === 'pagar' && 
                      <input type='number' 
                            name='monto_pago' 
                            id='monto_pago'
                            placeholder='0'
                            min="1"
                            max={(parseInt(InforBilletera)).toString()}
                            required
                            onChange={onChangePagarConfirmar}
                            value={InforBilletera.monto_pago}/>

                  }
                  <button onClick={PreConfirmar}>Confirmar</button>
                  {
                      InforBilletera.action === 'confirmar' && 
                      <input type='number' 
                            name='token' 
                            id='token'
                            placeholder="0"
                            min="000000"
                            max="999999"
                            required
                            onChange={onChangePagarConfirmar}
                            value={InforBilletera.token}/>
                  }
              </section>
            </div>
          :
              
              <h1>Aqui se mostrara informacion de la billetera</h1>
          }
              
          </div>
            
        </StyledBilletera>
    )
}

export default Billetera