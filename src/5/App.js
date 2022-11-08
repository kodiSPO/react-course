import {Component} from "react";
import {Form} from "./components/Form";
import {Filter} from "./components/Filter";
import {List} from "./components/List";
import {generateNewsItem, generateNews} from "./data/data";
import "./css/index.scss";

export default class App extends Component {
    state = {
        news: generateNews(5),
        isFormOpen: false,
    }

    handleOpenForm = () => {
        this.setState({
            isFormOpen: !this.state.isFormOpen
        })
    }

    addNew = (item) => {
        this.setState({
            news: [
                item,
                ...this.state.news,
            ]
        });
    }

    addRandom = () => {
        this.addNew(generateNewsItem());
    }

    onRemove = (id) => {
        this.setState({
            news: this.state.news.filter((item) => item.id !== id)
        });
    }

    render() {
        const {news} = this.state;
        const {isFormOpen} = this.state;

        return (
            <div className="App">
                <button onClick={this.handleOpenForm}>Form</button>
                {isFormOpen && (
                    <Form
                        onAddNew={this.addNew}
                        onAddRandom={this.addRandom}
                    />
                )}
                <Filter/>
                <List news={news ?? []} onRemove={this.onRemove}/>
            </div>
        );
    }
}
