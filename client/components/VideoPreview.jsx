import React from 'react'
import YouTube from 'react-youtube'

class VideoPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      video: null,
      currentTime: null
    }
    this.grabTimeStamp = this.grabTimeStamp.bind(this)
    this.myProps = this.myProps.bind(this)
    this._onReady = this._onReady.bind(this)
  }

  componentWillMount (event) {
    this.setState({
      vidurl: this.props.vidurl
    })
  }

  grabTimeStamp (event) {
    console.log(Math.floor(this.state.video.getCurrentTime()))
    this.setState({
      currentTime: Math.floor(this.state.video.getCurrentTime())
    })
  }

  _onReady (event) {
    this.setState({
      video: event.target
    })
  }

  myProps () {
    console.log('this.props.vidurl = ', this.props.vidurl)
  }

  render () {
    const opts = {
      width: '640',
      height: '360',
      playerVars: {
        autoplay: 1,
        rel: 0,
        controls: 1,
        showinfo: 0,
        modestbranding: 0,
        iv_load_policy: 3
      }
    }
    return (
      <div>
        <div className="player">
          <YouTube videoId={this.props.vidurl} opts={opts} onReady={this._onReady} />
        </div>
        <br />
        <button className="button is-large is-danger" onClick={this.grabTimeStamp}>Grab Time</button>
        <input type='text' value={this.state.currentTime} />
      </div>
    )
  }
}

export default VideoPreview
