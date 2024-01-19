var harvestTarget = require('harvest.target');
var roleTower = {
    /** @param {Creep} creep **/
    run: function(tower,wallStrengthGoal,rampartStengthGoal) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => creep.getActiveBodyparts(HEAL) > 0});
        if(target) {
            tower.attack(target);
        };
        if(!(target)){
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                tower.attack(target);
            }else{
                var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) && structure.hits < structure.hitsMax) || 
                                            ((structure.structureType == STRUCTURE_WALL && structure.hits < wallStrengthGoal && structure.hits != structure.hitsMax) ||
                                            (structure.structureType == STRUCTURE_RAMPART && structure.hits < rampartStengthGoal && structure.hits != structure.hitsMax)))
                });
                if(target) {
                    tower.repair(target);
                }
            }
        }
        if(target){
            console.log("tower in room " + target.pos.roomName + " active")
            Memory.minMaxes.working = true;
        }
	},

    increaseMinMaxes: function(){
        if(Memory.minMaxes.wallStrengthGoal <= 300000000){
            Memory.minMaxes.wallStrengthGoal = Memory.minMaxes.wallStrengthGoal + 200;
            console.log('minMaxes increased for walls');
        };
        if(Memory.minMaxes.rampartStengthGoal <= 300000000){
            Memory.minMaxes.rampartStengthGoal = Memory.minMaxes.rampartStengthGoal + 100;
            console.log('minMaxes increased for Ramparts');
        }
    }
};
module.exports = roleTower;