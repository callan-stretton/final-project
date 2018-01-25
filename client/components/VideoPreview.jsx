import React from 'react'
import YouTube from 'react-youtube'

class VideoPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.grabTimeStamp = this.grabTimeStamp.bind(this)
    this.myProps = this.myProps.bind(this)
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
        <div className="disableClick">
          <YouTube videoId={this.props.vidurl} opts={opts} />
        </div>
        <br />
        <button className="button is-large is-danger" onClick={this.grabTimeStamp}>Grab Time</button>
        <button className="button is-large is-danger" onClick={this.myProps}>Props</button>
      </div>
    )
  }
}

export default VideoPreview
