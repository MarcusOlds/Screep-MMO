/** home name E43N52 **/
/**harvestsource Meaning
 * 
 * 0 = home double
 * 1 = home single
 * 2 = Left Room Quadruple
 * 
 * **/
//not yet leveraged
var getLocation = require('location.variables');
//exported module contents
var harvestTarget = {
    run: function(creep, sourceQueue) {
        subRole = creep.memory.subrole
        switch(subRole){
            case 'mineral':
                //set counts for each havest location
                var numHarvestOne = 0;
                
                //count the harvesters assigned to each location
                for (var name in Game.creeps){
                    var screep = Game.creeps[name];
                    if(screep.memory.harvestinfo.harvesting == true && screep.memory.harvestinfo.harvestsource == 1 && screep.memory.subrole == "mineral"){
                        numHarvestOne++
                    }
                    
                }
                if(numHarvestOne < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 1;
                }else{
                    creep.memory.harvestinfo.harvesting = false;
                    creep.memory.harvestinfo.harvestsource = -1;
                }

                //set the creeps harvest location and source ID to memory
                if(creep.memory.harvestinfo.harvestsource == 1){
                    
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(37,36,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcb2b940062e4259e93ced';
                }
                break;
            case 'energy':
                //console.log("Screep Calling for new target: " + creep)
                //set counts for each havest location
                var numHarvestOne = 0;
                var numHarvestTwo = 0;
                var numHarvestThree = 0;
                var numHarvestFour = 0;
                var numHarvestFive = 0;

                //count the harvesters assigned to each location
                for (var name in Game.creeps){
                    var screep = Game.creeps[name];
                    if(screep.memory.harvestinfo.harvesting == true && screep.memory.harvestinfo.harvestsource == 1){
                        numHarvestOne++
                    }
                    if(screep.memory.harvestinfo.harvesting == true && screep.memory.harvestinfo.harvestsource == 2){
                        numHarvestTwo++
                    }
                    if(screep.memory.harvestinfo.harvesting == true && screep.memory.harvestinfo.harvestsource == 0){
                        numHarvestThree++
                    }
                    if(screep.memory.harvestinfo.harvesting == true && screep.memory.harvestinfo.harvestsource == 3){
                        numHarvestFour++
                    }
                    if(screep.memory.harvestinfo.harvesting == true && screep.memory.harvestinfo.harvestsource == 4){
                        numHarvestFive++
                    }
                }
                //console.log('number of screeps mining from second source: ' + numHarvestOne)
                //assigned by distance from primary room starting at closest source
                //can set the number of assigned harvesters for each site
                //I have designed this currently for a single creep assigned to each site with a specific location a drop harvester will park, but with minor tweeking of this section and the section below this can be utilized for any harvester style
                if(numHarvestOne < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 1;
                }else if(numHarvestThree < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 0;
                }else if(numHarvestTwo < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 2;          
                }else if(numHarvestFour < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 3;          
                }else if(numHarvestFive < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 4;          
                }else{
                    creep.memory.harvestinfo.harvesting = false;
                    creep.memory.harvestinfo.harvestsource = -1;
                }

                //set the creeps harvest location and source ID to memory
                if(creep.memory.harvestinfo.harvestsource == 0){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(14,35,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e636191';
                }else if(creep.memory.harvestinfo.harvestsource == 1){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(8,39,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e636192';
                }else if(creep.memory.harvestinfo.harvestsource == 2){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(7,39,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e636192';
                }else if(creep.memory.harvestinfo.harvestsource == 3){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(35,31,'W3S26');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e63618d';
                }else if(creep.memory.harvestinfo.harvestsource == 4){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(43,32,'W2S26');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacc89099fc012e636313';
                }else if(creep.memory.harvestinfo.harvestsource == -1){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(25,25,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = null;
                }
                break;
        }
        
	}
};

module.exports = harvestTarget;