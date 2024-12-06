const expect = require("chai").expect;
const savePassengerMW = require("../../../../middleware/passenger/savePassengerMW");

describe("savePassenger middleware ", function () {
  it("should redirect to /passenger/:busid if everything is ok", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    mw(
      {
        body: {
          p_name: "Józsi",
          dateOfBirth: "2000.01.01.",
          city: "Budapest",
          hairColor: "kék",
        },
      },
      {
        locals: {
          bus: {
            _id: "busid",
          },
          passenger: {
            save: () => {
              return Promise.resolve();
            },
          },
        },
        redirect: (where) => {
          expect(where).to.be.eql("/passenger/busid");
          done();
        },
      },
      (err) => {
        //no next
      }
    );
  });

  it("should call next with error if there is a db error", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    mw(
      {
        body: {
          p_name: "Józsi",
          dateOfBirth: "2000.01.01.",
          city: "Budapest",
          hairColor: "kék",
        },
      },
      {
        locals: {
          bus: {
            _id: "busid",
          },
          passenger: {
            save: () => {
              return Promise.reject("adatbázishiba");
            },
          },
        },
        redirect: (where) => {},
      },
      (err) => {
        expect(err).to.be.eql("adatbázishiba");
        done();
      }
    );
  });

  it("should set res.locals.passenger with a passenger object created by the MW", function (done) {
    class PassengerMockModel {
      save = () => {
        return Promise.resolve();
      };
    }

    const mw = savePassengerMW({
      PassengerModel: PassengerMockModel,
    });

    const reqMock = {
      body: {
        p_name: "Józsi",
        dateOfBirth: "2000.01.01.",
        city: "Budapest",
        hairColor: "kék",
      },
    };

    let resMock = {
      locals: {
        bus: {
          _id: "busid",
        },
      },
      redirect: (where) => {
        expect(resMock.locals.passenger.name).to.be.eql(reqMock.body.p_name);
        expect(resMock.locals.passenger.dateOfBirth).to.be.eql(reqMock.body.dateOfBirth);
        expect(resMock.locals.passenger.city).to.be.eql(reqMock.body.city);
        expect(resMock.locals.passenger.hairColor).to.be.eql(reqMock.body.hairColor);
        expect(resMock.locals.passenger._rajtavan).to.be.eql(resMock.locals.bus._id);
        expect(where).to.be.eql("/passenger/busid");
        done();
      },
    };

    mw(reqMock, resMock, (err) => {
      //no next
    });
  });

  it("should call next if req.body.p_name is undefined", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    const reqMock = {
      body: {
        //p_name: "Józsi",
        dateOfBirth: "2000.01.01.",
        city: "Budapest",
        hairColor: "kék",
      },
    };

    mw(reqMock, {}, (err) => {
      expect(err).to.be.eql(undefined);
      expect(reqMock.body.p_name).to.be.eql(undefined);
      done();
    });
  });

  it("should call next if req.body.dateOfBirth is undefined", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    const reqMock = {
      body: {
        p_name: "Józsi",
        //dateOfBirth: "2000.01.01.",
        city: "Budapest",
        hairColor: "kék",
      },
    };

    mw(reqMock, {}, (err) => {
      expect(err).to.be.eql(undefined);
      expect(reqMock.body.dateOfBirth).to.be.eql(undefined);
      done();
    });
  });

  it("should call next if req.body.city is undefined", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    const reqMock = {
      body: {
        p_name: "Józsi",
        dateOfBirth: "2000.01.01.",
        //city: "Budapest",
        hairColor: "kék",
      },
    };

    mw(reqMock, {}, (err) => {
      expect(err).to.be.eql(undefined);
      expect(reqMock.body.city).to.be.eql(undefined);
      done();
    });
  });

  it("should call next if req.body.hairColor is undefined", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    const reqMock = {
      body: {
        p_name: "Józsi",
        dateOfBirth: "2000.01.01.",
        city: "Budapest",
        //hairColor: "kék",
      },
    };

    mw(reqMock, {}, (err) => {
      expect(err).to.be.eql(undefined);
      expect(reqMock.body.hairColor).to.be.eql(undefined);
      done();
    });
  });

  it("should call next if res.locals.bus is undefined", function (done) {
    const mw = savePassengerMW({
      PassengerModel: "valami",
    });

    const resMock = {
      locals: {},
    };

    mw(
      {
        body: {
          p_name: "Józsi",
          dateOfBirth: "2000.01.01.",
          city: "Budapest",
          hairColor: "kék",
        },
      },
      resMock,
      (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals.bus).to.be.eql(undefined);
        done();
      }
    );
  });
});
