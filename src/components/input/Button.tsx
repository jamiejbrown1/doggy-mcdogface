import React from 'react';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    button: {
        borderRadius: theme.borderRadius,
        height: theme.input.height,
        padding: '0 20px',
        fontSize: theme.fontSize.sm,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'opacity 0.3s',
        '&:hover': {
            opacity: 0.8,
        },
    },
    primary: {
        color: theme.colors.white,
        background: theme.colors.primary,
        border: 'none',
    },
    secondary: {
        color: theme.colors.primary,
        background: theme.colors.white,
        border: `${theme.colors.primary} 1px solid`,
    },
}));

interface Props {
    onClick: () => void;
    primary?: boolean;
}

const Button: React.FC<Props> = ({ onClick, primary = false, children }) => {
    const classes = useStyles();
    const buttonClass = primary ? classes.primary : classes.secondary;

    return (
        <button className={`${classes.button} ${buttonClass}`} onClick={() => onClick()}>
            {children}
        </button>
    );
};

export default Button;
