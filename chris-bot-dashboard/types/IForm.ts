export type IForm = {
    reset: () => void,
    resetValidation: () => void,
    validate: () => boolean
} | null