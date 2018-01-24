import React from 'react'
import Header from './Header'
import YouTube from 'react-youtube'

class VideoPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      video: null,
      vidurl: ''
    }
    this.grabTimeStamp = this.grabTimeStamp.bind(this)
  }

  componentWillMount () {
    console.log('test: ', this.props.vidurl)
    this.setState({
      vidurl: this.props.vidurl
    })
  }

  grabTimeStamp () {
    console.log(this.state.video.getCurrentTime())
  }

  render () {
    const opts = {
      width: '1024',
      height: '576'
    }
    return (
      <div>
        <div className="disableClick">
          <YouTube videoId={this.state.vidurl} opts={opts} />
        </div>
        <br />
        <button className="button is-large is-danger" onClick={this.grabTimeStamp}>Grab Time</button>
      </div>
    )
  }
}

export default VideoPreview
