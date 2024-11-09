import React from "react";
import propTypes from 'prop-types';

function Resultbox(props){
return(
    <div className="result-box">
        <h2 className="result-box-title">{props.title}</h2>
        <p className="result-box-content">{props.content}</p>
    </div>
)
}


export default Resultbox;