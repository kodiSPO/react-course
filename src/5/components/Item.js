import React, {Component} from 'react';
import PropTypes from "prop-types";
import {HASHTAGS, AUTHORS} from "../data/data";

export class Item extends Component {
    getHashtagLabels(hashtagIds) {
        return hashtagIds.reduce((hashtags, id) => {
            for (const tag of HASHTAGS) {
                if (tag.id === id) hashtags.push(tag.label);
            }

            return hashtags;
        }, []);
    }

    getAuthor(authorId) {
        return AUTHORS.filter((author) => {
            return author.id === authorId;
        })[0].name;
    }

    render() {
        const {item: {id, title, description, text, image, hashtags, author}, onRemove} = this.props;

        return (
            <div id={id} className="news-item">
                <img src={image}/>
                <div className="news-item__text-cont">
                    <h3 className="news-item__title">{title}</h3>
                    <p className="news-item__decr">{description}</p>
                    <p className="news-item__text">{text}</p>
                    <div className="news-item__hashtags">
                        {this.getHashtagLabels(hashtags).join(', ')}
                    </div>
                    <p className="news-item__author">{this.getAuthor(author)}</p>
                    <button onClick={() => onRemove(id)}>Remove</button>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        text: PropTypes.string,
        image: PropTypes.string,
        hashtags: PropTypes.array,
        author: PropTypes.string,
    }),
    onRemove: PropTypes.func,
}