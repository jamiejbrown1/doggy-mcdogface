import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TextField from 'components/input/TextField';

jest.mock('react-jss', () => ({
    createUseStyles: () => () => ({
        root: 'root',
    }),
}));

describe('TextField', () => {
    it('should display the passed in value', () => {
        render(<TextField onChange={jest.fn()} value="hound" placeholder="placeholder" />);
        expect(screen.getByDisplayValue('hound'));
    });

    it('should call change handler when changes occur', () => {
        const handleChange = jest.fn();
        render(<TextField onChange={handleChange} value="" placeholder="placeholder" />);
        fireEvent.change(screen.getByPlaceholderText('placeholder'), {
            target: { value: 'change' },
        });
        expect(handleChange).toHaveBeenCalledWith('change');
    });
});
