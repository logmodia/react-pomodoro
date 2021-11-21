import React, {useState, useRef} from "react";

export default function Settings(settings) {
    return (
        <div>
            <div>
                <button onClick={settings.decreaseWorkTime}>-</button>
                <span>{settings.workTime}</span>
                <button onClick={settings.incrementWorkTime}>+</button>
            </div>
            <div>
                <button onClick={settings.decreaseBreakTime}>-</button>
                <span>{settings.breakTime}</span>
                <button onClick={settings.incrementBreakTime}>+</button>
            </div>
            <div>
                <button onClick={settings.decreaseRepeat}>-</button>
                <span>{settings.repeat}</span>
                <button onClick={settings.incrementRepeat}>+</button>
            </div>
        </div>
    );
}
