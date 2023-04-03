class Fighter
{
    enemies=[];
    name="alrik";
    paradeCounter=0;
    party;
    hitpoints=30;
    attack=14;
    parade=6;
    armor=2;
    initiative=5;
    maxParade=-3;

    weaponStats = { "w":1,"bonus":1} ;

    callback = function(){console.log("called")};

    addReportCallback(callback){
        if(typeof callback === 'function')
        {
            this.callback = callback;
            console.log("added callback to fighter");
        }
    }

    addParty(party){
        this.party = party;
    }

    constructor(conf) {
        this.name = conf?.name || "alrik";
        this.armor=conf?.armor || 2;
        this.attack=conf?.attack || 15;
        this.parade=conf?.parade || 6;
        this.hitpoints=conf?.hitpoints || 30;
        this.initiative = conf?.initiative || 2;
        this.weaponStats = conf?.weaponStats ||  { "w":1,"bonus":1} ;
    }

    setEnemy(enemy)
    {
        Arsenal.log(this.getName()+ " gets enemy "+enemy.getName());
        this.enemies.push(enemy);
    }

    getEnemy(){
        return this.enemies[0];
    }

    getName()
    {
        return this.name;
    }

    getInitiative(){
        return this.initiative;

    }

    hasAction()
    {
        if(this.hitpoints <=10)
        {

            return false;
        }
        return true;
    }

    isAlive()
    {
        if(this.hitpoints <=5)
        {

            return false;
        }
        return true;
    }

    hasEnemy()
    {
        return this.enemies.length!=0;
    }

    nextRound()
    {
        this.paradeCounter = 0;
    }

    removeEnemy(enemy)
    {
        // console.log("removing "+enemy.name+" from "+this.name);
        // let myEnemy = this.getEnemy();
        let IndexOfEnemyToRemove = this.enemies.indexOf(enemy);
        if(IndexOfEnemyToRemove>-1)
        {
// console.log("enemies party",this.enemy);
            this.enemies.splice(IndexOfEnemyToRemove, 1); // 2nd parameter means remove one item only
            this.setEnemy(this.party.getOpposingParty().getNextOpponent(this));
        }
    }

    action()
    {
        if(!this.hasEnemy())
        {
            this.setEnemy(this.party.getOpposingParty().getNextOpponent(this));
        }
        if(!this.getEnemy().isAlive())
        {
            this.removeEnemy(this.getEnemy());
            this.setEnemy(this.party.getOpposingParty().getNextOpponent(this));
        }
        this.hitEnemy();
    }

    calculateTp(weaponStats)
    {
        let hit = 0;
        for(let i=0;i<weaponStats.w;i++)
        {
            // Arsenal.log(this.weaponStats," roll "+i);
            hit+=roll(6)
        }
        hit+=weaponStats.bonus;
        // Arsenal.log("tp",this.weaponStats,hit);
        return hit;
    }

    hitEnemy()
    {
        let AttRoll = roll(20);
        if(AttRoll<=this.attack)
        {
            Arsenal.log(this.getName()+" schlägt zu ");
            let tp = this.calculateTp(this.weaponStats);

            this.getEnemy().isHit(this,tp)

        }
        else
        {
            Arsenal.log(this.getName()+" schlägt vorbei ");
        }
    }

    isHit(hitter,tp)
    {

        let ParadeSuccess = false;
        // Arsenal.log(this.name +" wird geschlagen.",this.hitpoints,this.armor);
        if(this.paradeCounter<=this.maxParade)
        {
            let PaRoll = roll(20);
            this.paradeCounter++;
            if( PaRoll>this.parade)
            {
                ParadeSuccess = true;
            }
        }


        if(!ParadeSuccess)
        {
            let hit = tp-this.armor;
            if(hit<1)
            {
                hit = 0;
            }

            // Arsenal.log("treffer mit", hit );
            this.hitpoints -= hit;
            // Arsenal.log(this.name+" was hit from "+this.enemy.name+" with "+tp+"TP ("+tp-this.armor+" SP)");
            Arsenal.log(hitter.getName()+" trifft "+this.getName()+" mit "+tp+"("+hit+" SP). "+this.getName()+" hat noch  "+this.hitpoints+" LE ");
            if(!this.isAlive())
            {
                this.callback({'channel':"fighter","fighter":this,"action":"dead","msg":this.getName()+" ist kampfunfähig. LE: "+this.hitpoints})
                Arsenal.log(this.getName()+" ist kampfunfähig. LE: "+this.hitpoints);
                hitter.removeEnemy(this);
            }
        }
        else
        {
            Arsenal.log(this.getName()+" hat "+hitter.getName()+" pariert ");
        }
    }


}