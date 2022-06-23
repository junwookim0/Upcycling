import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

//🍎검색컴포넌트
const Search = ({onSearch}) => {

    const inputRef = useRef()

    const onSubmit = () => {

        onSearch(inputRef.current.value)
        inputRef.current.value = ''
    }


    return (
        <div>
            <input ref={inputRef} type="text" />
            <button
            onClick={onSubmit}
            >search</button> 
        </div>
    );
};

export default Search;