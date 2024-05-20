//@ts-check

const str = "what-a-nice-day-today";
const str2 = "What_a_nice_day_today";

/**
 *
 * @param {string} str
 */

function toCamelCase(str) {
    let currentString = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === "_" || char === "-") {
            const upperLetter = str.slice(i+1, i+2)[0].toUpperCase();
            currentString = currentString + upperLetter;
            i++;
        } else {
            currentString = currentString + char;
        }
    }
    return currentString;
}

console.log(toCamelCase(str));
