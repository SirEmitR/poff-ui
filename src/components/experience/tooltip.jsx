const Tooltip = ({ children, color, className }) => {


    return (
        <div 
            style={{backgroundColor: `var(--${color})`}}
            className={`
            px-3 py-1 text-sm text-white rounded-full flex justify-center items-center gap-2 w-max
            ${className}
            `}>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Tooltip;