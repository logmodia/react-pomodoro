import React, {useState, useEffect, useRef} from "react";
import "../src/app.scss";
import TimerViewer from "./timerviewer";
import Settings from "./settings";

let s = 0;
let m = 0;
let runTimer;
let playPauseTiltle = "Pause";
let activReset = "init";
let WTorBT = "Waitting...";
let RT = 1;
let styleHideModal = {visibility: "hidden"};

export function App() {
    const longBeep = useRef();
    const shortBeep = useRef();

    const [start, setStart] = useState(false);
    const [sec, setSec] = useState("0");
    const [min, setMin] = useState("0");

    const [workTime, setworkTime] = useState(25);
    const [breakTime, setbreakTime] = useState(5);
    const [repeat, setrepeat] = useState(1);

    const playshortBeep = () => {
        shortBeep.current.currentTime = 0;
        shortBeep.current.play();
    };
    const playlongBeep = () => {
        longBeep.current.currentTime = 0;
        longBeep.current.play();
    };

    const incrementWorkTime = () => {
        setworkTime((x) => (x = x + 1));
    };
    const decreaseWorkTime = () => {
        setworkTime((x) => {
            x > 1 ? x-- : (x = 1);
            return x;
        });
    };

    const incrementBreakTime = () => {
        setbreakTime((x) => (x = x + 1));
    };
    const decreaseBreakTime = () => {
        setbreakTime((x) => {
            x > 1 ? x-- : (x = 1);
            return x;
        });
    };

    const incrementRepeat = () => {
        let x = repeat;
        x++;
        setrepeat((x) => (x = x + 1));
    };
    const decreaseRepeat = () => {
        setrepeat((x) => {
            x > 1 ? x-- : (x = 1);
            return x;
        });
    };

    const reset = () => {
        activReset = true;
        setStart(false);
        clearInterval(runTimer);
        m = 0;
        s = 0;
        setSec("00");
        setMin("0");
        playPauseTiltle = "Pause";
    };

    useEffect(() => {
        if (activReset == "init") {
            setSec("00");
        }
        if (start == true) {
            runTimer = setInterval(() => {
                s = s - 1;
                if (m === 0 && s < 10) {
                    playshortBeep();
                }
                if (s == 0 && m == 0) {
                    if (WTorBT == "WT") {
                        WTorBT = "BT";
                        m = breakTime - 1;
                        s = 59;
                        playlongBeep();
                    } else {
                        //End of break time----------
                        if (RT <= 0) {
                            reset();
                            WTorBT = "Waitting...";
                            playlongBeep();
                            styleHideModal = {visibility: "visible"};
                        } else {
                            RT = RT - 1;
                            WTorBT = "WT";
                            m = workTime - 1;
                            s = 59;
                        }
                    }
                } else if (s == 0) {
                    s = 59;
                    m = m - 1;
                }

                setSec(s);
                setMin(m);
            }, 1000);
        }
    }, [start]);

    const startTimer = () => {
        if (activReset == true || activReset == "init") {
            m = workTime - 1;
            s = 60;
            RT = repeat - 1;
            setStart(true);
            setInterval(runTimer, 1000);

            activReset = false;
            playPauseTiltle = "Pause";
            WTorBT = "WT";
            styleHideModal = {visibility: "hidden"};
        } else {
            setStart(true);
            setInterval(runTimer, 1000);
            playPauseTiltle = "Pause";
        }
    };

    const resetTimer = () => {
        reset();
    };

    const stopPomodoro = () => {
        reset();
        styleHideModal = {visibility: "hidden"};
    };

    const pauseTimer = () => {
        switch (playPauseTiltle) {
            case "Pause":
                clearInterval(runTimer);
                setStart(false);
                playPauseTiltle = "Play";
                break;

            case "Play":
                setStart(true);
                setInterval(runTimer, 1000);
                playPauseTiltle = "Pause";
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className="mainDiv">
                <h1 className="title" onClick={playshortBeep}>
                    {"MyPomodoro"}
                </h1>
                <div className="containerMainBtn-Timer">
                    <div className="containerMainBtn-Timer__containerMainBtn">
                        <button
                            type="button"
                            className="mainBtn"
                            onClick={startTimer}>
                            Start
                        </button>
                        <button
                            type="button"
                            className="mainBtn"
                            onClick={pauseTimer}>
                            {playPauseTiltle}
                        </button>
                        <button
                            type="button"
                            className="mainBtn"
                            onClick={resetTimer}>
                            Reset
                        </button>
                    </div>
                    <TimerViewer min={min} sec={sec} WTorBT={WTorBT} />
                </div>

                <Settings
                    workTime={workTime}
                    breakTime={breakTime}
                    repeat={repeat}
                    incrementWorkTime={incrementWorkTime}
                    decreaseWorkTime={decreaseWorkTime}
                    incrementBreakTime={incrementBreakTime}
                    decreaseBreakTime={decreaseBreakTime}
                    incrementRepeat={incrementRepeat}
                    decreaseRepeat={decreaseRepeat}
                />
            </div>
            <div className={"bgModal"} style={styleHideModal}>
                <div className="bgModal__modal">
                    <p className="bgModal__modal__p">
                        {"Do you want to restart ?"}
                    </p>
                    <div className="bgModal__modal__containerBtn">
                        <button
                            type="button"
                            onClick={startTimer}
                            className="bgModal__modal__containerBtn__Btn">
                            {"Yes, Restart"}
                        </button>
                        <button
                            type="button"
                            onClick={stopPomodoro}
                            className="bgModal__modal__containerBtn__Btn">
                            {"No, Stop"}
                        </button>
                    </div>
                </div>
                <audio src="/shortBeep.wav" ref={shortBeep}></audio>
                <audio src="/longBeep.wav" ref={longBeep}></audio>
            </div>
        </>
    );
}
