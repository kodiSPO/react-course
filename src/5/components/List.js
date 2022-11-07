import React, {Component} from 'react';
import {Item} from "./Item";
import PropTypes, {arrayOf} from "prop-types";

export class List extends Component {
    render() {
        const {news, onRemove} = this.props;

        return (
            <div>
                List
                {news.map((item) => (
                    <div key={item.id}>
                        <Item item={item} onRemove={onRemove}/>
                    </div>
                ))}
            </div>
        );
    }
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