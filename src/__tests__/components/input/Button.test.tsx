import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from 'components/input/Button';

jest.mock('react-jss', () => ({
    createUseStyles: () => () => ({
        button: 'button',
        primary: 'primary',
        secondary: 'secondary',
    }),
}));

describe('Button', () => {
    it('should call onClick prop when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>button</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });

    it('should display the button text', () => {
        render(<Button onClick={jest.fn()}>button</Button>);
        expect(screen.getByRole('button')).toHaveTextContent('button');
    });

    it('should have primary styles when primary is true', () => {
        render(
            <Button primary onClick={jest.fn()}>
                button
            </Button>,
        );
        expect(screen.getByRole('button')).toHaveClass('primary');
    });

    it('should have secondary styles when primary is false', () => {
        render(<Button onClick={jest.fn()}>button</Button>);
        expect(screen.getByRole('button')).toHaveClass('secondary');
    });
});
