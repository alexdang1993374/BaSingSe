import React from 'react';

import "./Button.css"

interface Props {
    className?: string;
    onClick: () => void;
    text: string;
    isSecondary?: boolean;
}

const Button: React.FC<Props> = ({ className = "", onClick, text, isSecondary  }) =>  <button className={`button ${className} ${isSecondary ? 'secondary': ""}`} onClick={onClick}>{text}</button>;

export default Button;