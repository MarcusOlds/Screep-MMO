var market = {
    findSellTransaction: function(resource){
        const energyCost = Memory.energyCost;
        const targetRoom = "W3S26";
        const amountToBuy = 1000;
        var orders = [];
        //get the average cost of the resource
        resourceHistory = Game.market.getHistory(resource);
        averagePrice = resourceHistory[resourceHistory.length-1].avgPrice;
        console.log(JSON.stringify(resource + " " + averagePrice))
        /*
        allOrders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});
        for(let i=0; i<allOrders.length;i++){
            const transferEnergyCost = Game.market.calcTransactionCost(
                amountToBuy, targetRoom, allOrders[i].roomName);
            transferCost = transferEnergyCost * energyCost
            profit = ((averagePrice - allOrders[i].price) * amountToBuy) - transferCost
            if(allOrders[i].price <= averagePrice && profit > 0){
                allOrders[i].profit = profit;
                allOrders[i].transferCost = transferCost;
                orders.push(allOrders[i]);
            }
        }
        return orders;
        */
    },
    getPriceOfEnergy: function(){
        energyHistory = Game.market.getHistory(RESOURCE_ENERGY);
        Memory.energyCost = energyHistory[14].avgPrice;
    }
}
module.exports = market;