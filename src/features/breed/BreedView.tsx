import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'components/input/Button';
import { capitalize } from '../../util/utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectDogs } from '../dogs/dogsSlice';
import { getBreedImages } from './breedImagesSlice';
import BreedImages from './BreedImages';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';

const BREED_IMAGES_COUNT = 3;

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px',
        maxWidth: '860px',
        '@media (max-width: 880px)': {
            alignItems: 'center',
        },
    },
    breedTitle: {
        fontSize: theme.fontSize.md,
    },
    subBreedsSection: {
        fontSize: theme.fontSize.sm,
        padding: '10px 0',
    },
    subBreedsList: {
        color: theme.colors.primary,
    },
    flexRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 880px)': {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
}));

interface ParamTypes {
    breed: string;
}

const BreedView: React.FC = () => {
    const { breed } = useParams<ParamTypes>();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { breeds, loading } = useSelector(selectDogs);

    const breedInfo = breeds.find((b) => b.name === breed);

    useEffect(() => {
        if (!loading && !breedInfo) {
            // Go back if user has manually navigated to a breed that doesn't exist
            history.replace('/');
        }
    }, [history, loading, breedInfo]);

    const getSubBreeds = () => {
        if (!breedInfo || breedInfo.subBreeds.length === 0) {
            return 'None';
        }
        return breedInfo.subBreeds.join(', ');
    };

    const refreshImages = () =>
        dispatch(
            getBreedImages({
                breed,
                count: BREED_IMAGES_COUNT,
                refresh: true,
            }),
        );

    return (
        <div className={classes.root}>
            <h2 className={classes.breedTitle}>{capitalize(breed)}</h2>
            {loading || !breedInfo ? (
                'Loading...'
            ) : (
                <div>
                    <div className={classes.flexRow}>
                        <div className={classes.subBreedsSection}>
                            <span>{'Sub breeds: '}</span>
                            <span className={classes.subBreedsList}>{getSubBreeds()}</span>
                        </div>
                        <Button primary onClick={refreshImages}>
                            Change pictures
                        </Button>
                    </div>

                    <BreedImages breed={breed} count={BREED_IMAGES_COUNT} />
                    <Button onClick={() => history.goBack()}>{'< back'}</Button>
                </div>
            )}
        </div>
    );
};

export default BreedView;
