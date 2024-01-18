//has been set to drop in nearest container
var roleAttacker = {

    /** @param {Creep} creep **/
    
    run: function(creep) {
        //static attack zones parking locations
        //Essentally standing guard at this location
        var attackZone = new RoomPosition(13,5,'W3S30');
        //check if creep is in assigned room or not
        if(creep.pos.roomName != attackZone.roomName){
            creep.moveTo(attackZone,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }else{
            //if creep is in the right room, then check for hostiles and attack
            var closestHostile = null;
            var closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if(closestHostile){
                //intended logic not dynamic yet, but the idea is that a creep will only attack within a certain range, have not worked out the kinks so set to 100 so that they will attack anything hostile in the room.
                if(creep.pos.inRangeTo(closestHostile.pos,100) && creep.memory.number >= 1) {
                    if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                        creep.moveTo(closestHostile,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    };
                    //exclusive logic to leave a single creep in guarded room for defense
                }else if(closestHostile && creep.memory.number == 0) {
                    if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                        creep.moveTo(closestHostile,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    };
                }
                //if no hostile creeps, check for hostile structures
            }
            if(!(closestHostile)){
                var closestHostileStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_CONTROLLER);
                    }
                });
                if(closestHostileStructure) {
                    if(creep.attack(closestHostileStructure) == ERR_NOT_IN_RANGE){
                        creep.moveTo(closestHostileStructure,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    };
                }
            }

            //if there are no hostile creeps or structures then look for hostile construction sites and run them over
            if(!(closestHostile) && !(closestHostileStructure)){
                var closestHostileStructure = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES);
                if(closestHostileStructure) {
                    creep.moveTo(closestHostileStructure,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }else{
                    creep.moveTo(attackZone,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }
            }
        }
	}
};

module.exports = roleAttacker;