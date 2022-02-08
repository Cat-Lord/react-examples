// conditional formatting using javascript condition evaluation
export default function Comments() {
    const comments = []; // ['adsfasd', 'asdffda', 'asfasdffadfad'];
    
    return (
        <div>
        {
            // if this isnt true, ...
            comments.length > 0 
                &&
            // then this doesn't get returned
            <h2>You have {comments.length} new comments.</h2>
        }
        </div>
    );
}