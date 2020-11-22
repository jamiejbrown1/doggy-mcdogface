const theme = {
    borderRadius: '2px',
    fontSize: {
        lg: '30px',
        md: '20px',
        sm: '16px',
    },
    colors: {
        primary: '#773f0e',
        black: '#000000',
        grey: '#999999',
        white: '#FFFFFF',
    },
    image: {
        width: '280px',
        height: '280px',
    },
    input: {
        height: '40px',
    },
};

export type CustomTheme = typeof theme;
export { theme };
