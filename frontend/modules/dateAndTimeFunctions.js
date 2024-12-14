const formatBirthdate = (date) => {
    let day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) day = "0" + day;
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};

export {formatBirthdate}