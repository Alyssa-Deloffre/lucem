function checkBody(body, keyArr) {
    for (const key of keyArr) {
        if (!body[key] || body[key] === '') {
            return false;
        }
    }
    return true;
}

module.exports = { checkBody };
