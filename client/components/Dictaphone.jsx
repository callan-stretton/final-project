import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import {setPlayerScores} from '../actions/playerScores'
import Sound from 'react-sound'

import { connect } from 'react-redux'
const propTypes = {
  transcript: PropTypes.string,
  finalTranscript: PropTypes.string,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

const perfectScore = {url: '/sounds/applausesound.mp3', start: 0}
const six9 = {url: '/sounds/applus.mp3', start: 0}
const three5 = { url: '/sounds/crowd-disappointed.mp3', start: 4 }
const one2 = {url: '/sounds/trumpet-drown.mp3', start: 0}
const noPoints = {url: '/sounds/WrongBuzzer.mp3', start: 0}

class Dictaphone extends Component {
  constructor (props) {
    super(props)
    this.state = {
      points: null,
      finalTranscript: '',
      finished: false,
      transcriptStarted: false,
      speakVisible: true,
      submitVisible: false,
      continueVisible: false,
      soundPlaying: false,
      response: {}
    }
    this.stopListeningClick = this.stopListeningClick.bind(this)
    this.checkScore = this.checkScore.bind(this)
    this.startSpeak = this.startSpeak.bind(this)
    this.stopSubmit = this.stopSubmit.bind(this)
    this.playSound = this.playSound.bind(this)
  }

  componentDidMount () {
    this.setState({
      submitVisible: false,
      continueVisible: false,
      soundPlaying: false,
      speakVisible: true
    })
  }

  startSpeak () {
    const {startListening} = this.props
    startListening()
    this.setState({speakVisible: false, submitVisible: true})
  }

  stopSubmit () {
    this.setState({submitVisible: false, continueVisible: true})
    setTimeout(this.playSound, 3000)
  }

  playSound () {
    this.setState({soundPlaying: true})
  }

  submit (resetTranscript, stopListening) {
    stopListening()
    resetTranscript()
    this.props.handleClick()
    this.setState({finalTranscript: ''})
  }

  reworking (points) { // used for minusing points, but not reaching below 0
    if (points < 0) {
      let reworkedPoints = 1 // 1 point (because they still got something right)
      return reworkedPoints
    } else {
      let reworkedPoints = points
      return reworkedPoints
    }
  }
  componentWillReceiveProps ({ finalTranscript, transcript, randomVid, dispatch, round }) {
    if (finalTranscript.length && !this.state.finished) { // IF STATETMENT: if finalTranscript.length is truthy and the state of finished is false
      this.setState({ finished: true }) // set the state of finished to true (to not exceed call stack)
      this.compareFinalTranscript(finalTranscript)
    } else if (transcript.length && !this.state.transcriptStarted) {
      this.setState({ transcriptStarted: true })
    }
  }

  stopListeningClick () {
    this.stopSubmit()
    this.props.stopListening()
    this.props.restartClip()
  }

  checkScore (points) {
    if (points === 10) {
      this.setState({ response: perfectScore })
    } else if (points === 0) {
      this.setState({ response: noPoints })
    } else if (points > 5) {
      this.setState({ response: six9 })
    } else if (points > 2) {
      this.setState({ response: three5 })
    } else {
      this.setState({ response: one2 })
    }
  }

  compareFinalTranscript (finalTranscript) {
    const { randomVid, dispatch, round } = this.props
    var points = 0
    var actual = randomVid.quote
    const actualArr = actual.toLowerCase().split(' ')
    let transArr = finalTranscript.toLowerCase().split(' ')
    console.log('quote from database = ', actual)
    console.log('finalTranscript = ', finalTranscript)
    transArr.forEach((char, idx, transcriptArr) => {
      if (actualArr.find(actualChar => actualChar === char)) points++
    })
    if (finalTranscript.toLowerCase() === actual.toLowerCase()) {
      console.log('Correct, full points!')
      points = 10
      console.log('points: ' + points)
      dispatch(setPlayerScores(points, round.currentPlayer))
      this.checkScore(points)
      return points
    } else if (transArr.length > actualArr.length) {
      let adjustedPoints = (points - (transArr.length - actualArr.length))
      let percentagePoints = Math.round((adjustedPoints / actualArr.length) * 10)
      points = this.reworking(percentagePoints)
      console.log('Ooh, additional words will lose you points')
      console.log('points: ', points)
      dispatch(setPlayerScores(points, round.currentPlayer))
      this.checkScore(points)
      return points
    } else {
      console.log('Not quite...')
      points = Math.round((points / actualArr.length) * 10)
      console.log('points: ', points)
      dispatch(setPlayerScores(points, round.currentPlayer))
      this.checkScore(points)
      return points
    }
  }

  render () {
    const { transcript, startListening, stopListening, resetTranscript, browserSupportsSpeechRecognition, playerScores } = this.props
    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return <div>
      {!this.props.startVisible && this.state.speakVisible && !this.props.playerCanSpeak && <button className="button is-large" disabled>Cameras are rolling ! Get ready !</button>}
      {this.props.playerCanSpeak && this.state.speakVisible && this.startSpeak()}
      {!this.state.transcriptStarted && this.state.submitVisible && <button className="button is-large is-danger" onClick={this.stopListeningClick} disabled>Stop/Submit</button>}
      {this.state.transcriptStarted && this.state.submitVisible && <button className="button is-large is-danger" onClick={this.stopListeningClick}>Stop/Submit</button>}
      <br />
      <input type="text" value={transcript} id="speech-field" className="speech-box" disabled/>
      {this.state.continueVisible && playerScores.length > 0 && <p>
            Score: {playerScores[playerScores.length - 1].score}
      </p>}
      <br />
      {this.state.continueVisible && <button id="next" className="button is-large is-danger" onClick={() => this.submit(resetTranscript, stopListening)}>
            Continue
      </button>}
      {this.state.soundPlaying && <Sound url={this.state.response.url} playStatus={Sound.status.PLAYING} playFromPosition={this.state.response.start}/>}
    </div>
  }
}

Dictaphone.propTypes = propTypes

const options = {
  autoStart: false
}

const mapStateToProps = state => {
  return {
    players: state.players,
    round: state.round,
    videos: state.videos,
    game: state.game,
    playerScores: state.playerScores
  }
}

export default connect(mapStateToProps)(SpeechRecognition(options)(Dictaphone))
