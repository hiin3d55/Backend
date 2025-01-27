const
    { closeConn, connect } = require("../config/db.server.config"),
    request = require('supertest'),
    app = require('../server');

beforeEach(async function() {
    const testDatabaseName = process.env.DATABASE_TEST_NAME;
    await closeConn(); // Disconnect from the app database
    await connect(testDatabaseName, true); // Connect to the test database
});


describe("Create forum user successfully", function() {
    it("should return: status 201", function(done) {
        request(app)
            .post('/api/v1/users')
            .send({
                username: 'Bob123',
                displayName: 'bob',
                email: 'bob420@hotmail.com',
                password: 'passwordbob'
            })
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
    });
});

describe("Create forum user test unsuccessfully - missing attribute 'email'", function() {
    it("should return: status 400", function(done) {
        request(app)
            .post('/api/v1/users')
            .send({
                username: 'Tim123',
                displayName: 'Tim',
                password: 'passwordtim'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
    });
});

describe("Create forum user test unsuccessfully - attribute length requirement not met", function() {
    it("should return: status 400", function(done) {
        request(app)
            .post('/api/v1/users')
            .send({
                username: 'Yi123',
                displayName: 'Yi',
                email: 'yi14123@gmail.com',
                password: 'passwordtim'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
    });
});

describe("Log in forum user dummy test", function() {
    it("should return: { dummyTest: 'userLogin() dummy test passes' }", function(done) {
        request(app)
            .post('/api/v1/users/login')
            .send({ dummyTestInput: 'this text is useless' })
            .expect({ dummyTest: 'userLogin() dummy test passes' })
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
    });
});

describe("Log out forum user dummy test", function() {
    it("should return: { dummyTest: 'userLogout() dummy test passes' }", function(done) {
        request(app)
            .post('/api/v1/users/logout')
            .send({ dummyTestInput: 'this text is useless' })
            .expect({ dummyTest: 'userLogout() dummy test passes' })
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
    });
});

describe("View forum user by ID successfully", function() {
    it("should return: status 200", function(done) {
        request(app)
            .post('/api/v1/users')
            .send(
                {
                    username: 'Bob1234',
                    displayName: 'bob',
                    email: 'bob420@hotmail.com',
                    password: 'passwordbob'
                })
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                request(app)
                    .get(`/api/v1/users/${res.body.user._id}`)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) done(err);
                        done();
                    });
            });
    });
});

describe("View forum user by ID unsuccessfully", function() {
    it('should return a 404 response for invalid id',function(done) {
        request(app)
            .get('/api/v1/users/x')
            .expect(404)
            .end(function(err, res) {
                if (err) done(err);
                done();
            });

    });
});

describe("Update forum user by ID dummy test", function() {
    it("should return: { dummyTest: 'userUpdateById() dummy test passes' }", function(done) {
        request(app)
            .patch('/api/v1/users/:id')
            .send({ dummyTestInput: 'this text is useless' })
            .expect({ dummyTest: 'userUpdateById() dummy test passes' })
            .end(function(err, res) {
                if (err) done(err);
                done();
            });
    });
});
