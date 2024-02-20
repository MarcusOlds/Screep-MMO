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
                switch(creep.memory.homeroom){
                    case 'W3S27':
                        creep.memory.harvestinfo.harvesting = true;
                        creep.memory.harvestinfo.harvestsource = 1;
                        creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(37,36,'W3S27');
                        creep.memory.harvestinfo.harvestsourceid = '5bbcb2b940062e4259e93ced';
                        break;
                    case 'W3S26':
                        creep.memory.harvestinfo.harvesting = true;
                        creep.memory.harvestinfo.harvestsource = 2;
                        var count = 0;
                        for (var name in Game.creeps){
                            var screep = Game.creeps[name];
                            if(screep.memory.homeroom == 'W3S26' && screep.memory.harvestinfo.harvestsource == 2 && screep.memory.subrole == 'mineral'){
                                count++
                            }
                        }
                        console.log(JSON.stringify(count));
                        if(count == 1){
                            creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(44,12,'W3S26');
                        }
                        if(count == 2){
                            creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(43,11,'W3S26');
                        }
                        if(count == 3){
                            creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(43,12,'W3S26');
                        }
                        creep.memory.harvestinfo.harvestsourceid = '5bbcb2b940062e4259e93cec';
                        break;
                    case 'W2S29':
                        creep.memory.harvestinfo.harvesting = true;
                        creep.memory.harvestinfo.harvestsource = 3;
                        var count = 0;
                        for (var name in Game.creeps){
                            var screep = Game.creeps[name];
                            if(screep.memory.homeroom == 'W2S29' && screep.memory.harvestinfo.harvestsource == 3 && screep.memory.subrole == 'mineral'){
                                count++
                            }
                        }
                        if(count == 1){
                            creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(5,13,'W2S29');
                        }
                        if(count == 2){
                            creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(6,13,'W2S29');
                        }
                        creep.memory.harvestinfo.harvestsourceid = '5bbcb2c340062e4259e93d5b';
                        break;
                    default:
                        creep.memory.harvestinfo.harvesting = false;
                        creep.memory.harvestinfo.harvestsource = -1;
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
                var numHarvestSix = 0;
                var numHarvestSeven = 0;

                //count the harvesters assigned to each location
                for (var name in Game.creeps){
                    var screep = Game.creeps[name];
                    if(screep.memory.subrole == "energy"){
                        switch (screep.memory.harvestinfo.harvestsource){
                            case 0:
                                numHarvestOne++
                                break;
                            case 1:
                                numHarvestTwo++
                                break;
                            case 2:
                                numHarvestThree++
                                break;
                            case 3:
                                numHarvestFour++
                                break;
                            case 4:
                                numHarvestFive++
                                break;
                            case 5:
                                numHarvestSix++
                                break;
                            case 6:
                                numHarvestSeven++
                                break;
                        }
                    }
                }
                //console.log('number of screeps mining from second source: ' + numHarvestOne)
                //assigned by distance from primary room starting at closest source
                //can set the number of assigned harvesters for each site
                //I have designed this currently for a single creep assigned to each site with a specific location a drop harvester will park, but with minor tweeking of this section and the section below this can be utilized for any harvester style
                if(numHarvestOne < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 0;
                }else if(numHarvestTwo < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 1;
                }else if(numHarvestThree < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 2;          
                }else if(numHarvestSix < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 5;          
                }else if(numHarvestSeven < 1){
                    creep.memory.harvestinfo.harvesting = true;
                    creep.memory.harvestinfo.harvestsource = 6;          
                }else{
                    creep.memory.harvestinfo.harvesting = false;
                    creep.memory.harvestinfo.harvestsource = -1;
                }

                //set the creeps harvest location and source ID to memory
                if(creep.memory.harvestinfo.harvestsource == 0){
                    creep.memory.homeroom = 'W3S27';
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(14,35,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e636191';
                }else if(creep.memory.harvestinfo.harvestsource == 1){
                    creep.memory.homeroom = 'W3S27';
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(8,39,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e636192';
                }else if(creep.memory.harvestinfo.harvestsource == 2){
                    creep.memory.homeroom = 'W3S26';
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(35,31,'W3S26');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacba9099fc012e63618d';
                }else if(creep.memory.harvestinfo.harvestsource == 5){
                    creep.memory.homeroom = 'W2S29';
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(44,6,'W2S29');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacc89099fc012e63631c';
                }else if(creep.memory.harvestinfo.harvestsource == 6){
                    creep.memory.homeroom = 'W2S29';
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(47,16,'W2S29');
                    creep.memory.harvestinfo.harvestsourceid = '5bbcacc89099fc012e63631e';
                }else if(creep.memory.harvestinfo.harvestsource == -1){
                    creep.memory.harvestinfo.harvestsourcelocation = new RoomPosition(25,25,'W3S27');
                    creep.memory.harvestinfo.harvestsourceid = null;
                }
                break;
        }
	}
};

module.exports = harvestTarget;