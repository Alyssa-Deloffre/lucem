const formatBirthdate = (date) => {
    let day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) day = "0" + day;
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};

const formatTime = (time) => {
    return time.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
    });

}
export {formatBirthdate, formatTime}