import {createButtonKey, findBySelectorAndLabel} from "./utils";
import {CUSTOM_SUBTITLES, SUBTITLES_BUTTON, TRANSLATORS_LIST} from "./selectors";

const toggleSubtitles = ({toggleSubsButton, showSubsButton}) => {
    const $translatorsList = document.querySelector(TRANSLATORS_LIST)

    const showSubsButtonKey = createButtonKey(showSubsButton)
    const toggleSubsKey = createButtonKey(toggleSubsButton)

    let keydownListener
    let keyupListener
    let initialized = false

    const toggleSubtitlesVisibility = () => {
        const $subs = document.querySelector(CUSTOM_SUBTITLES)

        if ($subs) {
            $subs.hidden = !$subs.hidden
        }
    }

    const initListeners = () => {
        const $subtitlesBtn = findBySelectorAndLabel(SUBTITLES_BUTTON, 'субтитры')
        const $engSubtitlesBtn = findBySelectorAndLabel(SUBTITLES_BUTTON, 'english')

        $subtitlesBtn?.click()
        $engSubtitlesBtn?.click()

        let pressed = false

        keydownListener = ({code}) => {
            if (pressed) return

            if (code === toggleSubsKey) {
                toggleSubtitlesVisibility()
                return;
            }

            if (code !== showSubsButtonKey || pressed) return;
            pressed = true

            toggleSubtitlesVisibility()
        }

        keyupListener = ({code}) => {
            if (code !== showSubsButtonKey) return;
            pressed = false
            toggleSubtitlesVisibility()
        }

        document.addEventListener('keydown', keydownListener)
        document.addEventListener('keyup', keyupListener)
    }

    const cleanUp = () => {
        document.removeEventListener('keydown', keydownListener)
        document.removeEventListener('keyup', keyupListener)
        initialized = false
    }

    const isOriginalSelected = () => {
        const active = $translatorsList.querySelector('.active')
        return active.textContent.toLowerCase().includes('оригинал (+субтитры)')
    }

    const init = () => {
        if (isOriginalSelected()) {
            if (initialized) return;
            initListeners()
            initialized = true
        } else {
            cleanUp()
        }
    }

    const setObserver = () =>
        new MutationObserver(init).observe(
            $translatorsList,
    {
                attributes: true,
                childList: true,
                subtree: true
           }
        )

    isOriginalSelected() ? init() : setObserver()
}

export default toggleSubtitles
