import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import VideoPreview from './VideoPreview'

class AddVideo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vidurl: '',
      video: null
    }
    this.changeYouTubeUrl = this.changeYouTubeUrl.bind(this)
  }

  changeYouTubeUrl (evt) {
    let fullUrl = evt.target.value
    if (fullUrl.includes('iframe')) {
      let srcUrl = fullUrl.split(' ').splice(3, 1).toString()
      let reducedUrl = srcUrl.slice(srcUrl.length - 12, srcUrl.length - 1)
      this.setState({ vidurl: reducedUrl })
    } else if (!fullUrl.includes('youtu')) {
      this.setState({ vidurl: fullUrl })
    } else if (fullUrl.includes('&feature')) {
      let untimedUrl = fullUrl.split('&feature').splice(0, 1).toString()
      let reducedUrl = untimedUrl.slice(untimedUrl.length - 11, untimedUrl.length)
      this.setState({ vidurl: reducedUrl })
    } else if (!fullUrl.includes('?t=')) {
      let reducedUrl = fullUrl.slice(fullUrl.length - 11, fullUrl.length)
      this.setState({ vidurl: reducedUrl })
    } else {
      let untimedUrl = fullUrl.split('?t=').splice(0, 1).toString()
      let reducedUrl = untimedUrl.slice(untimedUrl.length - 11, untimedUrl.length)
      this.setState({ vidurl: reducedUrl })
    }
    console.log(this.state.vidurl)
  }

  saveVideo (e) {
    this.setState({
      video: e.target
    })
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
          <input type='text' onChange={this.changeYouTubeUrl} className='new-vid-form' />
          <br />
          <VideoPreview vidurl={this.state.vidurl} />
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
