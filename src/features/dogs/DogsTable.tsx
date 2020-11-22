import React, { useCallback, useMemo } from 'react';
import Table from 'components/data-display/Table';
import { Link } from 'react-router-dom';
import { capitalize } from '../../util/utils';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';
import { Row } from 'react-table';
import { Breed } from '../../globals';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    root: {
        margin: '10px 0',
        width: '100%',
        overflowY: 'auto',
    },
    link: {
        color: theme.colors.primary,
    },
}));

interface Props {
    breeds: Breed[];
    loading?: boolean;
}

const DogsTable: React.FC<Props> = ({ breeds, loading = false }) => {
    const classes = useStyles();
    const renderBreedLink = useCallback(
        (breed) => (
            <Link className={classes.link} to={breed}>
                View
            </Link>
        ),
        [classes.link],
    );

    const sortSubBreeds = useCallback((rowA: Row<Breed>, rowB: Row<Breed>) => {
        if (rowA.original.subBreeds.length > rowB.original.subBreeds.length) {
            return 1;
        }
        return -1;
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Breed group',
                accessor: 'name' as keyof Breed,
                Cell: ({ cell: { value } }) => capitalize(value),
            },
            {
                Header: 'Number of breeds',
                accessor: 'subBreeds' as keyof Breed,
                Cell: ({ cell: { value } }) => value.length,
                sortType: sortSubBreeds,
            },
            {
                Header: '',
                id: 'view',
                accessor: 'name' as keyof Breed,
                Cell: ({ cell: { value } }) => renderBreedLink(value),
                disableSortBy: true,
            },
        ],
        [renderBreedLink, sortSubBreeds],
    );
    return (
        <div className={classes.root}>
            <Table<Breed> data={breeds} loading={loading} columns={columns} />
        </div>
    );
};

export default DogsTable;
