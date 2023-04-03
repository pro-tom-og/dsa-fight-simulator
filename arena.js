class Arena{

    rounds = 0;
    maxRounds = 150;
    fighters =[];
    partyA;
    partyB;
    winner;
    looser;

    currentFighterStack;
    callback = function(){};


    constructor (callback)
    {
        if(typeof callback === 'function')
        {
            this.callback = callback;
        }
    }
    addPartyA(party)
    {
        this.partyA = party;
    }

    addPartyB(party)
    {
        this.partyB = party;
    }

    fight()
    {
        console.log(this);
        this.pairEnemies();
        this.currentFighterStack = this.getFighterStack();
        this.fightRound();
    }

    pairEnemies()
    {
        // this.partyB.pair(this.partyA);
        this.partyB.addOpposingParty(this.partyA);
        // this.partyA.pair(this.partyB);
        this.partyA.addOpposingParty(this.partyB);


    }

    report(channel,obj)
    {
        Arsenal.log(channel,obj);
        if(channel=="Runde")
        {
            this.callback({'channel':"arena","arena":this,"action":"round","msg":obj})
        }

    }

    fightRound()
    {
        let stack = this.currentFighterStack;
        let nextStack = [];
        this.rounds++;
        if(this.rounds > this.maxRounds)
        {
            return;
        }
        this.report("Runde",this.rounds);
        let fighter;
        for(let a in stack)
        {
            fighter = stack[a];
            fighter.nextRound();
        }
        try{
            for(let a in stack)
            {
                fighter = stack[a];
                if(fighter.hasAction())
                {
                    fighter.action();
                    nextStack.push(fighter);
                }
            }
        }catch(e )
        {
            if( e.msg !="noonestanding")
            {
                throw e;
            }
            Arsenal.log(e.looser.name+ " hat verloren");
            this.winner = e.winner;
            this.looser = e.looser;
            this.callback({"channel":"arena","arena":this,"type":"end","msg":e.looser.name+ " hat verloren"});
            return e.party;

        }
        this.currentFighterStack = nextStack;
        var that = this;
        requestAnimationFrame(function(){that.fightRound()});


    }

    getFighterStack()
    {
        let stack = [];
        stack = stack.concat(this.partyA.getMember());
        stack = stack.concat(this.partyB.getMember());
        return stack;
    }


}