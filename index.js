const showData = (data) => {
    if (data) {
        data = data.split('').reverse().join('')
        data = decodeURIComponent(escape(atob(data)))
        data = JSON.parse(data)
        return data
    }
}

const hideData = (data) => {
    try {
        if (data) {
            data = JSON.stringify(data)
            data = btoa(unescape(encodeURIComponent(data)))
            data = data.split('').reverse().join('')
            return data
        }
    } catch (e) {

    }
}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)


const validateCPF = cpf => {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf === '') return false
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false
    let add = 0
    let rev
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i)
    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11)
        rev = 0
    if (rev !== parseInt(cpf.charAt(9)))
        return false
    add = 0
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11)
        rev = 0
    if (rev !== parseInt(cpf.charAt(10)))
        return false
    return true
}

const validateEmail = email => {
    if (email === '' || !email.includes("@")) return false
    const user = email.substring(0, email.indexOf("@"))
    const domain = email.substring(email.indexOf("@") + 1, email.length)
    return ((user.length >= 1)
        && (domain.length >= 3)
        && (user.search("@") === -1)
        && (domain.search("@") === -1)
        && (user.search(" ") === -1)
        && (domain.search(" ") === -1)
        && (domain.search(".") !== -1)
        && (domain.indexOf(".") >= 1)
        && (domain.lastIndexOf(".") < domain.length - 1))
}

const maskCPF = cpf => cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

const maskPhone = phone => {
    if (phone !== '')
        return phone.substring(0, 14).replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2')
}

const removeAccents = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const clearText = text => {
    text = text.replace(/[^\d]+/g, '')
    return text.trim()
}

const lastDigits = (text, number = 5) => text.substring(text.length - number)

const apiRequest = async ({url, init}) => await fetch(url, init).then((data) => data.json()).catch((error) => (error))

const searchEmJSON = search => {
    let pairs = search.split('&'), objeto = {}, pair, i;
    for (i in pairs) {
        if (pairs[i] === '') continue
        pair = pairs[i].split('=')
        objeto[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
    }
    return objeto
}

module.exports = {
    showData,
    hideData,
    capitalize,
    validateCPF,
    validateEmail,
    maskCPF,
    maskPhone,
    removeAccents,
    lastDigits,
    clearText,
    apiRequest,
    searchEmJSON
}
