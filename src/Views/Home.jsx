import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getalldollars, sendnewsletter } from '../Redux/Actions';
import { useSelector } from 'react-redux';

function Home() {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
 const dispatch = useDispatch()
  useEffect(() => {
    
    dispatch(getalldollars())
}, []);
const  data= useSelector(state => state?.data);
 
const handleSubmit = (event) => {
  event.preventDefault();
 
  const newErrors = {};

  // Validar campo de nombre
  if (!form.nombre.trim()) {
    newErrors.nombre = "El nombre es requerido";
  } else if (form.nombre.length > 20) {
    newErrors.nombre = "El nombre debe tener como máximo 20 caracteres";
  }

  // Validar campo de email
  if (!form.email.trim()) {
    newErrors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
    newErrors.email = "El email no es válido";
  } else if (form.email.length > 30) {
    newErrors.email = "El email debe tener como máximo 30 caracteres";
  }

  

  setErrors(newErrors);

  // Si no hay errores, enviar el formulario
  if (Object.keys(newErrors).length === 0) {
   
    dispatch(sendnewsletter(form));
   
  
    setForm({
      nombre: "",
      email: "",
     
    });
    
  }
  
};
let ultimoValorVariacion = 0;

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-slate-300">
      <h1 className="font-bold text-4xl mt-5 ml-7">Precio del DÓLAR HOY en Argentina</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-4xl">
        <div className="p-4 bg-gray-200 rounded-lg">
        <h2 className="font-bold text-xl text-center mb-2">Dólar blue</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-bold text-gray-600">Compra:</p>
              <p className="text-green-700 text-2xl font-bold">${data[1]?.compra}
          </p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">Venta:</p>
              <p className="text-red-700 text-2xl font-bold">${data[1]?.venta}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="font-bold text-xl text-center mb-2">Dólar Oficial</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-bold text-gray-600">Compra:</p>
              <p className="text-green-700 text-2xl font-bold">${data[0]?.compra}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">Venta:</p>
              <p className="text-red-700 text-2xl font-bold">${data[0]?.venta}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="font-bold text-xl text-center mb-2">Dólar contado con liqui</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-bold text-gray-600">Compra:</p>
              <p className="text-green-700 text-2xl font-bold">${data[3]?.compra}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">Venta:</p>
              <p className="text-red-700 text-2xl font-bold">${data[3]?.venta}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="font-bold text-xl text-center mb-2">Dólar Turista</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-bold text-gray-600">Compra:</p>
              <p className="text-green-700 text-2xl font-bold">${data[4]?.compra}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">Venta:</p>
              <p className="text-red-700 text-2xl font-bold">${data[4]?.venta}</p>
            </div>
          </div>
         
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="font-bold text-xl text-center mb-2">Dólar bolsa</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-bold text-gray-600">Compra:</p>
              <p className="text-green-700 text-2xl font-bold">${data[2]?.compra}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">Venta:</p>
              <p className="text-red-700 text-2xl font-bold">${data[2]?.venta}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="font-bold text-xl text-center mb-2">Dólar mayorista</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-bold text-gray-600">Compra:</p>
              <p className="text-green-700 text-2xl font-bold">${data[5]?.compra}</p>
            </div>
          
            <div className="text-center">
              <p className="font-bold text-gray-600">Venta:</p>
              <p className="text-red-700 text-2xl font-bold">${data[5]?.venta}</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-light mt-8 ml-6">¿Te gustaría recibir notificaciones del movimiento en tiempo real del dólar blue?✔️</h2>
      <h1 className='font-bold mt-16 text-2xl mr-4'>NEWSLETTER</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label htmlFor="name" className="text-lg font-bold mb-2 mr-2">
            Nombre:
          </label>
          <input
            value={form.nombre}
            type="text"
            id="nombre"
            name="nombre"
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded"
            placeholder="Ingrese su nombre"
          />
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-0">
          <label htmlFor="email" className="text-lg font-bold mb-2 ml-4 mr-2">
            Email:
          </label>
          <input
            value={form.email}
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded"
            placeholder="Ingrese su email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <button
          type="submit"
          className=" mt-5 md:ml-4 md:mt-0 bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Suscribirse
        </button>
      </form>
    </div>
  );
}

export default Home;
