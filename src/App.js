import React from "react"
import "./App.scss"

export default function App() {

    const [breakVal, setBreakVal] = React.useState(5)
    const [sessionVal, setSessionVal] = React.useState(25)
    const [timerPlaying, setTimerPlaying] = React.useState(false)
    const [timerType, setTimerType] = React.useState("Session")
    const [timeLeft, setTimeLeft] = React.useState(1500)

    const handleBreakIncrease = () => {
        if (breakVal < 60) {
            setBreakVal(breakVal + 1)
        }
    }

    const handleBreakDecrease = () => {
        if (breakVal > 1) {
            setBreakVal(breakVal - 1)
        } 
    }

    const handleSessionIncrease = () => {
        if (sessionVal < 60) {
            setSessionVal(sessionVal + 1)
            setTimeLeft(timeLeft + 60)
        } 
    }

    const handleSessionDecrease = () => {
        if (sessionVal > 1) {
            setSessionVal(sessionVal - 1)
            setTimeLeft(timeLeft - 60)
        } 
    }

    const title = timerType === "Session" ? "Session" : "Break" 

    const timeout = setTimeout(() => {
        if (timeLeft && timerPlaying) {
            setTimeLeft(timeLeft - 1)
        }
    }, 1000)

    const play = () => {
        clearTimeout(timeout)
        setTimerPlaying(!timerPlaying)
    }

    const resetTimer = () => {
        const audio = document.getElementById("beep")
        if (!timeLeft && timerType === "Session") {
            setTimeLeft(breakVal * 60) //convert time to seconds
            setTimerType("Break")
            audio.play()
        }
        if (!timeLeft && timerType === "Break") {
            setTimeLeft(sessionVal * 60)
            setTimerType("Session")
            audio.pause()
            audio.currentTime = 0
        }
    }

    const clock = () => {
        if (timerPlaying) {
            resetTimer()
            return timeout
        } else {
            clearTimeout(timeout)
        }
    }

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft - minutes * 60
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes
        const secondsFormatted = seconds < 10 ? '0' + seconds : seconds
        return `${minutesFormatted}:${secondsFormatted}`
    }

    const reset = () => {
        clearTimeout(timeout)
        setTimerPlaying(false)
        setTimeLeft(1500)
        setBreakVal(5)
        setSessionVal(25)
        setTimerType("Session")
        const audio = document.getElementById("beep")
        audio.pause()
        audio.currentTime = 0
    }

    React.useEffect(() => {
        clock()
    }, [timerPlaying, timeLeft, timeout])

    return (
        <div className="container">
            <h1>Pomodoro Clock</h1>
            <div className="break-session-container">
                <div className="break">
                    <h3 id="break-label">Break Length</h3>
                    <div className="break-control">
                        <button disabled={timerPlaying} onClick={handleBreakIncrease} className="control-btn" id="break-increment"><ion-icon name="caret-up-outline"></ion-icon></button>
                        <div id="break-length">{breakVal}</div>
                        <button disabled={timerPlaying} onClick={handleBreakDecrease} className="control-btn" id="break-decrement"><ion-icon name="caret-down-outline"></ion-icon></button>
                    </div>
                </div>
                <div className="session">
                    <h3 id="session-label">Session Length</h3> 
                    <div className="session-control">
                        <button disabled={timerPlaying} onClick={handleSessionIncrease} className="control-btn" id="session-increment"><ion-icon name="caret-up-outline"></ion-icon></button>
                        <div id="session-length">{sessionVal}</div>
                        <button disabled={timerPlaying} onClick={handleSessionDecrease} className="control-btn" id="session-decrement"><ion-icon name="caret-down-outline"></ion-icon></button>
                    </div>
                </div>
            </div>
            <div className="timer-container">
                <h3 id="timer-label">{title}</h3>
                <div id="time-left">{formatTime()}</div>
            </div>
            <div className="master-control">
                <button onClick={play} className="control-btn" id="start_stop">
                    <ion-icon name="play"></ion-icon>
                    <ion-icon name="pause"></ion-icon>
                </button>
                <button onClick={reset} className="control-btn" id="reset">
                    <ion-icon name="refresh"></ion-icon>
                </button>
            </div>
            <audio 
                id="beep"
                preload="auto"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    )
}
