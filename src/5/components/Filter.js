import React, {Component} from 'react';
import PropTypes from "prop-types";
import {HASHTAGS, AUTHORS} from "../data/data";

export class Filter extends Component {
    handleFilterText = (e) => {
        this.props.onFilterText(e.target.value);
    }

    handleFilterAuthor = (e) => {
        this.props.onFilterAuthor(e.target.value);
    }

    handleFilterTags = (e) => {
        this.props.onFilterTags({
            id: e.target.value,
            checked: e.target.checked,
        });
    }

    render() {
        const {text,author,tags} = this.props.filter;

        return (
            <div className="filter">
                <strong>Filter</strong>
                <div>
                    <input
                        type="text"
                        placeholder="Search text..."
                        onChange={this.handleFilterText}
                        value={text}
                    />
                </div>
                <div>
                    <select onChange={this.handleFilterAuthor} value={author}>
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
                                onChange={this.handleFilterTags}
                            />
                            <span>{tag.label}</span>
                        </label>
                    )))}
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    filter: PropTypes.shape({
        text: PropTypes.string,
        author: PropTypes.string,
        tags: PropTypes.array
    })
}

