import ImageSimple from '../component/ImageSimple'

export default function ImageList(props) {
    let { user, images } = props

    let images_data
    let username=""
    if (!user || !images || !images.map) {
        images_data = <div></div>
    } else {
        images_data = images.map((image) => {
            return <div className="col-3" key={image._id}>
                <ImageSimple key={image._id} image={image}/>
            </div>
        })
        username = user.username
    }

    return <div className="mt-4 mb-4 ml-4">
        <h3>{username}</h3>
        <div className="row">
            {images_data}
        </div>
    </div>
}