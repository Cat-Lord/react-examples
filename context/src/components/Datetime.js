import { PageContext } from "../contexts/PageContext";

export default function Datetime(props) {
    const date = new Date();
    return (
        <PageContext.Consumer>
            
                {
                    ({lang, theme}) => (
                        <div>
                            <button className="random-button">{lang}</button>
                            <small>
                                <i>
                                { 
                                    ((date < 10)?"0":"") + date + "/" + 
                                    (((date.getMonth()+1) < 10)?"0":"") + 
                                    (date.getMonth()+1) + "/" + 
                                    date.getFullYear() 
                                }
                                </i>
                            </small>
                        </div>
                )}  
        </PageContext.Consumer>
    );
};
