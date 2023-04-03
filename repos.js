

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
    for(let c=0;c< 20; c++)
    {
        stats.run();

    }

    // return timeoutPromise(1000);
}

async function doAsync () {
    var start = Date.now();
    // we are now using promise all to await all promises to settle
    var responses = await Promise.all([alertUs("fighting live!, Please wait!","warning"), someStats()]);
    return responses.map(x=>x-start);
}

function log(a,b,c)
{
    console.log(a,b,c);

}

function roll(max)
{
    return Math.floor(Math.random() * max) +1;
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


function noticeAndWork()
{
    setTimeout(someStats,3000);

    alertUs("fighting live!, Please wait!","warning");
    // requestAnimationFrame(requestAnimationFrame(someStats));
}

const  example =  async () => {

    doAsync();
    //     let stats = new Stats();
    // console.log(alertUs);
    //
    // console.log(Stats);
    //     // let result =  alertUs("fighting live!, Please wait!","warning");
    //     for(let c=0;c< 2; c++)
    //     {
    //         await stats.run();
    //
    //     }
    // if(result)
    // {
    //     confirm("weiter?");
    //
    // }
    // $(alertPlaceholder).empty();
}

function timeoutPromise (time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(Date.now());
        }, time)
    })
}
function doSomethingAsync () {
    return timeoutPromise(1000);
}



$(".action_example").click( async () =>{

    //
    let result =  example();
});


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