var harvestTarget = require('harvest.target');
var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.number == 0){
            if(creep.reserveController(Game.getObjectById('5bbcacc89099fc012e636317')) == ERR_NOT_IN_RANGE || creep.reserveController(Game.getObjectById('5bbcaf6a9099fc012e63a935')) == ERR_INVALID_TARGET){
                var claimLocation = new RoomPosition(7,10,'W2S27');
            }
        }
        if (creep.memory.number == 1){
            if(creep.reserveController(Game.getObjectById('5bbcaf599099fc012e63a7ac')) == ERR_NOT_IN_RANGE || creep.reserveController(Game.getObjectById('5bbcaf599099fc012e63a7ac')) == ERR_INVALID_TARGET){
                var claimLocation = new RoomPosition(38,16,'E41N52');
            }
        }
        creep.moveTo(claimLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
	}
};

module.exports = roleClaimer;