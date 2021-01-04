import { Route, Switch } from 'react-router-dom'

import Home from './page/Home'
import Login from './page/Login'
import Signup from './page/Signup'
import Welcome from './page/Welcome'
import ImageList from './page/ImageList'
import Image from './component/Image'

export default function Router() {
    return <div>
        <Switch>
            <Route exact path="/">
                <Welcome />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/repo/:userId">
                <ImageList />
            </Route>
            <Route path="/image/:imageId">
                <Image />
            </Route>
        </Switch>
    </div>
}