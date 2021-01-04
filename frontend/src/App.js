import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import config from './config'
import { get_data, post_data, post_data_token, get_data_token, delete_data} from './api/index'

import NavBar from './component/NavBar'
import Home from './page/Home'
import Login from './page/Login'
import Signup from './page/Signup'
import ImageList from './page/ImageList'
import Image from './component/Image'
import UploadImage from './component/UploadImage'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            is_authenticated: false,
            is_new: true,
            token: '',
            current_user: "",
            users: {},
            images: {},
            image: React.createRef(),
            type: "public",
            title: ""
        }
    }

    async componentDidMount(){
        // get token on session storage if any
        if(sessionStorage.getItem("token")){
            this.setState({
                is_authenticated: true,
                token: sessionStorage.getItem("token")
            })
        }

        if(sessionStorage.getItem("user")){
            this.setState({
                current_user: sessionStorage.getItem("user")
            })
        }
        await this.fetch_all_users()
        await this.fetch_all_images()
    }

    text_input_change = (event) => {
        let target = event.target
        this.setState({
            [target.name]: target.value
        })
    }

    upload_image = async (event) => {
        event.preventDefault()
        let {title, type, image, images, current_user, token} = this.state 

        const form_data = new FormData()
        form_data.append("title", title)
        form_data.append("status", type)
        form_data.append("image", image.current.files[0])

        let url = `${config.host}/image/new/${current_user}`
        let result = await post_data_token(url, form_data, token, false)
        images[current_user].push(result)
        this.setState({images})
    }

    fetch_all_users = async () => {
        let url = `${config.host}/user`
        let result = await get_data(url)

        let users = {}
        for (let user of result){
            let user_id = user._id
            users[user_id] = user 
        }
        this.setState({users})
    }

    fetch_all_images = async () => {
        let {users} = this.state 
        let token = sessionStorage.getItem('token')

        let url = `${config.host}/image/`
        let images = {}
        if (token) {
            for (let user_id of Object.keys(users)){
                let result = await get_data_token(url + user_id, token)
                images[user_id] = result 
            }   
        }else{
            for (let user_id of Object.keys(users)){
                let result = await get_data(url + user_id)
                images[user_id] = result 
            }   
        }

        this.setState({images})
    }

    delete_an_image = async (userId, imageId) => {
        let {images, token} = this.state 
        let url = `${config.host}/image/${imageId}`
        await delete_data(url, token)
        
        let filtered_result = images[userId].filter((image) => {
            return image._id !== imageId 
        })
        images[userId] = filtered_result
        this.setState({images})
    }

    signup_or_login = async (name) => {
        let { username, password } = this.state
        if (username.length === 0 || password.length === 0) {
            return
        }

        let url = `${config.host}/${name}`
        let data = {
            "username": username,
            "password": password
        }

        let result = await post_data(
            url,
            data
        )
        return result
    }

    signup = async (event) => {
        event.preventDefault()

        let result = await this.signup_or_login("user")
        console.log(result)

        this.setState({
            is_new: false
        })
    }

    login = async (event) => {
        event.preventDefault()

        let result = await this.signup_or_login("signin")

        // save token and set is_authenticated
        let token = result.token
        let current_user = result.user._id 

        sessionStorage.setItem("token", token)
        sessionStorage.setItem("user", current_user)

        this.setState({
            token,
            current_user,
            is_authenticated: true
        })

        // fetch all user and their images
        await this.fetch_all_users()
        await this.fetch_all_images()
        console.log(this.state)
    }

    logout = (event) => {
        event.preventDefault()
        if (sessionStorage.getItem('token')){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
        }
        this.setState({
            token: '',
            is_authenticated: false, 
            current_user: '', 
            users: {}, 
            images: {}
        })

        console.log(this.state)
    }

    render() {
        let { username, password, is_authenticated, is_new, 
              users, images, current_user, type, image, title} = this.state

        return <div className="App">
            <div>
                <NavBar is_authenticated={is_authenticated} logout={this.logout}/>
            </div>
            <div className="container-fluid">
                <Switch>
                    <Route exact path={["/", "/login"]}>
                        {is_authenticated ? <Redirect to="/repo" /> :
                            <Login username={username} password={password}
                                text_input_change={this.text_input_change}
                                login={this.login} />}
                    </Route>
                    <Route path="/home">
                        {!is_authenticated ? <Redirect to="/login"/> : 
                            <Home users={users} images={images}/>}
                    </Route>
                    <Route path="/signup">
                        {!is_new ? <Redirect to="/login" /> :
                            <Signup username={username} password={password}
                                text_input_change={this.text_input_change}
                                signup={this.signup} />}
                    </Route>
                    <Route path="/repo">
                        {!is_authenticated ? <Redirect to="/login"/> : <ImageList user={users[current_user]} images={images[current_user]}/>}
                    </Route>
                    <Route path="/image/:userId/:imageId">
                        <Image users={users} images={images} cur_user={current_user}
                            delete_image={this.delete_an_image}/>
                    </Route>
                    <Route path="/upload">
                        <UploadImage type={type} image={image} title={title} 
                            text_input_change={this.text_input_change}
                            upload_image={this.upload_image}/>
                    </Route>
                </Switch>
            </div>
        </div >
    }
}