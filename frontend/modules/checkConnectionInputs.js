

const isMissingInputSignin = (email, password) => {
    const errorElements = []
    if (email === "") {
        errorElements.push("email")
    }
    if (password === "") {
        errorElements.push("password")
    }
    if (errorElements.length > 0) {
        const plurial = errorElements.length > 1 ? "s" : ""
        const plurialVerb = errorElements.length > 1 ? "doivent" : "doit"
        return { result: true, message: `Le${plurial} champ${plurial} ${errorElements.join(', ')} ${plurialVerb} être renseigné${plurial}` }
    }
    return { result: false }
}

const isMissingInputSignup = (firstname, name, email, password) => {
    const errorElements = []
    if (firstname === "") {
        errorElements.push("firstname")
    }
    if (name === "") {
        errorElements.push("name")
    }
    if (email === "") {
        errorElements.push("email")
    }
    if (password === "") {
        errorElements.push("password")
    }
    if (errorElements.length > 0) {
        const plurial = errorElements.length > 1 ? "s" : ""
        const plurialVerb = errorElements.length > 1 ? "doivent" : "doit"

        return { result: true, message: `Le${plurial} champ${plurial} ${errorElements.join(', ')} ${plurialVerb} être renseigné${plurial}` }
    }
    return { result: false } 
}

const checkEmail = (email) => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error = "Cet email n'est pas valide."
    if (!EMAIL_REGEX.test(email)) {
        return error
    }

}

export {isMissingInputSignin, isMissingInputSignup, checkEmail}