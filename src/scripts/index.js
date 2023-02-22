import '../styles/style.css'
import copyIcon from '../assets/copy-icon.svg'
import doneIcon from '../assets/done.png'

const DONE_ICON_SHOWTIME = 1200
const EXAMPLES_COUNT = 3
const SYNONYMS_COUNT = 3

const $entries = [
    ...document.querySelectorAll('.pr.idiom-block'),
    ...document.querySelectorAll('.pr.entry-body__el'),
    ...document.querySelectorAll('.pv-block'),
]

const outlineSelectedElement = (element) => {
    if (!element) return

    element.classList.add('selected-by-cdc')
}

$entries.forEach($entry => {
    const $ = selector => {
        const element = $entry.querySelector(selector)

        if (element) {
            outlineSelectedElement(element)
            return element.textContent.trim()
        }

        return ''
    }

    const $$ = (selector, numberOfElements) => {
        const elements = (Array.isArray(selector) ? selector : [selector])
            .map(x => [...$entry.querySelectorAll(x)]).flat().slice(0, numberOfElements)

        elements.forEach(outlineSelectedElement)
        return [...new Set(elements.map(x => x.textContent.trim()))]
    }

    const headWord = $('.di-title')
    const pronunciation = $('.us.dpron-i  .pron.dpron') || $('.pron.dpron')
    const description = $('.def.ddef_d.db').replaceAll(':', '').trim()
    const examples = $$('.examp.dexamp', EXAMPLES_COUNT).join('\n')
    const synonyms = $$([`.synonym a`, `.synonyms a`, `.daccord.fs16 a`], SYNONYMS_COUNT).join(', ')

    const onclick = () => {
        const data = `${headWord} ${pronunciation} ${synonyms.length ? `(${synonyms})` : ''} \n${examples}\n\n${description}`

        navigator.clipboard.writeText(data)

        copyButton.src = doneIcon

        setTimeout(() => {
            copyButton.src = copyIcon
        }, DONE_ICON_SHOWTIME)
    }

    const copyButton = document.createElement('img')
    copyButton.src = copyIcon
    copyButton.className = 'copy-btn'
    copyButton.onclick = onclick

    $entry.querySelector('.di-title').insertAdjacentElement('beforeEnd', copyButton)
})
