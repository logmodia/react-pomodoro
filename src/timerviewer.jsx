import React from "react";

export default function TimerViewer(myProps) {
    let m, s, labelCount;
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

    switch (myProps.WTorBT) {
        case "WT":
            labelCount = "Work";
            break;
        case "BT":
            labelCount = "Break";
            break;

        default:
            labelCount = "Waitting...";
            break;
    }

    return (
        <div className="timerContainer">
            <div className="timerContainer__timer">
                <div className="gridFormatTimer">
                    <h5 className="labelMin min">
                        {"Min"}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {"Sec"}
                    </h5>
                    <h1 className="timerContainer__timer__countDown countDown">
                        {m + " : " + s}
                    </h1>
                    <h5 className="wt">{labelCount}</h5>
                </div>
            </div>
        </div>
    );
}
