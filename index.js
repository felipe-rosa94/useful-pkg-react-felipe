const axios = require('axios')

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
        console.log(e)
    }
}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const validateCPF = cpf => {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf === '') return false
    if (cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999')
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
    if (email === '' || !email.includes('@')) return false
    const user = email.substring(0, email.indexOf('@'))
    const domain = email.substring(email.indexOf('@') + 1, email.length)
    return ((user.length >= 1)
        && (domain.length >= 3)
        && (user.search('@') === -1)
        && (domain.search('@') === -1)
        && (user.search(' ') === -1)
        && (domain.search(' ') === -1)
        && (domain.search('.') !== -1)
        && (domain.indexOf('.') >= 1)
        && (domain.lastIndexOf('.') < domain.length - 1))
}

const maskCPF = cpf => cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

const maskPhone = phone => {
    if (phone !== '')
        return phone.substring(0, 14).replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2')
}

const removeAccents = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, '')

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

const randomID = () => {
    const d = new Date()
    return `${Math.floor(Math.random() * 9999)}${d.getDay()}${d.getTime()}${d.getMilliseconds()}`
}

const getCep = async (zipcode) => {
    const config = {
        url: `https://viacep.com.br/ws/${zipcode}/json/`,
        init: {
            method: 'get'
        }
    }
    return await apiRequest(config)
}

const mobile = () => {
    let check = false;
    ((a) => {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
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
    searchEmJSON,
    randomID,
    getCep,
    mobile
}
