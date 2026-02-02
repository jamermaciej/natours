import { AbstractControl, ValidationErrors, ValidatorFn } from  "@angular/forms"

export const banWordsValidator = (value: string | string[]): ValidatorFn => {
    const bannedWords = Array.isArray(value) ? value : [value];

    return (control: AbstractControl): ValidationErrors | null => {
        const foundBannedWord = bannedWords.find(word => word.toLowerCase().trim() === control.value.toLowerCase().trim());

        return !foundBannedWord
            ? null
            : { banWords: { bannedWord: foundBannedWord } }
    }
}