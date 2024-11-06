export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const Capitalise = (word) => {
    const newWord = word.slice(0, 1).toUpperCase().concat(word.slice(1));
    return newWord   
}

export const validateCredentials = (name, username, email, password) => { 
    if (name.length >= 3 && username.length && emailRegex.test(email) && passwordRegex.test(password)) {
      return true
    } else {
        return
    }
}

export const validatePassword = (password) => {
    const result = {
        hasUppercase: /[A-Z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*]/.test(password),
        minLength: password.length >= 8,
    }
    return result
}
