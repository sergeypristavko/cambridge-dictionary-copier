import initToggleSubtitles from './toggleSubtitles'
import initRewindButtons from './setRewindButtons'
import initReplaceSubtitles from './replaceSubtitles'
import {
    BACK_BUTTON_ID,
    DICTIONARY_BASE_ID,
    FORWARD_BUTTON_ID,
    PREV_QUOTE_ID,
    REWIND_INTERVAL_ID,
    SHOW_SUBS_ID,
    TOGGLE_SUBS_ID,
    getCachedValueOrDefault
} from "../constants";
import {EPISODES_LIST} from "./selectors";

// const episodesList = document.querySelector(EPISODES_LIST)
//
// console.log(episodesList)
//
// const episodeChangeObserver = new MutationObserver(() => {
//     console.log('update')
// })
//
// episodeChangeObserver.observe(document.querySelector(EPISODES_LIST), {
//     attributes: true,
//     childList: true,
//     subtree: true
// })


chrome.storage.sync.get([
    BACK_BUTTON_ID,
    DICTIONARY_BASE_ID,
    PREV_QUOTE_ID,
    REWIND_INTERVAL_ID,
    SHOW_SUBS_ID,
    TOGGLE_SUBS_ID
]).then(userPreferences => {
    initToggleSubtitles({
        toggleSubsButton: getCachedValueOrDefault(userPreferences, TOGGLE_SUBS_ID),
        showSubsButton: getCachedValueOrDefault(userPreferences, SHOW_SUBS_ID)
    })

    initRewindButtons({
        back: getCachedValueOrDefault(userPreferences, BACK_BUTTON_ID),
        forward: getCachedValueOrDefault(userPreferences, FORWARD_BUTTON_ID),
        prevQuote: getCachedValueOrDefault(userPreferences, PREV_QUOTE_ID),
        rewindInterval: getCachedValueOrDefault(userPreferences, REWIND_INTERVAL_ID),
    })

    initReplaceSubtitles({
        dictionaryBase: getCachedValueOrDefault(userPreferences, DICTIONARY_BASE_ID)
    })
})
