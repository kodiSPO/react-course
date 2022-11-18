import React, {Component} from "react";
import "./css/index.scss";

const API_URL = 'https://www.swapi.tech/api/planets/';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            status: 'initial', // initial, loading, success, error
            error: null,
            data: null,
            currentPage: 1,
        }

        this.navigate = this.navigate.bind(this);
        App.buildUrl = App.buildUrl.bind(this);
    }

    static buildUrl($pageNumber) {
        const query = new URLSearchParams({
            page: $pageNumber,
            limit: 10,
        });

        return `${API_URL}?${query}`;
    }

    async fetchShips($pageNumber) {
        this.setState({
            status: 'loading',
            error: null,
            data: null,
        });

        await fetch(App.buildUrl($pageNumber))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    status: 'success',
                    error: null,
                    data,
                    currentPage: +$pageNumber,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    status: 'error',
                    error: error,
                    data: null,
                });
            })
    }

    navigate(e) {
        e.preventDefault();
        const url = new URL(e.target.href);
        const params = url.searchParams;
        const page = params.get('page');

        this.fetchShips(page);
    }

    render() {
        const {status, data, error, currentPage} = this.state;

        return (
            <div className="App">
                {status === 'loading' ? (
                    <div>loading...</div>
                ) : (
                    <>
                        {error ? (
                            <div>oops... something is wrong!</div>
                        ) : (
                            <div>
                                {data && data.results && (
                                    <>
                                        <div>Current page is: {currentPage}</div>
                                        <ul>
                                            {data.results.map((ship) => (
                                                <li key={ship.uid}>
                                                    {ship.name}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="nav">
                                            {data.previous && (
                                                <a href={data.previous} onClick={this.navigate}>Prev</a>
                                            )}

                                            {[...Array(data.total_pages).keys()].map(x => ++x).map((page) => (
                                                <span key={page}>
                                                    {+page === currentPage ? (
                                                        <span>{page}</span>
                                                    ) : (
                                                        <a href={App.buildUrl(page)}
                                                           onClick={this.navigate}
                                                        >{page}</a>
                                                    )}
                                                </span>
                                            ))}

                                            {data.next && (
                                                <a href={data.next} onClick={this.navigate}>next</a>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }

    componentDidMount() {
        this.fetchShips(this.state.currentPage);
    }
}
