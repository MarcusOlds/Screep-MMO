var harvestTarget = require('harvest.target');
var roleTower = {
    /** @param {Creep} creep **/
    run: function(tower,wallStrengthGoal,rampartStengthGoal) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }else{
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (((structure.structureType != STRUCTURE_WALL && 
                                        structure.structureType != STRUCTURE_RAMPART) && 
                                        structure.hits < structure.hitsMax) || 
                                        ((structure.structureType == STRUCTURE_WALL && 
                                        structure.hits < wallStrengthGoal) ||
                                        (structure.structureType == STRUCTURE_RAMPART &&
                                        structure.hits < rampartStengthGoal)))
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }
	}
};
module.exports = roleTower;