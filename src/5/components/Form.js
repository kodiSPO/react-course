import React, {Component} from 'react';
import PropTypes from "prop-types";
import {HASHTAGS, AUTHORS} from "../data/data";
import {faker} from "@faker-js/faker";
import notify from "../../utils/notify";

export class Form extends Component {
    state = {
        title: '',
        description: '',
        text: '',
        image: '',
        hashtags: [],
        author: '',
    }

    handleSubmit = (e) =>  {
        e.preventDefault();

        const requiredFields = [
            'title',
            'text',
            'hashtags',
            'author',
        ];

        const invalidFields = [];

        for (const prop in this.state) {
            if (
                requiredFields.includes(prop) &&
                (!this.state[prop] || !this.state[prop].length)
            ) {
                invalidFields.push(prop);
            }
        }

        if (invalidFields.length) {
            notify(`Missing: <strong>${invalidFields.join(', ')}</strong>.`);
        } else {
            this.props.onAddNew({
                id: faker.datatype.uuid(),
                ...this.state,
                image: faker.image.cats(300, 300),
            });
            this.setState({
                title: '',
                description: '',
                text: '',
                image: '',
                hashtags: [],
                author: '',
            });
        }
    }

    handleChangeText = (e) =>  {
        const { name, value } = e.currentTarget;
        this.setState({
            [name]: value,
        })
    }

    handleChangeImage = (e) => {
        this.setState({
            image: faker.image.cats(300, 300),
        })
    };

    handleChangeHashtags = (e) => {
        const { value } = e.currentTarget;
        const newValue = this.state.hashtags.includes(value)
            ? this.state.hashtags.filter((id) => id !== value)
            : [...this.state.hashtags, value];

        this.setState({
            hashtags: newValue
        });
    }

    handleChangeAuthor = (e) =>  {
        const { value } = e.currentTarget;
        this.setState({
            author: value,
        })
    }

    render() {
        const {onAddRandom} = this.props;
        const {title, description, text, hashtags, author} = this.state;

        return (
            <>
                <form className="news-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            <span>Title</span>
                            <input type="text" name="title" onChange={this.handleChangeText} value={title}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Description</span>
                            <input type="text" name="description" onChange={this.handleChangeText} value={description}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Text</span>
                            <textarea name="text" name="text" onChange={this.handleChangeText} value={text}></textarea>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Image</span>
                            <input type="file" name="image" accept=".jpg,.png,.jpeg" onChange={this.handleChangeImage}/>
                        </label>
                    </div>
                    <div className="news-form__choices">
                        <div className="news-form__list">
                            <span>Hashtags</span>
                            {HASHTAGS.map((tag) => (
                                <label key={tag.id}>
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={hashtags.includes(tag.id)}
                                        onChange={this.handleChangeHashtags}
                                    />
                                    <span>{tag.label}</span>
                                </label>
                            ))}
                        </div>
                        <div className="news-form__list">
                            <span>Hashtags</span>
                            {AUTHORS.map((authorObj) => (
                                <label key={authorObj.id}>
                                    <input
                                        type="radio"
                                        checked={authorObj.id === author}
                                        value={authorObj.id}
                                        onChange={this.handleChangeAuthor}
                                    />
                                    <span>{authorObj.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="news-form__bttns">
                        <button type="submit">Add new</button>
                        <button type="button" onClick={() => onAddRandom()}>Add random</button>
                    </div>
                </form>
            </>
        );
    }
}

Form.propTypes = {
    onAddNew: PropTypes.func,
    onAddRandom: PropTypes.func,
}