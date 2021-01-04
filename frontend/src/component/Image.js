import { useParams, withRouter, Redirect } from 'react-router-dom'

function toBase64(arr) {
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
}

function Image(props) {
    let { images, users, cur_user, delete_image } = props
    let { userId, imageId } = useParams()

    try {
        let user = users[userId]
        let image = images[userId].filter((image) => {
            return image._id === imageId
        })

        image = image[0]

        return <div className="mt-3">
            <div className="row">
                <div className="col-8">
                    <img src={`data:${image.image.contentType};base64,${toBase64(image.image.data.data)}`} alt=""
                        width="1000rem" height="600rem"></img>
                </div>
                <div className="col-4">
                    <div style={{ "fontWeight": "bold" }}>{user.username}</div>
                    <div style={{ "color": "gray" }}>{`@${image.created}`}</div>
                    <div className="mt-3">{image.title}</div>
                    <div className="mt-3">
                        {image.posted_by._id === cur_user && <button className="btn btn-danger"
                            onClick={() => delete_image(userId, imageId)}>Delete</button>}
                    </div>
                </div>
            </div>
        </div>
    } catch (err) {
        return <Redirect to="/repo" />
    }
}

export default withRouter(Image)