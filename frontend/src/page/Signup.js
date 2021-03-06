import { Link } from 'react-router-dom'

export default function Signup(props) {
    let {username, password, text_input_change, signup} = props 
    return <div className="mt-5">
        <form className="w-25 m-auto">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" 
                       name="username" id="username" placeholder="Bruce Wayne"
                       value={username} onChange={text_input_change}></input>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" 
                       id="password" name="password"
                       value={password} onChange={text_input_change}></input>
                <small className="form-text text-muted">Don't have an account? <Link to="/login">Login</Link></small>
            </div>
            <button type="submit" className="btn btn-primary" onClick={signup}>Signup</button>
        </form>
    </div>
}