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
  <div className="container mx-auto py-10 bg-gray-100">
    <h1 className="text-4xl font-bold text-center mb-10">Precio del DÓLAR HOY en Argentina</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Dólar blue</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-600">Compra:</p>
            <p className="text-2xl font-bold text-green-700">${data[1]?.compra}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Venta:</p>
            <p className="text-2xl font-bold text-red-700">${data[1]?.venta}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Dólar Oficial</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-600">Compra:</p>
            <p className="text-2xl font-bold text-green-700">${data[0]?.compra}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Venta:</p>
            <p className="text-2xl font-bold text-red-700">${data[0]?.venta}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Dólar contado con liqui</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-600">Compra:</p>
            <p className="text-2xl font-bold text-green-700">${data[3]?.compra}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Venta:</p>
            <p className="text-2xl font-bold text-red-700">${data[3]?.venta}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Dólar Turista</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-600">Compra:</p>
            <p className="text-2xl font-bold text-green-700">${data[4]?.compra}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Venta:</p>
            <p className="text-2xl font-bold text-red-700">${data[4]?.venta}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Dólar bolsa</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-600">Compra:</p>
            <p className="text-2xl font-bold text-green-700">${data[2]?.compra}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Venta:</p>
            <p className="text-2xl font-bold text-red-700">${data[2]?.venta}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Dólar mayorista</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-600">Compra:</p>
            <p className="text-2xl font-bold text-green-700">${data[5]?.compra}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Venta:</p>
            <p className="text-2xl font-bold text-red-700">${data[5]?.venta}</p>
          </div>
        </div>
      </div>
    </div>
    <h2 className="text-2xl font-light mt-8 text-center">¿Te gustaría recibir notificaciones del movimiento en tiempo real del dólar blue?</h2>
    <h1 className="font-bold mt-16 text-2xl text-center">NEWSLETTER</h1>
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mt-4 justify-center items-center">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="name" className="text-lg font-bold mb-2">
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
        <label htmlFor="email" className="text-lg font-bold mb-2 ml-4">
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
        className="mt-5 bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Suscribirse
      </button>
    </form>
  </div>
);
}

export default Home;
