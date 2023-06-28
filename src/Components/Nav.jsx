import React from 'react';

function Nav() {
  return (
    <nav className="bg-green-500 ">
      <div className="container mx-auto flex flex-col  ml-6 items-start">
        <div className="text-white mt-4 text-2xl font-bold">dolarkey</div>
        <div className="text-black font-bold">a tu alcance</div>
      </div>
      <div className="container mx-auto ">
        <ul className="flex justify-center items-center gap-20 space-x-4">
          <li>
            <a href="#" className="text-white font-medium hover:text-gray-300">Home</a>
          </li>
         
          <li>
            <a href="#" className="text-white font-medium hover:text-gray-300">Sobre nosotros</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
