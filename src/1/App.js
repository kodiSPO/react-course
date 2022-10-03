import './css/index.scss';
import notify from '../utils/notify';
import {useState} from 'react';
import {Fragment} from "react";

function App() {
    // https://docs.screenshotapi.net/
    const token = 'GB8T232-M894SEA-GV9Q188-PN12E9G';

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    function isValidUrl(urlString) {
        try {
            return Boolean(new URL(urlString));
        } catch (e) {
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const input = e.target.url.value;
        if (!isValidUrl(input)) {
            notify('Invalid URL');
            return;
        }
        setIsLoading(true);
        const screenshot = await getScreenshot(input);
        if (screenshot) {
            setIsLoading(false);
            notify('Screenshot is ready!', 'success');
            setImage(screenshot);
        }
    }

    async function getScreenshot(url) {
        const response = await fetch(`https://shot.screenshotapi.net/screenshot?token=${token}&url=${url}`);
        const json = await response.json();
        return json.screenshot;
    }

    return (
        <div className="App">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <h3 className="text-center">Get website screenshot</h3>
                        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                            <div className="mb-3">
                                <input id="url" type="text" className="form-control" placeholder="Website URL"/>
                                <div className="form-text">Enter website URL to generate its screenshot.</div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Generate screenshot</button>
                        </form>
                    </div>
                </div>
                <div className="mt-5 d-flex flex-column align-items-center">
                    {isLoading && (
                        <>
                            <p>Processing...</p>
                            <div className="spinner-border text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                    )}
                    {image && (
                        <img src={image} className="screenshot w-100"/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
