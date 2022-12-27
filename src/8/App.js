import React, {useState} from "react";
import {Form} from "./components/Form";
import {Filter} from "./components/Filter";
import {List} from "./components/List";
import {generateNewsItem, generateNews} from "./data/data";
import "./css/index.scss";

export default function App() {
    let [news, setNews] = useState(generateNews(5));
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filter, setFilter] = useState({
        text: '',
        author: '',
        tags: []
    });

    function handleFilterText(text) {
        setFilter({...filter, text});
    }

    function handleFilterAuthor(author) {
        setFilter({...filter, author});
    }

    function handleFilterTags(filteredTag) {
        const oldTags = filter.tags;
        const tags = filteredTag.checked
            ? [...oldTags, filteredTag.id]
            : oldTags.filter(tag => tag !== filteredTag.id);

        setFilter({...filter, tags});
    }

    function handleOpenForm() {
        setIsFormOpen(!isFormOpen);
        setIsFilterOpen((isFormOpen && isFilterOpen) && false);
    }

    function handleOpenFilter() {
        setIsFormOpen((isFormOpen && isFilterOpen) && false);
        setIsFilterOpen(!isFilterOpen);
    }

    function addNew(item) {
        setNews([item, ...news]);
    }

    function addRandom() {
        addNew(generateNewsItem());
    }

    function onRemove(id) {
        setNews(news.filter((item) => item.id !== id));
    }

    function handleFilter() {
        let {text, author, tags} = filter;

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

    return (
        <div className="App">
            <button onClick={handleOpenForm}>Form</button>
            <button onClick={handleOpenFilter}>Filter</button>
            {isFormOpen && (
                <Form
                    onAddNew={addNew}
                    onAddRandom={addRandom}
                />
            )}
            {isFilterOpen && (
                <Filter
                    filter={filter}
                    onFilterText={handleFilterText}
                    onFilterAuthor={handleFilterAuthor}
                    onFilterTags={handleFilterTags}
                />
            )}
            <hr/>
            <List news={handleFilter()} onRemove={onRemove}/>
        </div>
    );
}
