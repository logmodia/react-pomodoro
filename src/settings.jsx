import React from "react";
let x;
export default function Settings(settings) {
    function mousedownIncreaseWT() {
        x = setInterval(function () {
            settings.incrementWorkTime();
        }, 100);
    }

    function mousedownDecreaseWT() {
        x = setInterval(function () {
            settings.decreaseWorkTime();
        }, 100);
    }
    function mousedownIncreaseBT() {
        x = setInterval(function () {
            settings.incrementBreakTime();
        }, 100);
    }

    function mousedownDecreaseBT() {
        x = setInterval(function () {
            settings.decreaseBreakTime();
        }, 100);
    }
    function mousedownIncreaseRepeat() {
        x = setInterval(function () {
            settings.incrementRepeat();
        }, 100);
    }

    function mousedownDecreaseRepeat() {
        x = setInterval(function () {
            settings.decreaseRepeat();
        }, 100);
    }

    function leavemouse() {
        clearInterval(x);
    }

    return (
        <div className="settings">
            <span>{"work time : "}</span>
            <div className="settings__containerInputAndBtn">
                <button
                    className="containerInputAndBtn__Btn"
                    onMouseDown={mousedownDecreaseWT}
                    onMouseUp={leavemouse}>
                    -
                </button>
                <input
                    type="number"
                    value={settings.workTime}
                    className="containerInputAndBtn__input"
                    readOnly
                />
                <button
                    className="containerInputAndBtn__Btn"
                    onMouseDown={mousedownIncreaseWT}
                    onMouseUp={leavemouse}>
                    +
                </button>
            </div>

            <div className="settings__containerInputAndBtn">
                <span>{"Break time : "}</span>
                <button
                    className="containerInputAndBtn__Btn"
                    onMouseDown={mousedownDecreaseBT}
                    onMouseUp={leavemouse}>
                    -
                </button>
                <input
                    type="number"
                    value={settings.breakTime}
                    className="containerInputAndBtn__input"
                />
                <button
                    className="containerInputAndBtn__Btn"
                    onMouseDown={mousedownIncreaseBT}
                    onMouseUp={leavemouse}>
                    +
                </button>
            </div>

            <div className="settings__containerInputAndBtn">
                <span>{"Repeat : "}</span>
                <button
                    className="containerInputAndBtn__Btn"
                    onMouseDown={mousedownDecreaseRepeat}
                    onMouseUp={leavemouse}>
                    -
                </button>
                <input
                    type="number"
                    value={settings.repeat}
                    className="containerInputAndBtn__input"
                />
                <button
                    type="button"
                    className="containerInputAndBtn__Btn"
                    onMouseDown={mousedownIncreaseRepeat}
                    onMouseUp={leavemouse}>
                    +
                </button>
            </div>
        </div>
    );
}
