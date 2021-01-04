import { Link } from 'react-router-dom'

export default function NavBar(props) {
    let { is_authenticated, logout } = props
    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand ml-4 mb-1" to="/home">Imagebook</Link>

            <ul className="navbar-nav ml-4">
                <li className="nav-item active">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
            </ul>

            <div style={{ "position": "absolute", "right": "3rem" }}>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        {is_authenticated && <Link className="nav-link" to="/upload">Upload</Link>}
                    </li>
                    <li className="nav-item active">
                        {is_authenticated ? <Link className="nav-link" to="/repo">Repo</Link> :
                            <Link className="nav-link" to="/signup">Signup</Link>}
                    </li>
                    <li className="nav-item active">
                        {is_authenticated ? <Link className="nav-link" onClick={logout} to="/">Logout</Link> :
                            <Link className="nav-link" to="/login">Login</Link>}
                    </li>
                </ul>
            </div>

        </nav>
    </div>
}