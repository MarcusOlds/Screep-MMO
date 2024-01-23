var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //set variables
        claimRoom = creep.memory.homeroom;
        currentRoom = creep.pos.roomName;
        if (currentRoom == claimRoom){
            var target = creep.room.controller
            if(creep.reserveController(target) == ERR_NOT_IN_RANGE || creep.reserveController(target) == ERR_INVALID_TARGET){
                creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
            }
        }else{
            var claimLocation = new RoomPosition(25,25, claimRoom);
            creep.moveTo(claimLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }
	}
};

module.exports = roleClaimer;