import React, { useState } from "react";
import "../styles/KeywordsInput.scss"

const KeywordsInput = props => {
    const [keywords, setKeywords] = useState(props.keywords || []);

    const addKeyword = event => {
        if(event.target.value !== ''){
            setKeywords([...keywords, event.target.value]);
            props.selected([...keywords, event.target.value]);
            event.target.value = '';
        }
    };

    const removeKeyword = indexToRemove => {
        setKeywords(keywords.filter((_, index) => index !== indexToRemove));
        props.selected(keywords.filter((_, index) => index !== indexToRemove));
    }

    return (
       <div className="keywords-input">
           <ul id="keyword">
               {keywords.map((keyword, index) => (
                   <li key={index} className="keyword">
                       <span className="keyword-title">{keyword}</span>
						<span className="keyword-close-icon"
							onClick={() => removeKeyword(index)}
						>
							x
						</span>
                   </li>
               ))}
           </ul>
           <input
                className="form-control"
                type="text"
                onKeyUp={event => (event.key === "Enter" ? addKeyword(event) : null)}
           />
       </div>
    );
}

export default KeywordsInput;