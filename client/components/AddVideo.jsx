import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import VideoPreview from './VideoPreview'

class AddVideo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vidurl: ''
    }
  }

  changeYouTubeUrl (evt) {
    this.setState({ vidurl: evt.target.value })
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <Header />
        <br />
        <br />
        <div className="something">
          <br />
          <h2 className="title subtitle is-2"><strong>Add a Scene Yourself!</strong></h2>
          <br />
          <p className="subtitle">
            Find a clip on <a href="https://www.youtube.com/" target="_blank"><img src='images/youtube.png' alt='YouTube' width='100' /></a> and paste it below.
          </p>
          <VideoPreview vidurl={this.something} />
          <input type='text' onChange={this.changeYouTubeUrl.bind(this)} className='new-vid-form' />
          <br />
          <Link to="/">
            <button className="button is-large is-danger">Back to Home</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default AddVideo

// const AddVideo = props => {
//   return <div>

//     <Header />
//     <br />
//     <br />
//     <div className="something">
//       <br />
//       <h2 className="title subtitle is-2"><strong>Add a Scene Yourself!</strong></h2>
//       <br />
//       <p className="subtitle">
//         Find a clip on <a href="https://www.youtube.com/" target="_blank"><img src='images/youtube.png' alt='YouTube' width='100'/></a> and paste it below.
//       </p>
//       <input type='text' className='new-vid-form'/>
//       <br />
//       <Link to="/">
//         <button className="button is-large is-danger">Back to Home</button>
//       </Link>
//     </div>
//   </div>
// }

// export default AddVideo
