import React from 'react';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    root: {
        minHeight: theme.input.height,
        height: theme.input.height,
        border: `${theme.colors.primary} 1px solid`,
        borderRadius: theme.borderRadius,
        padding: '0 10px',
        margin: '10px 0',
        fontSize: theme.fontSize.sm,
    },
}));

interface Props {
    value: string;
    placeholder: string;
    onChange: (text: string) => void;
    className?: string;
}

const TextField: React.FC<Props> = ({ value, placeholder, onChange, className }) => {
    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            className={`${classes.root} ${className}`}
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
        />
    );
};

export default TextField;
