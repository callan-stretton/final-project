import React from 'react'
import YouTube from 'react-youtube'

class VideoPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      video: null,
      startTime: null,
      quoteStart: null,
      quoteEnd: null
    }
    this.grabStartTime = this.grabStartTime.bind(this)
    this.grabQuoteStart = this.grabQuoteStart.bind(this)
    this.grabQuoteEnd = this.grabQuoteEnd.bind(this)
    this.myProps = this.myProps.bind(this)
    this._onReady = this._onReady.bind(this)
  }

  componentWillMount (event) {
    this.setState({
      vidurl: this.props.vidurl
    })
  }

  grabStartTime (event) {
    console.log(Math.floor(this.state.video.getCurrentTime()))
    this.setState({
      startTime: Math.floor(this.state.video.getCurrentTime())
    })
  }
  grabQuoteStart (event) {
    console.log(Math.floor(this.state.video.getCurrentTime()))
    this.setState({
      quoteStart: Math.floor(this.state.video.getCurrentTime())
    })
  }
  grabQuoteEnd (event) {
    console.log(Math.floor(this.state.video.getCurrentTime()))
    this.setState({
      quoteEnd: Math.floor(this.state.video.getCurrentTime())
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
        Movie <input type='text' />
        <br />
        Quote <input type='text' />
        <br />
        <button className="button is-large is-danger" onClick={this.grabStartTime}>Grab Start Time</button>
        <input type='text' value={this.state.startTime} />
        <br />
        <button className="button is-large is-danger" onClick={this.grabQuoteStart}>Start of Quote</button>
        <input type='text' value={this.state.quoteStart} />
        <br />
        <button className="button is-large is-danger" onClick={this.grabQuoteEnd}>End of Quote</button>
        <input type='text' value={this.state.quoteEnd} />
      </div>
    )
  }
}

export default VideoPreview
