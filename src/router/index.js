import React from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'

let routes = <Router >
                <Route path="/" component={()=>import('../App')}>
                    <Route path="/movie" component={()=>import('../views/movie')}/>
                    <Route path="/cinema" component={()=>import('../views/cinema')}/>
                    <Route path="/mine" component={()=>import('../views/mine')}/>
                </Route>
            </Router>

export default routes