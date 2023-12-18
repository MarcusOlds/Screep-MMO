//has been set to drop in nearest container
var roleAttacker = {

    /** @param {Creep} creep **/
    
    run: function(creep) {
        //static attack zones parking locations
        //Essentally standing guard at this location
        if(creep.memory.number == 0){
            //var attackZone = new RoomPosition(32,15,'W3S27');
            var attackZone = new RoomPosition(33,31,'W3S26');
        }
        if(creep.memory.number == 1){
            var attackZone = new RoomPosition(32,15,'W3S27');
        }
        if(creep.memory.number == 2){
            var attackZone = new RoomPosition(43,31,'W2S26');
        }
        //this code block was used in a failed invasion of a central node with NPC Creeps
        //the idea was to build up and invade in force automatically at a predicted number of attacker creeps
        //needs a lot of work
        /*
        if(creep.memory.number >= 2){
            var numOfAttackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
            if(numOfAttackers.length < 7){
                //waiting Area
                var attackZone = new RoomPosition(48,7,'W4S26');
            }else{
                //attack
                creep.memory.attack = true;
            }
        }
        if(creep.memory.attack){
            var attackZone = new RoomPosition(47,45,'W4S26');
        }
        */

        //check if creep is in assigned room or not
        if(creep.pos.roomName != attackZone.roomName){
            creep.moveTo(attackZone,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }else{
            //if creep is in the right room, then check for hostiles and attack
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
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
            }else{
                var closestHostileStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
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