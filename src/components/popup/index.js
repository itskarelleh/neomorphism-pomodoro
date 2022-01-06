import React from 'react';
import './popup.scss';

export default function Popup({ onClick, children }) {

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