export const Capitalise = (word) => {
    const newWord = word.slice(0, 1).toUpperCase().concat(word.slice(1));
    return newWord   
}
