import {Component} from "react";
import {Item} from "./Item";

export default class Sm extends Component {


    render() {
        const {news} = this.props;

        return news && (
            <div className="news">
                {news.map((item) => (
                    <Item key={item.id} item={item}/>
                ))}
            </div>
        );
    }
}
