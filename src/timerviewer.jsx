import React from "react";

export default function TimerViewer(myProps) {
    let m;
    if (myProps.min < 10) {
        m = "0" + myProps.min;
    } else {
        m = myProps.min;
    }
    return (
        <div className="timerContainer">
            <div className="timerContainer__timer">
                <h1 className="timerContainer__timer__countDown">
                    {m + " : " + myProps.sec}
                </h1>
            </div>
        </div>
    );
}
