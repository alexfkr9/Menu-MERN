import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {   

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Навигация</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/">Все посетители</Link></li>
          <li><Link to="/user">Создать заказ</Link></li>
          <li><Link to="/create">Создать меню</Link></li>
          <li><Link to="/create_mat">Создать меню Material</Link></li>         
        </ul>
      </div>
    </nav>
  )
}
