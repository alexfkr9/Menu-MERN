import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {   

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Навигация</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/">Все посетители</NavLink></li>
          <li><NavLink to="/user">Создать заказ</NavLink></li>
          <li><NavLink to="/create">Создать меню</NavLink></li>          
        </ul>
      </div>
    </nav>
  )
}
