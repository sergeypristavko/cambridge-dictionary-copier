import {createRoot} from "react-dom/client";
import './popup.css'

const root = createRoot(document.getElementById("app"))

root.render(
    <>
        <h1 className='title'>HDrezka plugin for English learners</h1>
        <button
            className='button'
            role="button"
            onClick={() => chrome.runtime.openOptionsPage()}
        >
            Open the settings page
        </button>
    </>
)
