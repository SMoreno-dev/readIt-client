import React, { useState } from "react";
import { connect } from 'react-redux'
import { setText } from "../../redux/actions/userActions";

import './TextArea.css'

const TextArea = ({title, name, limit, cols, rows, className, setText, text}) => {

    const [charsLeft, calculateChars] = useState(limit);

    const handleChars = (e) => {
        calculateChars(limit - e.target.value.length);
        setText(e.target.value)
    }

    return(
        <>
            <div className='text-title-and-char'>
                <label 
                    htmlFor={name} 
                    className="text-label">
                        {title}
                </label>
                <p className={charsLeft <= limit / 4 ? 'char-warning' : 'char-count'}>{charsLeft}</p>
            </div>

            <textarea                         
                name={name}
                maxLength={limit.toString()}
                cols={cols} 
                rows={rows}
                value={text}
                className={className}
                onChange={handleChars}>
            </textarea>
        </>

    )
}

const mapStateToProps = state => ({
    text: state.user.text
})

const mapDispatchToProps = dispatch => ({
    setText: (text) => dispatch(setText(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);