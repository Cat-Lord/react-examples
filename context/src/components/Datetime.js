export default function Datetime(props) {
    const date = new Date();
    return <h4>{ ((date < 10)?"0":"") + date +"/"+(((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) +"/"+ date.getFullYear() }</h4>
};
