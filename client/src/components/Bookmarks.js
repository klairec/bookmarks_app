import React, { Fragment } from "react";
import UpdateBookmark from "./UpdateBookmark";
import moment from 'moment';

const Bookmarks = ({ bookmarks, deleteBookmark }) => {

    // Map bookmarks data in table
    const mappedData = bookmarks.map(bookmark => {
        return (
            <tr key={bookmark.bookmark_id}>
                <td className="font-weight-bold">{bookmark.title}</td>
                <td><a target="_blank" href={bookmark.url} rel="noreferrer">{bookmark.url}</a></td>
                <td>{moment(bookmark.creation_date).format('LL')}</td>
                <td>{bookmark.author_name || '-'}</td>
                <td>{bookmark.width || '-'}</td>
                <td>{bookmark.height || '-'}</td>
                <td className="text-right">{bookmark.duration || '-'}</td>
                <td>
                    <UpdateBookmark bookmark={bookmark}/>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteBookmark(bookmark.bookmark_id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Url</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Width</th>
                        <th scope="col">Height</th>
                        <th scope="col">Duration (seconds)</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {mappedData}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Bookmarks;