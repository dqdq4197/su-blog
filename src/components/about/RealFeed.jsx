import React from 'react';
import Feed from '../home/Feed';


const RealFeed = ({block, contents}) => {
    return (
        <div>
            {block.map((post) =>
                <Feed block={post} key={post.id}
                contents={post.content.blocks.filter((data) => data.type ==='paragraph').map((content) => 
                    { return content.data.text.replace(/&nbsp;|<b>|<\/b>/g,'')})}
                />
            )}
            
        </div>
    )
}


export default RealFeed;