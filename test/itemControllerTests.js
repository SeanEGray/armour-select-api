const should = require('should'),
    sinon = require('sinon');
describe ('Item controller tests', function() {
    describe ('Post', function() {
        it('should not allow an empty name on post', function() {
            var itemModel = function(item) {this.save = function(){}};
            
            var req = {
                body: {
                    slot: 'Torso200',
                    colour: 'White'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var itemController = require('../controllers/itemController')(itemModel);

            itemController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args);
            res.send.calledWith('name is required.').should.equal(true);
        })
    })
})