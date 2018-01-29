import React from 'react'
import YouTube from 'react-youtube'

class VideoPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      video: null,
      startTime: '',
      quoteStart: '',
      quoteEnd: ''
    }
    this.grabStartTime = this.grabStartTime.bind(this)
    this.grabQuoteStart = this.grabQuoteStart.bind(this)
    this.grabQuoteEnd = this.grabQuoteEnd.bind(this)
    this.testStartTime = this.testStartTime.bind(this)
    this.testQuoteStart = this.testQuoteStart.bind(this)
    this.testQuoteEnd = this.testQuoteEnd.bind(this)
    this.decreaseStartTime = this.decreaseStartTime.bind(this)
    this.increaseStartTime = this.increaseStartTime.bind(this)
    this.decreaseQuoteStart = this.decreaseQuoteStart.bind(this)
    this.increaseQuoteStart = this.increaseQuoteStart.bind(this)
    this.decreaseQuoteEnd = this.decreaseQuoteEnd.bind(this)
    this.increaseQuoteEnd = this.increaseQuoteEnd.bind(this)
    this.testWholeClip = this.testWholeClip.bind(this)
    this._onReady = this._onReady.bind(this)
  }

  componentWillMount () {
    this.setState({
      vidurl: this.props.vidurl
    })
  }

  grabStartTime () {
    this.state.video.pauseVideo()
    this.setState({
      startTime: Math.floor(this.state.video.getCurrentTime())
    })
  }
  decreaseStartTime () {
    this.setState({
      startTime: this.state.startTime - 1
    })
    this.state.video.seekTo(this.state.startTime - 1)
    this.state.video.pauseVideo()
  }
  increaseStartTime () {
    this.setState({
      startTime: this.state.startTime + 1
    })
    this.state.video.seekTo(this.state.startTime + 1)
    this.state.video.pauseVideo()
  }
  testStartTime () {
    this.state.video.seekTo(this.state.startTime)
    this.state.video.playVideo()
    // setTimeout(() => this.state.video.pauseVideo(), 3000)
  }
  grabQuoteStart () {
    this.state.video.pauseVideo()
    this.setState({
      quoteStart: Math.floor(this.state.video.getCurrentTime())
    })
  }
  decreaseQuoteStart () {
    this.setState({
      quoteStart: this.state.quoteStart - 1
    })
    this.state.video.seekTo(this.state.quoteStart - 1)
    this.state.video.pauseVideo()
  }
  increaseQuoteStart () {
    this.setState({
      quoteStart: this.state.quoteStart + 1
    })
    this.state.video.seekTo(this.state.quoteStart + 1)
    this.state.video.pauseVideo()
  }
  testQuoteStart () {
    this.state.video.seekTo(this.state.quoteStart)
    this.state.video.playVideo()
    // setTimeout(() => this.state.video.pauseVideo(), 3000)
  }
  grabQuoteEnd () {
    this.state.video.pauseVideo()
    this.setState({
      quoteEnd: Math.floor(this.state.video.getCurrentTime())
    })
  }
  decreaseQuoteEnd () {
    this.setState({
      quoteEnd: this.state.quoteEnd - 1
    })
    this.state.video.seekTo(this.state.quoteEnd - 1)
    this.state.video.pauseVideo()
  }
  increaseQuoteEnd () {
    this.setState({
      quoteEnd: this.state.quoteEnd + 1
    })
    this.state.video.seekTo(this.state.quoteEnd + 1)
    this.state.video.pauseVideo()
  }
  testQuoteEnd () {
    this.state.video.seekTo(this.state.quoteEnd - 3)
    this.state.video.playVideo()
    setTimeout(() => this.state.video.pauseVideo(), 3000)
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
        <button onClick={this.decreaseStartTime}>&#9669;&#9669;</button>
        <button onClick={this.grabStartTime}>|| Grab Start Time</button>
        <button onClick={this.increaseStartTime}>&#9659;&#9659;</button>
        <input type='text' value={this.state.startTime} />
        <button onClick={this.testStartTime}>Test Start Point</button>
        <br />
        <button onClick={this.decreaseQuoteStart}>&#9669;&#9669;</button>
        <button onClick={this.grabQuoteStart}>|| Start of Quote</button>
        <button onClick={this.increaseQuoteStart}>&#9659;&#9659;</button>
        <input type='text' value={this.state.quoteStart} />
        <button onClick={this.testQuoteStart}>Test Start of Quote</button>
        <br />
        <button onClick={this.decreaseQuoteEnd}>&#9669;&#9669;</button>
        <button onClick={this.grabQuoteEnd}>|| End of Quote</button>
        <button onClick={this.increaseQuoteEnd}>&#9659;&#9659;</button>
        <input type='text' value={this.state.quoteEnd} />
        <button onClick={this.testQuoteEnd}>Test End of Quote</button>
        <br />
        <button onClick={this.testWholeClip}>Test Timing of entire clip</button>
      </div>
    )
  }
}

export default VideoPreview
