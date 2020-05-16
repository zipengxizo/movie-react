import Global from './global'
import CinemaStore from './cinema';
import MovieStore from './movie';
export default {
    globalStore: new Global(),
    cinemaStore : new CinemaStore(),
    movieStore : new MovieStore()
}