import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from './component/NavBar'
import Router from './router'

function App() {
    return (
        <div className="App">
            <div>
                <NavBar />
            </div>
            <div className="container-fluid">
                <Router />
            </div>
        </div>
    )
}

export default App
