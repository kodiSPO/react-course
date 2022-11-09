import React, {Component} from "react";
import {Form} from "./components/Form";
import {Filter} from "./components/Filter";
import {List} from "./components/List";
import {generateNewsItem, generateNews} from "./data/data";
import "./css/index.scss";

export default class App extends Component {
    state = {
        news: generateNews(5),
        isFormOpen: false,
        isFilterOpen: false,
        filter: {
            text: '',
            author: '',
            tags: []
        }
    }

    handleFilterText = (text) => {
        this.setState({
            filter: {
                ...this.state.filter,
                text
            }
        });
    }

    handleFilterAuthor = (author) => {
        this.setState({
            filter: {
                ...this.state.filter,
                author
            }
        });
    }

    handleFilterTags = (filteredTag) => {
        const oldTags = this.state.filter.tags;
        const tags = filteredTag.checked
            ? [...oldTags, filteredTag.id]
            : oldTags.filter(tag => tag !== filteredTag.id);

        this.setState({
            filter: {
                ...this.state.filter,
                tags
            }
        });
    }

    handleOpenForm = () => {
        const isFormOpen = this.state.isFormOpen;
        const isFilterOpen = this.state.isFilterOpen;

        this.setState({
            isFormOpen: !isFormOpen,
            isFilterOpen: (isFormOpen && isFilterOpen) && false
        })
    }

    handleOpenFilter = () => {
        const isFormOpen = this.state.isFormOpen;
        const isFilterOpen = this.state.isFilterOpen;

        this.setState({
            isFormOpen: (isFormOpen && isFilterOpen) && false,
            isFilterOpen: !isFilterOpen
        })
    }

    addNew = (item) => {
        this.setState({
            news: [
                item,
                ...this.state.news,
            ]
        });
    }

    addRandom = () => {
        this.addNew(generateNewsItem());
    }

    onRemove = (id) => {
        this.setState({
            news: this.state.news.filter((item) => item.id !== id)
        });
    }

    handleFilter= () => {
        let {news, filter: {
            text,author, tags
        }} = this.state;

        if (text) {
            news = news.filter(item => {
                return item.title.toLowerCase().includes(text.toLowerCase())
                    || item.description.toLowerCase().includes(text.toLowerCase())
                    || item.text.toLowerCase().includes(text.toLowerCase())
            });
        }

        if (author) {
            news = news.filter(item => {
                return item.author === author;
            });
        }

        if (tags) {
            news = news.filter(item => {
                return tags.every(tag => {
                    return item.hashtags.includes(tag);
                });
            });
        }

        return news;
    }

    render() {
        const {isFormOpen, isFilterOpen, filter} = this.state;

        return (
            <div className="App">
                <button onClick={this.handleOpenForm}>Form</button>
                <button onClick={this.handleOpenFilter}>Filter</button>
                {isFormOpen && (
                    <Form
                        onAddNew={this.addNew}
                        onAddRandom={this.addRandom}
                    />
                )}
                {isFilterOpen && (
                    <Filter
                        filter={filter}
                        onFilterText={this.handleFilterText}
                        onFilterAuthor={this.handleFilterAuthor}
                        onFilterTags={this.handleFilterTags}
                    />
                )}
                <hr/>
                <List news={this.handleFilter()} onRemove={this.onRemove}/>
            </div>
        );
    }
}
