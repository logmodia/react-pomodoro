import React, {useState, useEffect} from "react";
import "../src/app.scss";
import TimerViewer from "./timerviewer";
import Settings from "./settings";

let s = 60;
let m = 0;
let runTimer;
let playPauseTiltle = "Pause";
let activReset = "init";

export function App() {
    const [start, setStart] = useState(false);
    const [sec, setSec] = useState("");
    const [min, setMin] = useState("");

    const [workTime, setworkTime] = useState(25);
    const [breakTime, setbreakTime] = useState(5);
    const [repeat, setrepeat] = useState(1);

    const incrementWorkTime = () => {
        setworkTime((x) => (x = x + 1));
    };
    const decreaseWorkTime = () => {
        setworkTime((x) => {
            x > 0 ? x-- : (x = 0);
            return x;
        });
    };

    const incrementBreakTime = () => {
        setbreakTime((x) => (x = x + 1));
    };
    const decreaseBreakTime = () => {
        setbreakTime((x) => {
            x > 0 ? x-- : (x = 0);
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
            x > 0 ? x-- : (x = 0);
            return x;
        });
    };

    const reset = () => {
        activReset = true;
        setSec("00");
        setMin("00");
        clearInterval(runTimer);
        m = 0;
        s = 0;
        setStart(false);
        playPauseTiltle = "Pause";
    };

    useEffect(() => {
        if (start == true) {
            runTimer = setInterval(() => {
                s = s - 1;
                if (s == 0 && m == 0) {
                    reset();
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
            setStart(true);
            setInterval(runTimer, 1000);

            activReset = false;
            playPauseTiltle = "Pause";
        } else {
            setStart(true);
            setInterval(runTimer, 1000);
            playPauseTiltle = "Pause";
        }
    };

    const resetTimer = () => {
        reset();
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
        <div className="mainDiv">
            <h1 className="title">{"MyPomodoro"}</h1>
            <div className="containerMainBtn-Timer">
                <div className="containerMainBtn-Timer__containerMainBtn">
                    <button className="mainBtn" onClick={startTimer}>
                        Start
                    </button>
                    <button className="mainBtn" onClick={pauseTimer}>
                        {playPauseTiltle}
                    </button>
                    <button className="mainBtn" onClick={resetTimer}>
                        Reset
                    </button>
                </div>
                <TimerViewer min={min} sec={sec} />
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
    );
}
