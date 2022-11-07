import React, {Component} from 'react';
import PropTypes from "prop-types";

export class Filter extends Component {
    render() {
        const {onRandomAdd} = this.props;

        return (
            <div>
                Filter
                <button onClick={() => onRandomAdd()}>Add random</button>
            </div>
        );
    }
}

Filter.propTypes = {
    onRandomAdd: PropTypes.func,
}

