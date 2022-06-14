import React, { useState } from "react";

const CommentItem = ({commentObj}) => {
    return (
        <section>
            <div key={commentObj.id}>
                <span>user name</span>
                <span>date</span>
                <p>{commentObj.content}</p>
            </div>
        </section>
    ); 
};

export default CommentItem;