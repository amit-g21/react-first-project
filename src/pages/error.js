import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section>
      <h1>404</h1>
      <h3>page not found</h3>
      <Link to='/'>back to home</Link>
    </section>
  )
}

export default Error
