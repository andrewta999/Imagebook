import {withRouter} from 'react-router-dom'

let handle_upload = async (event, history, method) => {
    try {
        await method(event)
    }catch(err){

    }finally{
        history.push('/repo')
    }
}

function UploadImage(props) {
    let {type, title, image, text_input_change, upload_image, history} = props

    return <div className="mt-5">
        <form className="w-25 m-auto">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control"
                    name="title" id="title" placeholder="A beautiful image"
                    value={title} onChange={text_input_change}
                ></input>
            </div>

            <div className="form-group">
                <label htmlFor="type">Image Status</label>
                <select className="form-control" id="type" name="type"
                    value={type} onChange={text_input_change}>
                    <option value="public">public</option>
                    <option value="private">private</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" className="form-control-file" id="image" name="image" ref={image}></input>
            </div>

            <button type="submit" className="btn btn-primary" onClick={(event) => handle_upload(event, history, upload_image)}>Upload</button>
        </form>
    </div>
}

export default withRouter(UploadImage)