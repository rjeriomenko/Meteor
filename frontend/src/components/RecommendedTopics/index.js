import './RecommendedTopics.css';
import SearchBlock from '../SearchBlock';
import { useState, useEffect } from 'react';

const RecommendedTopics = ({ filteredTales, users }) => {
    const renderSearchBlocks = () => {
        return (
            <>
                {filteredTales.map(tale => {
                    if (tale.publishTime) {
                        return (
                            <SearchBlock key={tale.id} tale={tale} author={users[tale.authorId]} />
                        )
                    }
                })}
            </>
        )
    };    


    return (
        renderSearchBlocks()
        // <div className='recommended-topics'>
        //     <div>RecommendedTopics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</div>
        //     <div>RecommendedTopics2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</div>
        // </div>
    )
}

export default RecommendedTopics;