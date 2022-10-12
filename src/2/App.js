import { Component } from "react";
import Sm from "./components/Sm";
import Lg from "./components/Lg";
import directories from './storage/directories.json';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>News</h1>
                <Sm/>
                <h1>Tree</h1>
                <Lg directories={directories}/>
            </div>
        );
    }
}
