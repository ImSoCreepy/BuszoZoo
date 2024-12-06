const expect = require('chai').expect;
const getBusMW = require('../../../../middleware/bus/getBusMW');

describe('getBus middleware ', function () {

    it('should set res.locals.bus if bus is found', function (done) {
        const mw = getBusMW({
            BusModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: '1' });
                    return Promise.resolve("eredmény");
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                busid: '1'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.eql({ bus: 'eredmény' });
                done();
            });


    });

     /*it('should set res.locals.bus if bus is found', function () { //Promise megoldás
        return new Promise((resolve, reject) => {
            const mw = getBusMW({
                BusModel: {
                    findOne: (p1) => {
                        expect(p1).to.be.eql({ _id: '1' });  // Ellenőrzi a keresési paramétert
                        return Promise.resolve("eredmény");
                    }
                }
            });

            const resMock = {
                locals: {}
            };

            mw({
                params: {
                    busid: '1'
                }
            },
            resMock,
            () => {
                try {
                    expect(resMock.locals).to.eql({ bus: 'eredmény' });  // Ellenőrzi az eredményt
                    resolve(); // Ha sikerült, meghívja a resolve()-t
                } catch (err) {
                    reject(err);  // Ha hiba van, elkapja és átadja a reject()-t
                }
            });
        });
    });*/

    it('should call next with error if there is a db error', function (done) {
        const mw = getBusMW({
            BusModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: '1' });
                    return Promise.reject("adatbázishiba");
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                busid: '1'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql("adatbázishiba");
                done();
            });


    });

    it('should call next with custom error if bus is NOT found', function (done) {
        const mw = getBusMW({
            BusModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: '1' });
                    return Promise.resolve(undefined);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                busid: '1'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(Error('Bus not found', { status: 404 }));
                expect(resMock.locals).to.eql({});
                done();
            });


    });
});