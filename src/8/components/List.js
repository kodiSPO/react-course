import React from 'react';
import {Item} from "./Item";
import PropTypes from "prop-types";

export function List(props) {
    const {news, onRemove} = props;

    return (
        <div>
            {news.map((item) => (
                <div key={item.id}>
                    <Item item={item} onRemove={onRemove}/>
                </div>
            ))}
        </div>
    );
}

List.propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        text: PropTypes.string,
        image: PropTypes.string,
        hashtags: PropTypes.array,
        author: PropTypes.string,
    })),
    onRemove: PropTypes.func,
}