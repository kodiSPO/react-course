import React from 'react';
import PropTypes from "prop-types";
import {HASHTAGS, AUTHORS} from "../data/data";

export function Filter(props) {
    const {filter: {text,author,tags}, onFilterText, onFilterAuthor, onFilterTags} = props;

    function handleFilterText(e) {
        onFilterText(e.target.value);
    }

    function handleFilterAuthor(e) {
        onFilterAuthor(e.target.value);
    }

    function handleFilterTags(e) {
        onFilterTags({
            id: e.target.value,
            checked: e.target.checked,
        });
    }

    return (
        <div className="filter">
            <strong>Filter</strong>
            <div>
                <input
                    type="text"
                    placeholder="Search text..."
                    onChange={handleFilterText}
                    value={text}
                />
            </div>
            <div>
                <select onChange={handleFilterAuthor} value={author}>
                    <option value="">Search author...</option>
                    {AUTHORS.map((author => (
                        <option  key={author.id} value={author.id}>{author.name}</option>
                    )))}
                </select>
            </div>
            <div className="filter__tags">
                {HASHTAGS.map((tag => (
                    <label key={tag.id}>
                        <input
                            type="checkbox"
                            checked={tags.includes(tag.id)}
                            value={tag.id}
                            onChange={handleFilterTags}
                        />
                        <span>{tag.label}</span>
                    </label>
                )))}
            </div>
        </div>
    );
}

Filter.propTypes = {
    filter: PropTypes.shape({
        text: PropTypes.string,
        author: PropTypes.string,
        tags: PropTypes.array
    }),
    onFilterText: PropTypes.func,
    onFilterAuthor: PropTypes.func,
    onFilterTags: PropTypes.func
}

