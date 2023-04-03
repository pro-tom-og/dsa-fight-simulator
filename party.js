class Party{

    fighters = [];
    fightersNextRound = [];
    name;
    callback = function(){};
    opposingParty;



    addOpposingParty(party)
    {
        this.opposingParty = party;
    }

    getOpposingParty(party)
    {
        return this.opposingParty;
    }


    constructor(name,callback) {
        this.name = name;
        if(typeof callback === 'function')
        {
            this.callback = callback;
        }
    }

    getStanding()
    {
        let s = ' Unsere Kämpfer: ';
        let standing = [];
        let a;
        for(a in this.fighters)
        {
            if(this.fighters[a].isAlive()){
                standing.push(this.fighters[a]);
            }
        }
        return standing;

    }


    getNextOpponent(opponentFor)
    {
        let a ;
        // let randStack = this.fighters;
            let randStack = this.fighters
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
        for(a in randStack)
        {
            let fighter = randStack[a];
            // console.log("is "+fighter.name+" a valid oppponent for "+opponentFor.name+"?");
            if ( fighter.isAlive() && !fighter.hasEnemy())
            {
                return fighter;
            }
            else
            {
                // console.log(" "+fighter.name+" is NOT a valid opponent!");
            }
        }

        let standing = []
        randStack = this.fighters
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        for(a in randStack)
        {
            let fighter = randStack[a];
            if ( fighter.isAlive() )
            {
                standing.push(fighter);
            }
        }
        let amountOfFighters = standing.length;
        if(amountOfFighters==0)
        {
           throw {"msg":"noonestanding","looser":this,"winner":this.getOpposingParty()};
        }
        let random = roll(amountOfFighters);
        let opponent = standing[random-1];
        return opponent;
    }

    addMember(fighter)
    {
        this.adaptName(fighter,0);
        fighter.addParty(this);
        fighter.addReportCallback(this.callback);
        this.fighters.push(fighter);
    }

    adaptName(fighter ,count)
    {
        // let count =0;
        let hit = false
        let appendix = '';
        if(count>0)
        {
            appendix=' '+count;
        }
        for(let a in this.fighters)
        {

            if(this.fighters[a].name==fighter.name+appendix)
            {
                hit = true;
                count++;
            }
        }

        if(!hit && count>0 )
        {
            fighter.name=fighter.name+appendix;
            return;
        }
        if(count>0 )
        {
            this.adaptName(fighter,count)
        }

    }

     getMember()
    {

        return this.fighters;

    }
}