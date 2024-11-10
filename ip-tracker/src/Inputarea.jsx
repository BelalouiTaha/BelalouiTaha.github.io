import React, {useState} from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import propTypes from 'prop-types';

function Inputarea(props){
    const [input, setInput] = useState("");

    function handlechange(event){
       setInput(event.target.value)
    }

    function submit(event){
        event.preventDefault(); 
        props.onSubmit(input);

    }

return(
    <form className="Inputarea">
        <input type="text" className="user-input" name="ip" placeholder="search for any ip address or domain" onChange={handlechange} value={input} required />
        <button type="submit" className="search-button" onClick={submit} ><ArrowForwardIosIcon fontSize="small" sx={{ color: "white" }}/></button>
    </form>
)
}

export default Inputarea;