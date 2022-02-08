import React from 'react';

export default function Box(props) {
    return (
        <div className={"color-" + props.color} >
            <p>{props.width}</p>
        </div>
    );
}
