import React from 'react'

export default function LayoutAuth({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <p>Andelu Dashboard</p>
      <h1 className='text-3xl my-2'>Bienvenidos a mi Dashboard</h1>
      <h2 className='text-2xl mb-3'>Dashboard</h2>
      
      {children}
    </div>
    
  )
}
