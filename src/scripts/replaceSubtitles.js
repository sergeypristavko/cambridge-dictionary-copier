import {clearHTMLTags} from "./utils";
import {
    CUSTOM_SUBTITLES,
    ORIGINAL_SUBS_TEXT,
    ORIGINAL_SUBS_WRAPPER,
    PLAY_BUTTON,
    PLAYER_BACKGROUND,
    PLAYER_BODY,
    VIDEO
} from "./selectors";
import Subtitles from "./Subtitles";

const replaceSubtitles = ({ dictionaryBase }) => {
    const $playBackground = document.querySelector(PLAYER_BACKGROUND)
    const $playerBody = document.querySelector(PLAYER_BODY)
    const $playButton = document.querySelector(PLAY_BUTTON)
    const $video = document.querySelector(VIDEO)

    const getSubsWrapper = () => document.querySelector(ORIGINAL_SUBS_WRAPPER)
    const getSubsText = () => clearHTMLTags(document.querySelector(ORIGINAL_SUBS_TEXT)?.innerHTML || '')

    let initialized = false

    const init = () => {
        const rerenderSubs = () => {
            const text = getSubsText()

            if (text === window.prevSubsText && text) {
                return;
            }

            const $subtitlesBlock = $playerBody.querySelector(CUSTOM_SUBTITLES)

            if ($subtitlesBlock) {
                $subtitlesBlock.innerHTML = ''
            }

            if (!text) return;

            window.prevQuoteTime = $video.currentTime
            window.prevSubsText = text

            if ($subtitlesBlock) {
                $subtitlesBlock.innerHTML = Subtitles(dictionaryBase, text, true)
            } else {
                $playerBody.insertAdjacentHTML('beforeend', Subtitles(dictionaryBase, text))
            }
        }

        rerenderSubs()

        new MutationObserver(rerenderSubs).observe(getSubsWrapper(), {childList: true})
    }

    const playListener = () => {
        if (initialized) return;
        initialized = true

        const observer = new MutationObserver(() => {
            const subsWrapper = getSubsWrapper()
            if (subsWrapper) {
                subsWrapper.style.opacity = 0
                init()
                observer.disconnect()
            }
        })

        observer.observe(document.querySelector(PLAYER_BODY), {childList: true})
    };

    [$playButton, $playBackground].forEach(el => el.addEventListener('click', playListener, {once: true}))
}

export default replaceSubtitles
