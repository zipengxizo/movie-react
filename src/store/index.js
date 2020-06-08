import Global from './global'
import CinemaStore from './cinema';
import MovieStore from './movie';
const globalStore = new Global();
const cinemaStore = new CinemaStore();
const movieStore = new MovieStore();
export {
    globalStore,
    cinemaStore,
    movieStore
}