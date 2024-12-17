const {handleChangeEmail, handleConnected} = require('./Signin');
const {DateCheck} = require('./components/DateCheck');



it('Handle change email', () => {
    const changeEmail = handleChangeEmail(email, password);

    expect(changeEmail).toBe()
});

it('Handle connected', () => {
    const connected = handleConnected(email, password, userType);

    expect(connected).toBe()
});

it('Date check', () => {
    const dateCheck = DateCheck(text, type);

    expect(dateCheck).toBe()
});