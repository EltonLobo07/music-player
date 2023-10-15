function passClassNameIfTruthy(valueToTest: unknown, className: string): string {
    return valueToTest ? className : "";
}

function formatClassName(classNames: string): string {
    const stack: string[] = [];
    const specialCharacters = new Set([" ", "\t", "\n"]);
    for (const ch of classNames) {
        const chPresent = specialCharacters.has(ch); 
        if (!chPresent || (stack.length > 0 && !specialCharacters.has(stack[stack.length - 1]))) {
            stack.push(chPresent ? " " : ch);
        }
    }
    while (stack && specialCharacters.has(stack[stack.length - 1])) {
        stack.pop();
    }
    return stack.join("");
}

function getSingleSpacedStr(arg: string): string {
    return formatClassName(arg);
}

function getImageUrlFromCoverId(coverId: string): string {
    return `https://cms.samespace.com/assets/${coverId}`;
}

const SEC_IN_ONE_MIN = 60;

function getSecondsPortionOfMColonSSFormat(seconds: number): string {
    const returnSeconds = Math.floor(seconds % SEC_IN_ONE_MIN);
    return returnSeconds < 10 ? `0${returnSeconds}` : String(returnSeconds);
}

function getMinutesPortionOfMColonSSFormat(seconds: number): string {
    return String(Math.floor(seconds / SEC_IN_ONE_MIN));
}

function secondsToMColonSSFormat(seconds: number): string { 
    return `${getMinutesPortionOfMColonSSFormat(seconds)}:${getSecondsPortionOfMColonSSFormat(seconds)}`;
}

function processUrl(url: string): string {
    return url.split(" ").join("");
}

export const helpers = {
    formatClassName,
    passClassNameIfTruthy,
    getImageUrlFromCoverId,
    secondsToMColonSSFormat,
    getSecondsPortionOfMColonSSFormat,
    getMinutesPortionOfMColonSSFormat,
    getSingleSpacedStr,
    processUrl
};
