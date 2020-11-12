import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import KeywordsInput from './KeywordsInput';

const BOOKMARKS_APP_SERVER_BASE_URL=`http://localhost:3001`;

const UpdateBookmark = ({ bookmark }) => {
    const { register, errors } = useForm();

    const [title, setTitle] = useState(bookmark.title);
    const [url, setUrl] = useState(bookmark.url);
    const [keywords, setKeywords] = useState([]);

    // Update a bookmark
    const updatedBookmark = async (event) => {
        event.preventDefault();
        try {
            url.includes('vimeo') ? Object.assign(bookmark, { type: 'vimeo'}) :  Object.assign(bookmark, { type: 'flickr'});
            
            const updatedBookmark = Object.assign({}, bookmark, { title : title }, { url : url }, { keywords: keywords });

            await fetch(`${BOOKMARKS_APP_SERVER_BASE_URL}/bookmarks/${bookmark.bookmark_id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updatedBookmark)
            });
            window.location = "/";
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target={`#id${bookmark.bookmark_id}`}>
            Edit
            </button>
            <div className="modal" id={`id${bookmark.bookmark_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Bookmark</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <label className="font-weight-bold text-left">Title</label>
                            <input className="form-control" value={title} name="title" onChange={event => setTitle(event.target.value)} ref={register({ required: true, maxLength: 50 })} />
                            {errors.title && errors.title.type === 'required' && <span>This field is required</span>}
                            {errors.title && errors.title.type === 'maxLength' && <span>Title max length is 50 characters</span>}

                            <label className="font-weight-bold text-left">Url</label>
                            <input className="form-control" value={url} name="url" onChange={event => setUrl(event.target.value)} ref={register({ required: true, pattern: /https?:\/\/(?:www)?\.flickr\.com\/|https?:\/\/(?:vimeo)\.com\// })} />
                            {errors.url && errors.url.type === 'required' && <span>This field is required</span>}
                            {errors.url && errors.url.type === 'pattern' && <span>Url must be flickr or vimeo url</span>}

                            <label className="font-weight-bold text-left">Keywords</label>
                            <KeywordsInput keywords={bookmark.keywords} selected={value => setKeywords(value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={event => updatedBookmark(event)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateBookmark;