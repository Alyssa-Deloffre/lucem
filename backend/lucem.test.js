const request = require('supertest');
const therapists = require('./routes/therapists');

it('POST/patients', async() => {
    const res = await request(therapists)
    .post('/patients')
    .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(false);
    expect(res.body.message).toBe("Missing therapist token");
})


it('FINDONE/',)

    expect()
});

it()

    expect()
});