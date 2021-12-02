import React from 'react';

const Button = ({ label, icon, handleClick, children }) => (
    <>
        <button className="btn-small" onClick={handleClick}>
            <div>
                {icon && icon}
                {label && <p>label</p>}
                {children}
            </div>
        </button>
    </>
)

export default Button;