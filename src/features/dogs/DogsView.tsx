import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';
import TextField from 'components/input/TextField';
import DogsTable from './DogsTable';
import { useSelector } from 'react-redux';
import { selectDogs } from './dogsSlice';
import { filterBreeds } from '../../util/utils';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    heading: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.lg,
    },
    search: {
        width: '270px',
    },
}));

const DogsView: React.FC = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { breeds, loading } = useSelector(selectDogs);

    return (
        <>
            <TextField
                data-testid="breed-search"
                className={classes.search}
                value={searchTerm}
                placeholder="start typing to filter breeds"
                onChange={setSearchTerm}
            />
            <DogsTable breeds={filterBreeds(breeds, searchTerm)} loading={loading} />
        </>
    );
};

export default DogsView;
