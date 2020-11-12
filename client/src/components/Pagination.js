import React from "react";

const Pagination = ({ perPage, totalBookmarks, paginate }) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalBookmarks / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item"><a onClick={() => paginate(number)} className="page-link" href="#">{number}</a></li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;