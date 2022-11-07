import {Component} from "react";
import {Filter} from "./components/Filter";
import {List} from "./components/List";
import {generateNewsItem, generateNews} from "./data/data";
import "./css/index.scss";

export default class App extends Component {
    state = {
        news: generateNews(5),
    }

    onRandomAdd = () => {
        const item = generateNewsItem();

        this.setState({
            news: [
                item,
                ...this.state.news,
            ]
        });
    }

    onRemove = (id) => {
        this.setState({
            news: this.state.news.filter((item) => item.id !== id)
        });
    }

    render() {
        const {news} = this.state;

        return (
            <div className="App">
                <Filter onRandomAdd={this.onRandomAdd}/>
                <List news={news ?? []} onRemove={this.onRemove}/>
            </div>
        );
    }
}
