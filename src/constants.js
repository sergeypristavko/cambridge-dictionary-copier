export const FORWARD_BUTTON_ID = 'forward-button'
export const BACK_BUTTON_ID = 'back-button'
export const TOGGLE_SUBS_ID = 'toggle-subs'
export const SHOW_SUBS_ID = 'show-subs'
export const PREV_QUOTE_ID = 'prev-quote'
export const REWIND_INTERVAL_ID = 'rewind'
export const DICTIONARY_BASE_ID = 'dictionary-base'

export const defaultValues = {
    [FORWARD_BUTTON_ID]: 'w',
    [BACK_BUTTON_ID]: 'q',
    [TOGGLE_SUBS_ID]: 'e',
    [SHOW_SUBS_ID]: 'r',
    [PREV_QUOTE_ID]: 'a',
    [REWIND_INTERVAL_ID]: 5,
    [DICTIONARY_BASE_ID]: 'https://dictionary.cambridge.org/dictionary/english/',
}

export const getCachedValueOrDefault = (userPreferences, key) => userPreferences[key] || defaultValues[key]
