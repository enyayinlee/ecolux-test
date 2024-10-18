const basicPattern = "A-Za-z\\d";

export const validateEmail = (str: string): boolean => {
    const emailCheck = new RegExp(
        `^[${basicPattern}]{1,64}@[${basicPattern}]{1,63}(.[${basicPattern}]{1,63})+$`
    );
    return emailCheck.test(str) && str?.split("@")[1].length <= 255
}

export const validatePwd = (str: string): boolean => {
    const accountCheck = new RegExp(`^[${basicPattern}]+$`);
    return accountCheck.test(str)
}