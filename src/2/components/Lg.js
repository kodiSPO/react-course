import {Component} from "react";

export default class Lg extends Component {
    renderTree({id, type, name, children}) {
        return (
            <li key={id} className="d-block">
                <div>
                    {this.renderInstance(type)}
                    {name}
                </div>
                {Array.isArray(children) && children.length > 0 && (
                    <ul className="children">
                        {children.map(child => this.renderTree(child))}
                    </ul>
                )}
            </li>
        );
    }

    renderInstance(type) {
        return (
            <span className="px-1">[{type}]</span>
        )
    }

    render() {
        const {directories} = this.props;

        return directories && (
            <div className="directories">
                {directories.map(directory => this.renderTree(directory))}
            </div>
        );
    }
}