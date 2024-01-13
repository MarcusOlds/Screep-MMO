/*
 * any room specific names and locations here will need to be changed out for generic use, I will eventually code these all to be dynamic once I have completed the logic using hard coded rooms and locations.
 * memory.role = string
 * memory.number = int
 * memory.needsAssignment = bool (This will start as true and switch once assignment below is made)
 */
var buildScreeps = {
    run: function(role, numRole,spawnName,energyAvailableInRoom,homeRoom,expansionScreep) {
        //get the number of screeps in role and room
        var screepsInRole = _.filter(Game.creeps, (creep) => creep.memory.role == role &&
        creep.memory.homeroom == homeRoom);
        //if creeps in role are not equal to the number desired then log to console
        if(screepsInRole.length != numRole){
            console.log(screepsInRole.length + '/' + numRole + ' ' + role);
        }
        if(screepsInRole.length < numRole) {
            //set body parts of screep depending on role
            switch(role){
                case 'attacker':
                    var bodyParts = [];
                    if(energyAvailableInRoom >= 1800){
                        var workParts = 0;
                        energyLeft = energyAvailableInRoom;
                        while (energyLeft >= 140 && workParts <= 50){
                            bodyParts.push(TOUGH,ATTACK,MOVE);
                            energyLeft = energyLeft - 140;
                            workParts = workParts + 3
                        }
                    }
                    break;
                case 'healer':
                    var bodyParts = [];
                    var energyLeft = energyAvailableInRoom;
                    if(energyAvailableInRoom > 1800){
                        while (energyLeft >= 550 && bodyParts.length <= 50){
                            bodyParts.push(HEAL,HEAL,MOVE);
                            energyLeft = energyLeft - 550;
                        }
                    }
                    break;
                case 'builder':
                    //dynamic sizing of builders to reduce trips needed for building
                    var bodyParts = [];
                    var energyLeft = energyAvailableInRoom;
                    if(energyAvailableInRoom > 300){
                        while (energyLeft >= 250 && bodyParts.length <= 50){
                            bodyParts.push(WORK,CARRY,CARRY,MOVE);
                            energyLeft = energyLeft - 250;
                        }
                    }else{
                        bodyParts.push(WORK,CARRY,MOVE);
                    }
                    break; 
                case 'claimer':
                    var bodyParts = [];
                    var energyLeft = energyAvailableInRoom
                    if(energyAvailableInRoom > 650){
                        bodyParts.push(MOVE);
                        energyLeft = energyLeft - 50;
                        var workParts = 0;
                        while (energyLeft >= 600 && workParts < 2){
                            bodyParts.push(CLAIM);
                            energyLeft = energyLeft - 600;
                            workParts++
                        }                        
                    }else{
                        bodyParts.push(CLAIM,MOVE);
                    }

                    break;
                case 'harvester':
                    var bodyParts = [WORK,WORK,WORK,CARRY,MOVE];
                    break;
                case 'drop harvester':
                case 'mineral harvester':
                    var bodyParts = [];
                    var energyLeft = energyAvailableInRoom;
                    //dynamic production of harvest to ensure no break down in harvesting and eventual colony fallout
                    if(energyAvailableInRoom > 300){
                        bodyParts.push(MOVE);
                        energyLeft = energyLeft - 50;
                        while (energyLeft >= 100 && bodyParts.length <= 50){
                            bodyParts.push(WORK);
                            energyLeft = energyLeft - 100;
                        }
                    }else{
                        bodyParts.push(WORK,WORK,MOVE);
                    }
                    break;
                case 'maintainer':
                    var bodyParts = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
                    break;
                case 'stocker':
                case 'towerstocker':
                case 'extensionstocker':
                    var bodyParts = [];
                    var energyLeft = energyAvailableInRoom;
                    //dynamic Production of Stockers to ensure no break down of economy and colony fallout
                    if(energyAvailableInRoom > 300){
                        while (energyLeft >= 150 && bodyParts.length <= 50){
                            bodyParts.push(CARRY,CARRY,MOVE);
                            energyLeft = energyLeft - 150;
                        }
                    }else{
                        bodyParts.push(CARRY,CARRY,CARRY,CARRY,MOVE,MOVE);
                    }
                    
                    break;
                case 'upgrader':
                    var bodyParts = [];
                    var energyLeft = energyAvailableInRoom;
                    //dynamic Production of Stockers to ensure no break down of economy and colony fallout
                    if(energyAvailableInRoom > 400){
                        while (energyLeft >= 200 && bodyParts.length <= 50){
                            bodyParts.push(WORK,CARRY,MOVE);
                            energyLeft = energyLeft - 200;
                        }
                    }else{
                        var bodyParts = [WORK,CARRY,MOVE];
                    }
                    break;
            }
            //set energy Needs
            //not really used right now but has intended uses in the future
            //example, if I know I need a drop harvester and a stocker to restart economy after a fight, calculating the costs of both before commiting to the body parts above will be useful
            //in order to save enough energy to build both back to back
            var energyNeeded = 0;
            bodyParts.forEach(function (item, index){
                switch(item){
                    case 'move':
                        energyNeeded = energyNeeded + 50
                        break;
                    case 'work':
                        energyNeeded = energyNeeded + 100
                        break;
                    case 'carry':
                        energyNeeded = energyNeeded + 50
                        break;
                    case 'attack':
                        energyNeeded = energyNeeded + 80
                        break;
                    case 'ranged_attack':
                        energyNeeded = energyNeeded + 150
                        break;
                    case 'heal':
                        energyNeeded = energyNeeded + 250
                        break;
                    case 'claim':
                        energyNeeded = energyNeeded + 600
                        break;
                    case 'tough':
                        energyNeeded = energyNeeded + 10
                        break;
                }
            });
            if(energyAvailableInRoom >= energyNeeded) {
                //set Memory
                //role based Memory
                switch(role){
                    case 'attacker':
                        var memory = {role: 'attacker'};
                        break;
                    case 'healer':
                        var memory = {role: 'healer'};
                        break;
                    case 'builder':
                        var memory = {role: 'builder'};
                        memory['building'] = false;
                        memory['pickingup'] = false;
                        break; 
                    case 'claimer':
                        var memory = {role: 'claimer'};
                        break;
                    case 'harvester':
                        var memory = {role:'harvester'};
                        break;
                    case 'drop harvester':
                    case 'mineral harvester':
                        if(role == 'drop harvester'){
                            var memory = {role: 'drop harvester'};
                            memory['subrole'] = "energy";
                        }
                        if(role == 'mineral harvester'){
                            var memory = {role: 'mineral harvester'};
                            memory['subrole'] = "mineral";
                        }
                        break;
                    case 'maintainer':
                        var memory = {role: "maintainer"};
                        memory['building'] = false;
                        memory['pickingup'] = false;
                        break;
                    case 'stocker':
                    case 'towerstocker':
                    case 'extensionstocker':
                        if(role == 'stocker'){
                            var memory = {role: "stocker"};
                        }
                        if(role == 'towerstocker'){
                            var memory = {role: 'towerstocker'}
                        }
                        if(role == 'extensionstocker'){
                            var memory = {role: 'extensionstocker'}
                        }
                        
                        memory['delivering'] = false;
                        memory['pickingup'] = false;
                        //set subrole (deliver Focus)
                        if(role == 'stocker'){
                            memory['subrole'] = "storage";
                            break;
                        }
                        if(role == 'towerstocker'){
                            memory['subrole'] = 'tower';
                            break;
                        }
                        if(role == 'extensionstocker'){
                            memory['subrole'] = "extension";
                            break;
                        }
                        break;
                    case 'upgrader':
                        var memory = {role: "upgrader"};
                        memory['upgrading'] = false;
                        switch(spawnName){
                            case 'Spawn1':
                                memory['controllerid'] = '5bbcacba9099fc012e636190'
                                break;
                            case 'Spawn2':
                                memory['controllerid'] = '5bbcacba9099fc012e63618e'
                                break;
                        }
                        break;
                }
                //set subrole
                //set the number of the screep in its role
                var screepsInRoleNumbersExisting = [];
                screepsInRole.forEach(function (item, index){
                    screepsInRoleNumbersExisting.push(item.memory.number);
                });
                for (var i = 0; i <= 20; i++){
                    var found = screepsInRoleNumbersExisting.find((element) => element == i)
                    if(found == undefined){
                        memory['number'] = i;
                        //set I to huge number to stop for loop to escape the for loop
                        //this stops the assigned number from always being the largest unassigned number which is the inverse of what I want
                        //probably can be handled better by reversing the logic of the for loop but then that would equal extra computation time
                        //dirty is faster in this scenario
                        i = i + 1000000;
                    }
                }

                //generic all creeps memory
                memory['needsAssignment'] = true;
                memory["harvestinfo"] = {harvesting: false, harvestsource: 0};
                memory['homeroom'] = homeRoom;
                if(expansionScreep){
                    memory['expansioncreep']  = true;
                }else{
                    memory['expansioncreep'] = false;
                }
                //final creation of memory 
                var memoryFinal = {memory};
                
                if(screepsInRole.length < numRole && energyAvailableInRoom >= energyNeeded) {
                    var newName = role + Game.time;
                    Game.spawns[spawnName].spawnCreep(bodyParts, newName, memoryFinal);
                }
            }
        }
	},
    buildExpansionCreep: function(room){
        expansionRoom = Memory.ExpansionCreeps;
        var energyAvailableInRoom = Game.spawns[expansionRoom.spawnName].room.energyAvailable;
        this.run('harvester', expansionRoom.numHarvesters,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run('builder', expansionRoom.numBuilders,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("upgrader",expansionRoom.numUpgraders,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("maintainer", expansionRoom.numMaintainers, expansionRoom.spawnName,energyAvailableInRoom,room,true);
        this.run('claimer', expansionRoom.numClaimers,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("attacker", expansionRoom.numAttackers, expansionRoom.spawnName,energyAvailableInRoom,room,true);
        this.run('drop harvester', expansionRoom.numDropHarvesters,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("stocker", expansionRoom.numStockers,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("towerstocker", expansionRoom.numTowerStockers,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("extensionstocker", expansionRoom.numExtensionStockers,expansionRoom.spawnName, energyAvailableInRoom,room,true);
        this.run("healer", expansionRoom.numHealers,expansionRoom.spawnName, energyAvailableInRoom,room,true);
    }
};

module.exports = buildScreeps;