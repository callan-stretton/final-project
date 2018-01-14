import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const AddVideo = props => {
  return <div>

    <Header />
    <br />
    <br />
    <div className="something">
      <br />
      <h2 className="title subtitle is-2"><strong>Add a Scene Yourself!</strong></h2>
      <br />
      <p className="subtitle">
        Find a clip on <a href="https://www.youtube.com/"><img src='images/youtube.png' alt='YouTube' width='100'/></a> and paste it below.
      </p>
      <br />
      <Link to="/">
        <button className="button is-large is-danger">Back to Home</button>
      </Link>
    </div>
  </div>
}

export default AddVideo
