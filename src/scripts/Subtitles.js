import {CUSTOM_SUBTITLES, VIDEO} from "./selectors";
import '../styles/style.css'

const Subtitles = (dictionaryBase, text, insidesOnly) => {
    const $video = document.querySelector(VIDEO)

    const subtitles =
        `${text.split(' ').map(word => `
            <a draggable="false" href='${dictionaryBase}${encodeURIComponent(word.replace(/\W/gm, ''))}' target="_blank">${word}</a>
       `).join(' ')}`

    if (insidesOnly) {
        return subtitles
    }

    window.stopVideo = () => {
        console.log('mouseenter')
    }

    window.continue = () => {
        console.log('mouseleave')
    }

    return `
        <div
            onmouseenter="window.stopVideo()"
            onmouseleave="window.continue()"            
            id="${CUSTOM_SUBTITLES.replace('#', '')}"
            class="subtitles-text"
         >
            ${subtitles}
        </div>
    `
}

export default Subtitles

// forgive me father, for I am about to sin
document.addEventListener('fullscreenchange', () => {
    const $subtitlesBlock = document.querySelector(CUSTOM_SUBTITLES)

    if ($subtitlesBlock) {
        $subtitlesBlock.style.fontSize = document.fullscreenElement ? '26px' : '14px'
    }
});
