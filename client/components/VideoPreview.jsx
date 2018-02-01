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
    this.increase = this.increase.bind(this)
    this._onReady = this._onReady.bind(this)
  }

  componentWillMount () {
    this.setState({
      vidurl: this.props.vidurl
    })
  }

// clear timeout

  grabStartTime () {
    this.state.video.pauseVideo()
    this.setState({
      startTime: Math.floor(this.state.video.getCurrentTime())
    })
  }
  decreaseStartTime () {
    if (this.state.startTime) {
      this.setState({
        startTime: this.state.startTime - 1
      })
      this.state.video.seekTo(this.state.startTime - 1)
      this.state.video.pauseVideo()
    } else {
      this.grabStartTime()
    }
  }
  increaseStartTime () {
    if (this.state.startTime) {
      this.setState({
        startTime: this.state.startTime + 1
      })
      this.state.video.seekTo(this.state.startTime + 1)
      this.state.video.pauseVideo()
    } else {
      this.grabStartTime()
    }
  }
  increase (timeType) {
    if (this.state[timeType]) {
      this.setState({
        [timeType]: this.state[timeType] + 1
      })
      this.state.video.seekTo(this.state[timeType] + 1)
      this.state.video.pauseVideo()
    } else {
      this.grabStartTime()
    }
  }
  testStartTime () {
    this.state.video.unMute()
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
    if (this.state.quoteStart) {
      this.setState({
        quoteStart: this.state.quoteStart - 1
      })
      this.state.video.seekTo(this.state.quoteStart - 1)
      this.state.video.pauseVideo()
    } else {
      this.grabQuoteStart()
    }
  }
  increaseQuoteStart () {
    if (this.state.quoteStart) {
      this.setState({
        quoteStart: this.state.quoteStart + 1
      })
      this.state.video.seekTo(this.state.quoteStart + 1)
      this.state.video.pauseVideo()
    } else {
      this.grabQuoteStart()
    }
  }
  testQuoteStart () {
    this.state.video.unMute()
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
    if (this.state.quoteEnd) {
      this.setState({
        quoteEnd: this.state.quoteEnd - 1
      })
      this.state.video.seekTo(this.state.quoteEnd - 1)
      this.state.video.pauseVideo()
    } else {
      this.grabQuoteEnd()
    }
  }
  increaseQuoteEnd () {
    if (this.state.quoteEnd) {
      this.setState({
        quoteEnd: this.state.quoteEnd + 1
      })
      this.state.video.seekTo(this.state.quoteEnd + 1)
      this.state.video.pauseVideo()
    } else {
      this.grabQuoteEnd()
    }
  }
  testQuoteEnd () {
    this.state.video.unMute()
    this.state.video.seekTo(this.state.quoteEnd - 2)
    this.state.video.playVideo()
    setTimeout(() => this.state.video.pauseVideo(), 2000)
  }
  testWholeClip () {
    this.state.video.seekTo(this.state.startTime)
    this.state.video.playVideo()
    setTimeout(() => this.state.video.mute(), (this.state.quoteStart - this.state.startTime) * 1000)
    setTimeout(() => this.state.video.unMute(), (this.state.quoteEnd - this.state.startTime) * 1000)
    setTimeout(() => this.state.video.pauseVideo(), ((this.state.quoteEnd - this.state.startTime) * 1000) + 3000)
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
        <button onClick = {() => this.increase('startTime')}>&#9659;&#9659;</button>
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
