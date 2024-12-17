const formatBirthdate = (date) => {
    let day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) day = '0' + day;
    return `${day}/${month < 10 ? '0' + month : month}/${year}`;
};

const dateFormat = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${day}/${month}`;
};

const formatTime = (time) => {
    console.log('time : ', time);
    return time.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getUserAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    const currentYear = today.getFullYear();

    let age = currentYear - birth.getFullYear();
    if (
        today.getMonth() > birth.getMonth() &&
        today.getDate() > birth.getDate()
    ) {
        age--;
    }
    return age;
};

export { formatBirthdate, formatTime, dateFormat, getUserAge };
