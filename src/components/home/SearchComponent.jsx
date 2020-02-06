import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

const SearchComponent = () => {
    const [keyWord, setKeyWord] = useState('');
    const history = useHistory();

    const onChangeKeyWord = (e) => {
        setKeyWord(e.target.value);
    }
    const onEnter = (event) => {
        if(event.keyCode === 13) {
            history.push(`/search?key=${keyWord}`)
        }
    }
    return (
        <>
        <input type="text" onKeyDown={onEnter} onChange={onChangeKeyWord} value={keyWord} />
        </>
    );
}

export default SearchComponent;