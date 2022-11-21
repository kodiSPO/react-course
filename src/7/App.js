import React, {PureComponent, createRef} from "react";
import "./css/index.scss";

const HASHTAGS = [
    'foo',
    'bar',
    'baz',
];

export default class App extends PureComponent {
    title = createRef();
    description = createRef();
    tags = createRef();

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.title.current.value;
        const description = this.description.current.value;
        const tags = Array.from(this.tags.current.querySelectorAll('[type="checkbox"]'))
            .filter(el => el.checked)
            .map(el => el.value);

        console.table({
            title,
            description,
            tags
        });
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" placeholder="title" ref={this.title}/>
                    </div>
                    <div>
                        <textarea placeholder="description" ref={this.description}/>
                    </div>
                    <div>
                        <span>Hashtags</span>
                        {HASHTAGS && (
                            <ul ref={this.tags}>
                                {HASHTAGS.map((tag) => (
                                    <li key={tag}>
                                        <label>
                                            <input type="checkbox" value={tag}/>
                                            <span className="d-inline-block px-1">{tag}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
