import userRouter from './userRouter.js';
import peliculasRouter from './peliculasRouter.js';
import seriesRouter from './seriesRouter.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/peliculas', peliculasRouter);
    app.use('/api/series', seriesRouter);
};

export default routerAPI;
