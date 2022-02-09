export default function Datetime(props) {
    const date = new Date();
    return (
    <small>
        <i>
            { 
                ((date < 10)?"0":"") + date + "/" + 
                (((date.getMonth()+1) < 10)?"0":"") + 
                (date.getMonth()+1) + "/" + 
                date.getFullYear() 
            }
        </i>
    </small>);
};
