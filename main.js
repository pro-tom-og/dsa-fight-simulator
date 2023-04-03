

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

function alertUs(message, type)
{
    let wrapper = [
           `<div class="alert alert-${type} alert-dismissible" role="alert">`,
           `     <div>${message}</div>`,
           '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
           '</div>'
       ].join('')
       $("#liveAlertPlaceholder").html(wrapper);
    // return timeoutPromise(1000);
}

function someStats()
{
    let stats = new Stats();

    // let result =  alertUs("fighting live!, Please wait!","warning");
    for(let c=0;c< 1; c++)
    {
        stats.run();

    }

    // return timeoutPromise(1000);
}


function log(a,b,c)
{
    console.log(a,b,c);

}


let rollStats = {"6":[],"20":[]};
function roll(max)
{
    let result =  Math.floor(Math.random() * max) +1;

    rollStats[max]?.push(result);
    return result;
}

function showRandom()
{
    let stats = {};
    let res = rollStats[20];
    for(let i in res)
    {
        if(!stats[res[i]])
        {stats[res[i]]=0;}
        stats[res[i]]++;
    }
    console.log(stats);

}

function uh(winner)
{
    let e;
    let a = [];
    for(e in winner)
    {
       a[winner[e]]=e;
    }
    console.log(a);
    // console.log(a.sort());
}
class Stats{

    size=50;
    counter = 0;

    run()
    {
        let wins={};
        for(this.counter=0;this.counter< this.size; this.counter++)
        {
            let arena = this.setupC();
            let winner = arena.fight();
            if(! wins[winner.name])
            {
                wins[winner.name]={"name":winner.name,"wins":0};
            }
            wins[winner.name].wins++;
        }

        let e;
        let a = [];
        for(e in wins)
        {
            a.push(wins[e]);
        }
        if(a.length==1)
        {
            console.log(a[0].name+" ("+a[0].wins+")");
        }
        else if(a[0].wins>a[1].wins)
        {
            console.log(a[0].name+" ("+a[0].wins+") - "+a[1].name+" ("+a[1].wins+")");
        }
        else if(a[1].wins>a[0].wins){
            console.log(a[1].name+" ("+a[1].wins+") - "+a[0].name+" ("+a[0].wins+")");

        }
        else
        {
            console.log("Unetschieden");
        }

        // console.log(wins);


    }

    setupA()
    {
        let arena = new Arena();
        let partyA = new Party("Alriken");
        partyA.addMember(new Fighter(Arsenal.getAlrik()));
        partyA.addMember(new Fighter(Arsenal.getAlrik("Alrine")));
        partyA.addMember(new Fighter(Arsenal.getAlrik("Alrine")));
        partyA.addMember(new Fighter(Arsenal.getAlrik("Alrine")));
        partyA.addMember(new Fighter(Arsenal.getAlrik("Alrine")));
        partyA.addMember(new Fighter(Arsenal.getAlrik("Alrine")));
        arena.addPartyA(partyA);

        let partyB = new Party("Orks");
        partyB.addMember(new Fighter(Arsenal.getOrk()));
        arena.addPartyB(partyB);
        return arena;
    }

    setupB()
    {
        let arena = new Arena();
        let partyA = new Party("Alrik");
        partyA.addMember(new Fighter(Arsenal.getAlrik()));

        arena.addPartyA(partyA);

        let partyB = new Party("Balrik");
        partyB.addMember(new Fighter(Arsenal.getBalrik("siggi")));
        arena.addPartyB(partyB);
        return arena;
    }

    setupC()
    {
        let arena = new Arena();
        let partyA = new Party("Helden");
        partyA.addMember(new Fighter(Arsenal.getZwerg()));
        partyA.addMember(new Fighter(Arsenal.getZwerg()));
        partyA.addMember(new Fighter(Arsenal.getZwerg()));

        arena.addPartyA(partyA);

        let partyB = new Party("Monster");
        partyB.addMember(new Fighter(Arsenal.getTroll()));
        arena.addPartyB(partyB);
        return arena;
    }



}

let waitForFunction;
function noticeAndWork()
{
    // setTimeout(someStats,3000);

    alertUs("fighting live!, Please wait!","warning");
    requestAnimationFrame(waitFor);
}



function waitFor()
{
    requestAnimationFrame(waitForFunction);
    requestAnimationFrame(function(){$(alertPlaceholder).empty();});

}

function report(reportObject)
{
console.log("report",reportObject);
    if(reportObject && reportObject.channel)
    {
        if(reportObject.channel=="party")
        {
            guiReport(reportObject.msg);
        }
        if(reportObject.channel=="fighter")
        {
            guiReport(reportObject.msg);
        }
        if(reportObject.channel=="arena")
        {
            if(reportObject.type && reportObject.type=="end")
            {
                guiReport('<div class="alert alert-success alert-dismissible" role="alert">'+reportObject.msg+'</div>');
                let winner = reportObject.arena.winner.getStanding();
                for(let i in winner)
                {
                    let fighter = winner[i];
                    guiReport(fighter.name+" hat überlebt mit "+fighter.hitpoints+" LE");
                }

            }
            else
            {
                guiReportRound(reportObject.msg);
            }
        }

    }
}


function fightWithRepos()
{

        let arena = new Arena(report);
        let partyA = new Party("Party A",report);
        let partyB = new Party("Party B",report);

        let fighter = getPartyA();
        for(let i in fighter)
        {
            partyA.addMember(new Fighter(fighter[i]));
        }
        // partyA.addMember(new Fighter(Arsenal.getZwerg()));
        // partyA.addMember(new Fighter(Arsenal.getZwerg()));
        // partyA.addMember(new Fighter(Arsenal.getZwerg()));

        arena.addPartyA(partyA);


        fighter = getPartyB();

        for(let i in fighter)
        {
            partyB.addMember(new Fighter(fighter[i]));
        }
        // partyB.addMember(new Fighter(Arsenal.getTroll()));
        arena.addPartyB(partyB);
        arena.fight();

}

init();
// listFighterRepos();




// let arena = new Arena();
// let partyA = new Party("Alriken");
// partyA.addMember(new Fighter(Arsenal.getAlrik()));
// partyA.addMember(new Fighter(Arsenal.getAlrik("Alrine")));
// arena.addPartyA(partyA);
//
// let partyB = new Party("Orks");
// partyB.addMember(new Fighter(Arsenal.getOrk()));
// arena.addPartyB(partyB);
//
//
//
// let winner = arena.fight();
//
// log("winner is "+winner.name);