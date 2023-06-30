
import Swal from 'sweetalert2';
import axios from "axios"
import { GET_DOLAR } from "./Types";
const url100= "http://mpago.la/15x4rJf"
const url300="http://mpago.la/2TZEYAa"
const url500="http://mpago.la/1NyhESg"
export function getalldollars() {
    return function (dispatch) {
      axios
        .get("/")
        .then((response) => {
            
          dispatch({ type: GET_DOLAR, payload: response.data });
        })
        .catch(() => {
          alert("error");
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
