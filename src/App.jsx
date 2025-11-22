import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const stored = localStorage.getItem('tictac_user');
    if(stored) setUser(JSON.parse(stored));
  },[]);

  const handleAuth = (userObj, token) => {
    localStorage.setItem('tictac_token', token);
    localStorage.setItem('tictac_user', JSON.stringify(userObj));
    setUser(userObj);
  }

  const handleLogout = ()=>{
    localStorage.removeItem('tictac_token');
    localStorage.removeItem('tictac_user');
    setUser(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onAuth={handleAuth} onLogout={handleLogout} />
      <main className="flex-1 container mx-auto p-6">
        <Dashboard user={user} onAuthChange={handleAuth} />
      </main>
    </div>
  )
}
