import {Component} from "react";

export default class Filter extends Component {
    handleCheck = (filter) => {
        this.props.handleFilter(filter);
    }

    handleSearch = (e) => {
        this.props.handleSearch(e.target.value);
    }

    handleCats = (e) => {
        this.props.handleCats({
            name: e.target.name,
            checked: e.target.checked,
        });
    }

    render() {
        const {filters, search, cats} = this.props;

        return (
            <div className="Filter">
                {Object.keys(filters).map((filter) => (
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
                <input type="text" value={search} onChange={this.handleSearch}/>
                <div>
                    {cats.map((cat) => (
                        <label key={cat}>
                            <input type="checkbox" name={cat} onChange={this.handleCats}/>
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
        )
    }
}