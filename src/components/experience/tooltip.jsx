'use client'
import { useState } from 'react';

const Tooltip = ({ children, message, position = 'top' }) => {
    const [visible, setVisible] = useState(false);

    const toggleTooltip = () => {
        setVisible(!visible);
    };

    const closeTooltip = () => {
        setVisible(false);
    };

    return (
        <div className="tooltip-wrapper">
            <button onClick={toggleTooltip} className="tooltip-trigger">
                {children}
            </button>
            {visible && (
                <div className={`tooltip-bubble text-xs tooltip-${position}`}>
                    <span>{message}</span>
                    <button onClick={closeTooltip} className="tooltip-close">×</button>
                </div>
            )}
        </div>
    );
};

export default Tooltip;