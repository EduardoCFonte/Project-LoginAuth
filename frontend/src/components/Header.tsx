import React from 'react'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import logoImobiliare from "../assets/logo_imobiliare.png"

const Header: React.FC = () => (
  <header className="w-full bg-blue-900 h-12 md:h-16 lg:h-20 flex justify-between items-center px-4 ">
    
    <div className='flex-1 flex justify-start'>
      <LockClosedIcon className= "h-8 md:h-12 lg:h-16 pl-6"/>
    </div>

    <div className='flex-1 flex justify-center'>
      <img src={logoImobiliare} alt="Logo da Imobiliare" className='h-10 md:h-14 lg:h-20 pr-16' />
    </div>

    <div className='flex-1'>
    </div>
  </header>
);

export default Header;


  
  
