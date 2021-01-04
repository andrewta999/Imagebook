import ImageList from './ImageList'

export default function Home(props) {
    let {users, images} = props

    let data  
    if (!users || !images || !Object.keys(images).map){
        data = <div></div>
    }else{
        data = Object.keys(users).map((user_id) => {
            return <ImageList key={user_id} user={users[user_id]} images={images[user_id]}/>
        })
    }

    return <div className="mt-3">
        {data}
    </div>
}