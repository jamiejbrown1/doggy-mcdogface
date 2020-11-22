import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DogsView from './features/dogs/DogsView';
import BreedView from './features/breed/BreedView';
import { createUseStyles } from 'react-jss';
import { CustomTheme } from './theme';
import { getDogBreeds } from './features/dogs/dogsSlice';
import { useDispatch } from 'react-redux';

const useStyles = createUseStyles<CustomTheme>((theme) => ({
    root: {
        fontFamily: '"Open Sans", "Roboto", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        height: '100vh',
        maxWidth: '880px',
        '@media (max-width: 880px)': {
            alignItems: 'center',
        },
    },
    heading: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.lg,
    },
}));

const App: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogBreeds());
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <h2 className={classes.heading}>Doggy McDogface</h2>
            <Router>
                <Switch>
                    <Route exact path="/" component={DogsView} />
                    <Route path="/:breed" component={BreedView} />
                </Switch>
            </Router>
        </div>
)};

export default App;
