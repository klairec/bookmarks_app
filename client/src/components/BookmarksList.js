import React, { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import Bookmarks from './Bookmarks';
import Pagination from './Pagination';

const BOOKMARKS_APP_SERVER_BASE_URL=`http://localhost:3001`;

const BookmarksList = () => {

    const [ bookmarks, setBookmarks ] = useState([{}]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ perPage ] = useState(5);

    // Fetch bookmarks
    const fetchBookmarks = useCallback(async () => {
        const response = await axios.get(`${BOOKMARKS_APP_SERVER_BASE_URL}/bookmarks`);
        const fetchedBookmarks = response.data;
        setBookmarks(fetchedBookmarks);
    }, []);

    // Delete a bookmark
    const deleteBookmark = async (id) => {
        try {
            await axios.delete(`${BOOKMARKS_APP_SERVER_BASE_URL}/bookmarks/${id}`);
            setBookmarks(bookmarks.filter(bookmark => bookmark.bookmark_id !== id));
        } catch(error){
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    console.log(bookmarks);
    // PAGINATION : Get current bookmarks
    const indexOfLastBookmark = currentPage * perPage;
    const indexOfFirstBookmark = indexOfLastBookmark - perPage;
    const currentBookmarks = bookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark);

    // PAGINATION : Change of page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Fragment>
             <h4 className="text-left mt-4">Bookmarks List</h4>
            <Bookmarks bookmarks={currentBookmarks} deleteBookmark={deleteBookmark}/>
            <Pagination perPage={perPage} totalBookmarks={bookmarks.length} paginate={paginate}/>
        </Fragment>
    );
}

export default BookmarksList;