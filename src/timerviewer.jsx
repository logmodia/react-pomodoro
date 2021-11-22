import React from "react";

export default function TimerViewer(myProps) {
    let m, s;
    if (myProps.min < 10) {
        m = "0" + myProps.min;
    } else {
        m = myProps.min;
    }
    if (myProps.s < 10) {
        s = "0" + myProps.sec;
    } else {
        s = myProps.sec;
    }
    return (
        <div className="timerContainer">
            <div className="timerContainer__timer">
                <h1 className="timerContainer__timer__countDown">
                    {m + " : " + s}
                </h1>
            </div>
        </div>
    );
}
