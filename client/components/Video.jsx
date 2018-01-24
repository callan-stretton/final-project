import React from 'react'
import YouTube from 'react-youtube'
import ReactCountdownClock from 'react-countdown-clock'

import Dictaphone from './Dictaphone'

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerCanSpeak: false,
      countdownIsVisible: false,
      muteIsVisible: false,
      video: null,
      vidurl: '',
      startTime: 0,
      quoteStart: 0,
      quoteEnd: 0,
      pauseTime: 0,
      timeLeft: 3 // instead 0?
    }
    this.saveVideo = this.saveVideo.bind(this)
    this.startClip = this.startClip.bind(this)
    this.muteClip = this.muteClip.bind(this)
    this.pauseClip = this.pauseClip.bind(this)
    this.restartClip = this.restartClip.bind(this)
    this.endVideo = this.endVideo.bind(this)
    this.hideCountdown = this.hideCountdown.bind(this)
    this.hideStart = this.hideStart.bind(this)
  }

  componentWillMount() {
    const { randomVid } = this.props
    console.log('test: ', randomVid)
    this.setState({
      playerCanSpeak: false,
      startVisible: true,
      speakPromptIsVisible: false,
      countdownIsVisible: false,
      muteIsVisible: false,
      vidurl: randomVid.vid_url,
      startTime: randomVid.startTime,
      quoteStart: randomVid.quoteStart,
      quoteEnd: randomVid.quoteEnd,
      pauseTime: randomVid.pauseTime
    })
  }

  saveVideo(e) {
    this.setState({
      video: e.target
    })
  }

  startClip() {
    this.hideStart()
    const { video, quoteStart, startTime } = this.state
    video.seekTo(startTime)
    video.playVideo()
    setTimeout(() => this.muteClip(), ((quoteStart - startTime) + 2) * 1000)
  }
  hideStart() {
    this.setState({ startVisible: false })
  }

  hideCountdown() {
    this.setState({ countdownIsVisible: false, playerCanSpeak: true })
  }
  hideSpeakPrompt() {
    this.setState({ speakPromptIsVisible: false })
  }
  muteClip() {
    this.state.video.mute()
    this.setState({ muteIsVisible: true })
    setTimeout(() => this.pauseClip(), ((this.state.quoteEnd - this.state.quoteStart) + 1) * 1000)
  }
  pauseClip() {
    this.state.video.pauseVideo()
    this.setState({ muteIsVisible: false })
    this.setState({ countdownIsVisible: true })
    setTimeout(() => this.setState({ speakPromptIsVisible: true }), 5000)
    setTimeout(() => this.hideCountdown(), 5000)

  }
  restartClip() {
    this.state.video.seekTo(this.state.quoteStart)
    this.state.video.unMute()
    setTimeout(() => this.endVideo(), 500)
    this.hideSpeakPrompt()
  }
  endVideo() {
    this.state.video.playVideo()
    setTimeout(() => this.state.video.pauseVideo(), (this.state.quoteEnd - this.state.quoteStart) * 1000)
  }

  render() {
    const opts = {
      width: '1024',
      height: '576',
      playerVars: {
        rel: 0,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3
      }
    }
    return (
      <div>
        <div className="countdown title has-text-centered">
          {this.state.countdownIsVisible && <ReactCountdownClock className="countdown-clock-comp"
            seconds={5}
            showMilliseconds={false}
            color="#631cf2"
            size={576}
            weight={100} />}
          {this.state.muteIsVisible && <img src="images/mute.png" alt="Mute" className="mute" />}
        </div>
        <div className="disableClick">
          <YouTube videoId={this.state.vidurl} opts={opts} onReady={this.saveVideo} />
        </div>
        <br />
        {this.state.startVisible && <button className="button is-large is-danger" onClick={this.startClip}>Start</button>}
        {this.state.speakPromptIsVisible && <h2 className="subtitle is-4">Please speak clearly into the microphone</h2>}
        <Dictaphone restartClip={this.restartClip} randomVid={this.props.randomVid} handleClick={this.props.handleClick} startVisible={this.state.startVisible} playerCanSpeak={this.state.playerCanSpeak} />
      </div>
    )
  }
}

export default Video