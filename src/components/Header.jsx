import React, { useState } from 'react'
import AuthModal from './AuthModal'

export default function Header({ user, onAuth, onLogout }){
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('login');

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">Tic<span className="text-indigo-600">•</span>Tac<span className="text-pink-600">•</span>Toe</div>
          {/* <div className="text-sm text-gray-500">Modern multiplayer rounds</div> */}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="">Welcome <b className='bg-amber-400 border-red-500 px-2 py-1 rounded-full'>{user.name[0]}</b> </div>
              <button onClick={onLogout} className="px-3 py-1 rounded bg-red-50 border">Logout</button>
            </>
          ) : (
            <>
              <button onClick={()=>{ setMode('login'); setOpen(true)}} className="px-3 py-1 rounded bg-indigo-600 text-white">Login</button>
              <button onClick={()=>{ setMode('signup'); setOpen(true)}} className="px-3 py-1 rounded border">Signup</button>
            </>
          )}
        </div>
      </div>

      <AuthModal open={open} setOpen={setOpen} mode={mode} onAuth={onAuth} />
    </header>
  )
}
