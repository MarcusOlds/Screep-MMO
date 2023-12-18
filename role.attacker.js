//has been set to drop in nearest container
var roleAttacker = {

    /** @param {Creep} creep **/
    
    run: function(creep) {
        /**
        if(creep.memory.zone == 0){
            var attackZone = new RoomPosition(41,2,'E41N51');
        }else if(creep.memory.zone == 1){
            var attackZone = new RoomPosition(41,2,'E41N51');
        }else if(creep.memory.zone == 2){
            var attackZone = new RoomPosition(41,2,'E41N51');
        }else{
            var attackZone = new RoomPosition(41,2,'E41N51');
        }**/
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
        }*/
        if(creep.memory.attack){
            var attackZone = new RoomPosition(47,45,'W4S26');
        }
        if(creep.pos.roomName != attackZone.roomName){
            creep.moveTo(attackZone,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }else{
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile){
                if(creep.pos.inRangeTo(closestHostile.pos,100) && creep.memory.number >= 1) {
                    if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                        creep.moveTo(closestHostile,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    };
                }else if(closestHostile && creep.memory.number == 0) {
                    if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                        creep.moveTo(closestHostile,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    };
                }
            }else{
                var closestHostileStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                if(closestHostileStructure) {
                    if(creep.attack(closestHostileStructure) == ERR_NOT_IN_RANGE){
                        creep.moveTo(closestHostileStructure,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    };
                }
            }

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