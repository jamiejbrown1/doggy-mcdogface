import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedImages, selectBreedImages } from './breedImagesSlice';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from '../../theme';
import Skeleton from 'react-loading-skeleton';
import { v4 as uuid } from 'uuid';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        margin: '20px -5px',
        '@media (max-width: 880px)': {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    image: {
        height: theme.image.height,
        width: theme.image.width,
        margin: '5px',
    },
}));

interface Props {
    breed: string;
    count: number;
}

const BreedImages: React.FC<Props> = ({ breed, count }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { breeds, loading } = useSelector(selectBreedImages);

    useEffect(() => {
        dispatch(getBreedImages({ breed, count }));
    }, [breed, count, dispatch]);

    const renderImages = () => {
        if (loading) {
            return Array(count)
                .fill(0)
                .map(() => (
                    <div key={uuid()} className={classes.image}>
                        <Skeleton height="100%" />
                    </div>
                ));
        }
        if (breeds[breed]) {
            return breeds[breed].map((image) => (
                <img
                    key={image}
                    src={image}
                    className={classes.image}
                    alt={`random ${breed} image`}
                />
            ));
        }
        return null;
    };

    return <div className={classes.root}>{renderImages()}</div>;
};

export default BreedImages;
