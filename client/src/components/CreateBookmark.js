import React, { Fragment } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";

const BOOKMARKS_APP_SERVER_BASE_URL=`http://localhost:3001`;

const CreateBookmark = () => {
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = async (newBookmark) => {
        try {

            let moreInfos;
            if(newBookmark.url.includes('vimeo')){
                const encodedUrl = encodeURIComponent(newBookmark.url);
                
                const getVimeoInfos = await fetch(`https://vimeo.com/api/oembed.json?url=${encodedUrl}`);
                const vimeoJSONInfos = await getVimeoInfos.json();

                const vimeoPropertiesToPick = ['author_name', 'width', 'height', 'duration'];
                const vimeoMoreInfos = _.pick(vimeoJSONInfos, vimeoPropertiesToPick);

                moreInfos = _.merge(vimeoMoreInfos, { type: 'vimeo'});
            } else {
                const flickrRegex = /(?:https?:\/\/)?(?:www\.)?flickr\.com\/photos\/(?:[a-zA-Z0-9]{1,30}\/)?(\d+)/
                const photoId = newBookmark.url.match(flickrRegex);
                
                const getFlickrInfos = await fetch(
                    `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${process.env.API_KEY || "02f80cb87cba5afe44027c0ac61a4cef"}&photo_id=${photoId[1]}&format=json&nojsoncallback=1`
                );
                const flickrJSONInfos = await getFlickrInfos.json();
                
                if(flickrJSONInfos.photo && flickrJSONInfos.photo.owner.realname){
                    moreInfos = { author_name: flickrJSONInfos.photo.owner.realname, type: 'flickr' };
                } else {
                    moreInfos = { type: 'flickr' };
                }
            }

            await fetch(`${BOOKMARKS_APP_SERVER_BASE_URL}/bookmarks`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(_.merge(newBookmark, moreInfos))
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-4">Bookmarks App</h1>
            <h4 className="text-left mt-4">Add a bookmark</h4>
            <form className="d-flex mt-2 mb-4 justify-content-between" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-50 p-3">
                    <label className="font-weight-bold">Title</label>
                    <input className="form-control" name="title" ref={register({ required: true, maxLength: 50 })} />
                    {errors.title && errors.title.type === 'required' && <span>This field is required</span>}
                    {errors.title && errors.title.type === 'maxLength' && <span>Title max length is 50 characters</span>}
                </div>
                <div className="w-50 p-3">
                    <label className="font-weight-bold">Url</label>
                    <input className="form-control" name="url" ref={register({ required: true, pattern: /https?:\/\/(?:www)?\.flickr\.com\/|https?:\/\/(?:vimeo)\.com\// })} />
                    {errors.url && errors.url.type === 'required' && <span>This field is required</span>}
                    {errors.url && errors.url.type === 'pattern' && <span>Url must be flickr or vimeo url</span>}
                </div>
                <button className="btn btn-success btn-sm align-self-end h-50 mb-4">Add</button>
            </form>
        </Fragment>
    );
};

export default CreateBookmark;