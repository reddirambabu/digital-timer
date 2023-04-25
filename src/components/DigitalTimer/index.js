// Write your code here
import {Component} from 'react'

import './index.css'

const initial = {
  isRunningStatus: false,
  timerLimitInMinutes: 25,
  timerElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initial

  componentWillUnmount() {
    this.clearIntervalTime()
  }

  clearIntervalTime = () => {
    clearInterval(this.timerId)
  }

  increaseElapseTime = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state

    const isCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isCompleted) {
      this.clearIntervalTime()
      this.setState((timerElapsedInSeconds: 0))
    } else {
      this.setState(previousState => ({
        timerElapsedInSeconds: previousState.timerElapsedInSeconds + 1,
      }))
    }
  }

  toggleRunningStatus = () => {
    const {isRunningStatus} = this.state
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state

    const isCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isCompleted) {
      this.clearIntervalTime()
    }

    if (isRunningStatus) {
      this.clearIntervalTime()
    } else {
      this.timerId = setInterval(this.increaseElapseTime, 1000)
    }

    this.setState(previousState => ({
      isRunningStatus: !previousState.isRunningStatus,
    }))
  }

  onResetTimer = () => {
    this.clearIntervalTime()
    this.setState(initial)
  }

  renderTimeController = () => {
    const {isRunningStatus} = this.state
    const imageUrl = isRunningStatus
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imageAltText = isRunningStatus ? 'pause icon' : 'play icon'
    const displayText = isRunningStatus ? 'Pause' : 'Start'

    return (
      <div className="timeController-container">
        <button
          type="button"
          className="button-container"
          onClick={this.toggleRunningStatus}
        >
          <img src={imageUrl} alt={imageAltText} className="icon-image" />
          <p className="icon-label">{displayText}</p>
        </button>
        <button
          type="button"
          className="button-container"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon-image"
          />
          <p className="icon-label">Reset</p>
        </button>
      </div>
    )
  }

  onDecreaseNumber = () => {
    const {timerLimitInMinutes} = this.state
    const isGreater = timerLimitInMinutes > 0
    if (isGreater) {
      this.setState(previousState => ({
        timerLimitInMinutes: previousState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseNumber = () => {
    this.setState(previousState => ({
      timerLimitInMinutes: previousState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isRunning = timerElapsedInSeconds > 0

    return (
      <div>
        <p>Set Timer Limit</p>
        <div className="time-limit-container">
          <button
            type="button"
            className="minus"
            disabled={isRunning}
            onClick={this.onDecreaseNumber}
          >
            -
          </button>
          <div className="limit-text-button">
            <p>{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="minus"
            disabled={isRunning}
            onClick={this.onIncreaseNumber}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  timer = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const remainingSeconds = timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    console.log(minutes, seconds)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunningStatus} = this.state
    return (
      <div className="app-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="timer-display-container">
          <div className="timer-details-container">
            <div className="timer-container">
              <h1 className="time">{this.timer()}</h1>
              <p className="timer-label">
                {isRunningStatus ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="time-controller-container">
            {this.renderTimeController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
