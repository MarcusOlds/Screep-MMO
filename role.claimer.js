var harvestTarget = require('harvest.target');
var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.homeroom == 'W3S28'){
            if(creep.reserveController(Game.getObjectById('5bbcacbb9099fc012e636195')) == ERR_NOT_IN_RANGE || creep.reserveController(Game.getObjectById('5bbcacbb9099fc012e636195')) == ERR_INVALID_TARGET){
                var claimLocation = new RoomPosition(25,19,'W3S28');
            }
        }
        if (creep.memory.homeroom == 'W3S29'){
            if(creep.reserveController(Game.getObjectById('5bbcacbb9099fc012e636198')) == ERR_NOT_IN_RANGE || creep.reserveController(Game.getObjectById('5bbcacbb9099fc012e636198')) == ERR_INVALID_TARGET){
                var claimLocation = new RoomPosition(21,35,'W3S29');
            }
        }
        creep.moveTo(claimLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
	}
};

module.exports = roleClaimer;