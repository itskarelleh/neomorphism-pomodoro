import './popup.scss';
import React from "react";

export default function Popup({ onClick, children } :
{ onClick: React.MouseEventHandler<HTMLDivElement>,
    children: React.ReactNode
}) {

    return (
        <div className="popup-bg" onClick={onClick}>
            <div className="popup-container">
                <div className="popup-content">
                    {children}
                </div>
            </div>
        </div>
    )
}