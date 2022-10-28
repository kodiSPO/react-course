import { Component } from "react";
import Sm from "./components/Sm";
import Lg from "./components/Lg";
import directories from './storage/directories.json';
import Filter from "./components/Filter";
import news from "./storage/news.json";

export default class App extends Component {
    state = {
        checked: {
            'photo': false,
            'link': false,
            'isSpecial': false,
        }
    }

    handleFilter = (filter) => {
        this.setState({
            checked: {
                ...this.state.checked,
                [filter]: !this.state.checked[filter]
            }
        });
    }

    render() {
        let filteredNews = news;

        for (const [key, value] of Object.entries(this.state.checked)) {
            if (!value) continue;
            filteredNews = filteredNews.filter((newsItem) => newsItem[key]);
        }

        return (
            <div className="App">
                <h1>News</h1>
                <Filter filters={this.state.checked} handleFilter={this.handleFilter}/>
                <Sm news={filteredNews}/>
                <h1>Tree</h1>
                <Lg directories={directories}/>
            </div>
        );
    }
}
