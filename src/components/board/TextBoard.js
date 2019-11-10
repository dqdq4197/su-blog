import React,{useState} from 'react';



const TextBoard = () => {

    const [textValue, setTextValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const onChangetextValue = (e) => {
        setTextValue(e.target.value);
    }
    const onChangetitleValue = (e) => {
        setTitleValue(e.target.value);
    }

    return (
        <div className="boardContainer">
            <div className="editer">
                <button>진하게</button>
            </div>
            <div className="textBoardContainer">
                <input type="text" placeholder="Title" className="titleInput" value={titleValue} onChange={onChangetitleValue}></input>
                <textarea className="textBoard" value={textValue} onChange={onChangetextValue}></textarea>
            </div>
            <div className="previewContainer">
                <h3>{titleValue}</h3>
                {textValue}
            </div>
        </div>)
}

export default TextBoard;