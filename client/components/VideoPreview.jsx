import React from 'react'
import YouTube from 'react-youtube'

class VideoPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      video: null,
      startTime: '',
      quoteStart: '',
      quoteEnd: '',
      muteIsVisible: false
    }
    this.grab = this.grab.bind(this)
    this.testHowStarts = this.testHowStarts.bind(this)
    this.testHowEnds = this.testHowEnds.bind(this)
    this.testWholeClip = this.testWholeClip.bind(this)
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)
    this._onReady = this._onReady.bind(this)
    this.muteClip = this.muteClip.bind(this)
    this.unMuteClip = this.unMuteClip.bind(this)
  }

  componentWillMount () {
    this.setState({
      vidurl: this.props.vidurl
    })
  }

  // clear timeout

  grab (timeType) {
    console.log('grabbing time only')
    this.state.video.pauseVideo()
    this.setState({
      [timeType]: Math.floor(this.state.video.getCurrentTime())
    })
  }
  decrease (timeType) {
    if (this.state[timeType]) {
      this.setState({
        [timeType]: this.state[timeType] - 1
      })
      this.state.video.seekTo(this.state[timeType] - 1)
      this.state.video.pauseVideo()
    } else {
      this.grab(timeType)
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
      this.grab(timeType)
    }
  }

  increment (timeType, direction) {
    console.log('increment function started')
    if(direction === 'down') {
      console.log('its down')
    }
    if (this.state[timeType]) {
      if (direction === 'down') {
        this.setState({
          [timeType]: this.state[timeType] - 1
        })
        this.state.video.seekTo(this.state[timeType] - 1)
        this.state.video.pauseVideo()
      } else if (direction === 'up') {
        this.setState({
          [timeType]: this.state[timeType] + 1
        })
        this.state.video.seekTo(this.state[timeType] + 1)
        this.state.video.pauseVideo()
      }
    } else {
      this.grab(timeType)
    }
  }

  testHowStarts () {
    this.state.video.unMute()
    this.state.video.seekTo(this.state.startTime)
    this.state.video.playVideo()
  }
  testHowEnds () {
    this.state.video.unMute()
    this.state.video.seekTo(this.state.quoteEnd - 2)
    this.state.video.playVideo()
    setTimeout(() => this.state.video.pauseVideo(), 2000)
  }
  muteClip () {
    this.state.video.mute()
    this.setState({ muteIsVisible: true })
  }
  unMuteClip () {
    this.state.video.unMute()
    this.setState({ muteIsVisible: false })
  }
  testWholeClip () {
    this.state.video.seekTo(this.state.startTime)
    this.state.video.playVideo()
    setTimeout(() => this.muteClip(), (this.state.quoteStart - this.state.startTime) * 1000)
    setTimeout(() => this.unMuteClip(), (this.state.quoteEnd - this.state.startTime) * 1000)
    setTimeout(() => this.state.video.pauseVideo(), ((this.state.quoteEnd - this.state.startTime) * 1000) + 3000)
  }

  _onReady (event) {
    this.setState({
      video: event.target
    })
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
        <div>
          {this.state.muteIsVisible && <img src="images/mute.png" alt="Mute" className="mutePreview" />}
        </div>
        <div className="player">
          <YouTube videoId={this.props.vidurl} opts={opts} onReady={this._onReady} />
        </div>
        <br />
        Movie <input type='text' />
        <br />
        Quote <input type='text' />
        <br />
        {/* <button onClick={() => this.decrease('startTime')}>&#9669;&#9669;</button> */}
        <input type='button' value='down' onClick={() => this.increment('startTime', value)}/>
        <button onClick={() => this.grab('startTime')}>|| Grab Start Time</button>
        <button onClick = {() => this.increase('startTime')}>&#9659;&#9659;</button>
        <input type='text' value={this.state.startTime} />
        <button onClick={this.testHowStarts}>Test Start Point</button>
        <br />
        <button onClick={() => this.decrease('quoteStart')}>&#9669;&#9669;</button>
        <button onClick={() => this.grab('quoteStart')}>|| Start of Quote</button>
        <button onClick={() => this.increase('quoteStart')}>&#9659;&#9659;</button>
        <input type='text' value={this.state.quoteStart} />
        <button onClick={this.testHowStarts}>Test Start of Quote</button>
        <br />
        <button onClick={() => this.decrease('quoteEnd')}>&#9669;&#9669;</button>
        <button onClick={() => this.grab('quoteEnd')}>|| End of Quote</button>
        <button onClick={() => this.increase('quoteEnd')}>&#9659;&#9659;</button>
        <input type='text' value={this.state.quoteEnd} />
        <button onClick={this.testHowEnds}>Test End of Quote</button>
        <br />
        <button onClick={this.testWholeClip}>Test Timing of entire clip</button>
      </div>
    )
  }
}

export default VideoPreview
