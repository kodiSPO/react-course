import { Component } from "react";
import { parseISO, format } from 'date-fns'

export default class Sm extends Component {
    dateParse(dateStr) {
        return format(parseISO(dateStr), 'MM.dd.yyyy');
    }

    renderItem(item) {
        return (
            <>
                <h3>{item.title}</h3>
                <p><strong>{this.dateParse(item.dateCreated)}</strong></p>
                {item.categories && (
                    <ul>
                        {item.categories.map((cat) => (
                            <li key={cat.id} className="d-inline-block mx-1">{cat.name}</li>
                        ))}
                    </ul>
                )}
                {item.photo && (
                    <div>
                        <img style={{width: '50px'}} src={item.photo}/>
                    </div>
                )}
                <em>{item.author}</em>
                <p><strong className="text-uppercase h3">{item.isSpecial ? 'Special' : 'Regular'}</strong></p>
                <hr/>
            </>
        )
    }

    render() {
        const {news} = this.props;
        
        return news && (
            <div className="news">
                {news.map((item) => (
                    <div key={item.id}>
                        {item.link ? (
                            <a href={item.link}>
                                {this.renderItem(item)}
                            </a>
                        ) : (
                            <div>
                                {this.renderItem(item)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}
