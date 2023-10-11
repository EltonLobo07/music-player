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

export const helpers = {
    formatClassName,
    passClassNameIfTruthy
};
