import {Component} from "react";

export default class Filter extends Component {
    handleCheck = (filter) => {
        this.props.handleFilter(filter);
    }

    render() {
        return (
            <div className="Filter">
                {Object.keys(this.props.filters).map((filter) => (
                    <label key={filter} className="mx-2">
                        <input type="checkbox"
                               name={filter}
                               onChange={() => this.handleCheck(filter)}
                        />
                        {filter}
                        {this.props.filters[filter] && (
                            <strong> - checked</strong>
                        )}
                    </label>
                ))}
            </div>
        )
    }
}