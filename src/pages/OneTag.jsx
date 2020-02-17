import React from 'react';
import OneTagPoster from '../components/hashTag/OneTagPoster';
import Header from '../components/header/Header';

const OneTag = ({match}) => {

      
    return (
        <>
          <Header />
          <OneTagPoster tag={match.params.tag} />
        </>
    )
}

export default OneTag;