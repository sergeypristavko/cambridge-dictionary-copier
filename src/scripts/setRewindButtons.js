import {createButtonKey} from "./utils";
import {VIDEO} from "./selectors";

const setRewindButtons = ({ back, forward, prevQuote, rewindInterval }) => {
    const $video = document.querySelector(VIDEO)

    const backButtonKey = createButtonKey(back)
    const forwardButtonKey = createButtonKey(forward)
    const prevQuoteKey = createButtonKey(prevQuote)

    const rewind = value => {
        $video.currentTime += value
        window.prevSubsText = null
    }

    const listener = ({code}) => {
        if (code === backButtonKey) {
            rewind(-rewindInterval)
        }
        if (code === forwardButtonKey) {
            rewind(rewindInterval)
        }
        if (code === prevQuoteKey) {
            if (window.prevQuoteTime) {
                $video.currentTime = window.prevQuoteTime - 2
                window.prevQuoteTime = 0
            } else {
                rewind(-rewindInterval)
            }
        }
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
}

export default (params) => setTimeout(() => setRewindButtons(params), 500)
