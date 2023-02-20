export const clearHTMLTags = str => str.replace(/(<([^>]+)>)/gi, ' ')

export const createButtonKey = key => `Key${key.toUpperCase()}`

export const findBySelectorAndLabel = (selector, label) =>
    [...document.querySelectorAll(selector)].map(x => [...x.children]).flat().find(x => x.innerHTML.toLowerCase() === label)?.parentElement
