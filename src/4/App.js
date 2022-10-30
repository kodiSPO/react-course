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
        },
        search: '',
        cats: [],
    }

    handleFilter = (filter) => {
        this.setState({
            checked: {
                ...this.state.checked,
                [filter]: !this.state.checked[filter]
            }
        });
    }

    handleSearch = (value) => {
        this.setState({
            search: value
        });
    }

    getFilteredNews = () => {
        const {checked, search, cats} = this.state;

        return news.filter((item) => {
            // main filters
            for (const [key, value] of Object.entries(checked)) {
                if (value && !item[key]) return false;
            }

            // search text
            if (search) {
                return [item.title, item.author].some((text) => {
                    return text.toLowerCase().includes(search.toLowerCase());
                })
            }

            // cats
            if (cats) {
                return cats.every((cat) => {
                    return item.categories.map(item => item.name).includes(cat);
                });
            }

            return true;
        });
    }

    handleCats = (cat) => {
        if (cat.checked) {
            if (!this.state.cats.includes(cat.name)) {
                this.setState({
                    cats: [...this.state.cats, cat.name]
                })
            }
        } else {
            if (this.state.cats.includes(cat.name)) {
                let cats = this.state.cats;
                cats.splice(cats.indexOf(cat.name), 1);
                this.setState({
                    cats
                })
            }
        }
    }

    getCats = () => {
        let cats = [];
        news.forEach((item) => cats = [...cats, ...item.categories]);
        cats = cats.map((cat) => cat.name);
        return [...new Set(cats)];
    }

    render() {
        const {checked, search} = this.state;
        const filteredNews = this.getFilteredNews();

        return (
            <div className="App">
                <h1>News</h1>
                <Filter
                    filters={checked}
                    handleFilter={this.handleFilter}
                    search={search}
                    handleSearch={this.handleSearch}
                    cats={this.getCats()}
                    handleCats={this.handleCats}
                />
                <Sm news={filteredNews}/>
                {/*<h1>Tree</h1>*/}
                {/*<Lg directories={directories}/>*/}
            </div>
        );
    }
}
