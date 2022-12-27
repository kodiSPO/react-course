import React, {useState} from 'react';
import PropTypes from "prop-types";
import {HASHTAGS, AUTHORS} from "../data/data";
import {faker} from "@faker-js/faker";
import notify from "../../utils/notify";

export function Form(props) {
    const {onAddNew,onAddRandom} = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [author, setAuthor] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const invalidFields = [];

        if (!title.length) invalidFields.push('title');
        if (!text.length) invalidFields.push('text');
        if (!hashtags.length) invalidFields.push('hashtags');
        if (!author.length) invalidFields.push('author');

        if (invalidFields.length) {
            notify(`Missing: <strong>${invalidFields.join(', ')}</strong>.`);
        } else {
            onAddNew({
                id: faker.datatype.uuid(),
                title,
                text,
                hashtags,
                author,
                image: faker.image.cats(300, 300),
            });

            setTitle('');
            setDescription('');
            setText('');
            setImage('');
            setHashtags([]);
            setAuthor('');
        }
    }

    function handleChangeText(e) {
        const {name, value} = e.currentTarget;

        switch(name) {
            case 'title': setTitle(value); break;
            case 'description': setDescription(value); break;
            case 'text': setText(value); break;
        }
    }

    function handleChangeImage(e) {
        setImage(faker.image.cats(300, 300));
    }

    function handleChangeHashtags(e) {
        const {value} = e.currentTarget;
        const newValue = hashtags.includes(value)
            ? hashtags.filter((id) => id !== value)
            : [...hashtags, value];

        setHashtags(newValue);
    }

    function handleChangeAuthor(e) {
        const {value} = e.currentTarget;
        setAuthor(value);
    }

    return (
        <>
            <form className="news-form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        <span>Title</span>
                        <input type="text" name="title" onChange={handleChangeText} value={title}/>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Description</span>
                        <input type="text" name="description" onChange={handleChangeText} value={description}/>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Text</span>
                        <textarea name="text" onChange={handleChangeText} value={text}></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Image</span>
                        <input type="file" name="image" accept=".jpg,.png,.jpeg" onChange={handleChangeImage}/>
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
                                    onChange={handleChangeHashtags}
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
                                    onChange={handleChangeAuthor}
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

Form.propTypes = {
    onAddNew: PropTypes.func,
    onAddRandom: PropTypes.func,
}