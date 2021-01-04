import { Link } from 'react-router-dom'

function toBase64(arr) {
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
}

export default function ImageSimple(props) {
    let { image} = props
    return <div className="mb-2">
        <Link to={`/image/${image.posted_by._id}/${image._id}`}>
            <img src={`data:${image.image.contentType};base64,${toBase64(image.image.data.data)}`} alt=""
                width="350rem" height="200rem"></img>
        </Link>
    </div>
}