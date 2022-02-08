import React, { Component } from 'react';


/**
 * Setting value of input to null allows user to enter their own value.
 * Other values are not editable (like the default "hi" text)
 */
export default class NullValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            element:  <input value="hi" onChange={() => console.log("change")} />
        }
    }

    componentDidMount() {
        // we can change it now
        setTimeout(() => {
            this.setState({element: <input className="warning" value={null} onChange={() => console.log("change")}/>});
        }, 3000);

        // aaaand now we can't anymore
        setTimeout(() => {
            this.setState({element: <input value="hi again" onChange={() => console.log("change")} />});
        }, 6000);
    }

    render() {
        return (
            <div>
                {this.state.element}
            </div>
        );
    }
}

