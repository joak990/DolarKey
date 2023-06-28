
import Swal from 'sweetalert2';
import axios from "axios"
import { GET_DOLAR } from "./Types";
const url100= "https://www.mercadopago.com.ar/checkout/v1/payment/redirect?preference-id=605411115-d9958e62-77cb-4342-af05-dfd624093eaa&router-request-id=1d738b2a-fe05-4861-a793-a9bfc640a455"
const url300="https://www.mercadopago.com.ar/checkout/v1/payment/redirect/sniffing?sniffing-rollout=sniffing-api&router-request-id=324d6402-530c-40e2-abc4-dbc38a376a06&preference-id=605411115-663f1bec-0c6b-42b9-b6c4-23a142bac365"
const url500="https://www.mercadopago.com.ar/checkout/v1/payment/redirect/c1a90141-6013-400c-a68c-a4eb4744ca60/payment-option-form/?preference-id=605411115-71a409d3-fb8e-40fc-ac67-516ee7791bb5&router-request-id=eaaf9293-d7c3-40f4-9782-951a1a4ee640&p=931461430409e758e950c7a60b9e975b#/"
export function getalldollars() {
    return function (dispatch) {
      axios
        .get("/")
        .then((response) => {
            
          dispatch({ type: GET_DOLAR, payload: response.data });
        })
        .catch(() => {
          alert("clasificados no encontrados");
        });
    };
  }


  export const sendnewsletter = (payload) => {

    return async function () {
      try {
      
        const response = await axios.post("/newsletter", payload);
        
       if(response.data.sucess === true){
       return Swal.fire({
            icon: 'warning',
            title: 'Correo ya registrado',
            text: 'El correo ingresado ya está registrado.',
          });
       }
       if(response.data.sucess === false){
        Swal.fire({
          title: '¡Suscripción exitosa!',
          text: '¿Deseas realizar una donación por tu suscripción?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Sí, donar',
          cancelButtonText: 'No, gracias',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Selecciona el monto de donación',
              icon: 'success',
              input: 'select',
              inputOptions: {
                '500': '$500',
                '200': '$200',
                '100': '$100',
              },
              inputPlaceholder: 'Selecciona un monto',
              showCancelButton: true,
              confirmButtonText: 'Donar',
              cancelButtonText: 'Cancelar',
              inputValidator: (value) => {
                if (!value) {
                  return 'Debes seleccionar un monto de donación';
                }
              },
            }).then((donationResult) => {
              if (donationResult.isConfirmed) {
                const selectedAmount = donationResult.value;
                let donationLink = '';
        
                if (selectedAmount === '500') {
                  donationLink = url500;
                } else if (selectedAmount === '300') {
                  donationLink = url300;
                } else if (selectedAmount === '100') {
                  donationLink = url100;
                }
        
                window.open(donationLink, '_blank');
              }
            });
          }
        });
       }
     
        
      }
      catch (error) {
      
        console.error(error);
        return { failed: false };
      }
    };
  };
