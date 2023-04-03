function listFighterRepos()
{

    let repos = Arsenal.getFighter();
    for(let i in repos)
    {
        $(".fighter_repos").append(
            $('<li>'+repos[i].name+': '+JSON.stringify(repos[i])+'</li>')
        );
    }


}
function listFighterReposControl(target)
{
    target.empty();
    let control = $('<select class="fighter_repos_control">');
    let repos = Arsenal.getFighter();
    for(let i in repos)
    {
        let option = $('<option value="">'+repos[i].name+': '+JSON.stringify(repos[i])+'</option>');
        option.attr('value',JSON.stringify(repos[i]));
        control.append(option);
    }
    let controlResult = $('<ul>');
    controlResult.data("fighter",[]);
    controlResult.click(function(i){
        if(i.target && $(i.target).is("button"))
        {
            let li = $(i.target);
            let liData = li.data("val");
            let dataIndex = controlResult.data( "fighter" ).indexOf(liData);
            controlResult.data( "fighter" ).splice(dataIndex,1);
            li.parent().remove();
        }
    })
    control.change(function(i,o) {
            let fighter = JSON.parse( $( this ).val() );
            let li =  $( '<li><button type="button" class="btn-close"  aria-label="Close"></button>' + fighter.name + ': ' + JSON.stringify( fighter ) + '</li>' )
            li.find("button").data("val",fighter);
            controlResult.append(li  );
            let currentData = controlResult.data( "fighter" );
            currentData.push( fighter );
            controlResult.data( "fighter", currentData );
            control.val([]);
        }
    );
    control.val([]);
    target.append(control);
    target.append(controlResult);


}

function resetLog()
{
    $(".report").empty();
    $(".report_round").empty();
}
function resetRepos()
{
    listFighterReposControl($(".repos_teamA"));
    listFighterReposControl($(".repos_teamB"));
}

function init(){
    listFighterReposControl($(".repos_teamA"));
    listFighterReposControl($(".repos_teamB"));
    $(".action_example").click( async () =>{

        //
        noticeAndWork();
    });
    $(".start_fight").click( () =>{

        resetLog();
        waitForFunction = fightWithRepos;
        noticeAndWork();
        // fightWithRepos();
    });

    $(".addAlriks").click( () =>{

        let data = ($(".repos_teamA select").find(":nth-child(1)").val());
        $(".repos_teamA select").val(data).change();
 data = ($(".repos_teamA select").find(":nth-child(1)").val());
        $(".repos_teamA select").val(data).change();
data = ($(".repos_teamA select").find(":nth-child(1)").val());
        $(".repos_teamA select").val(data).change();


        // fightWithRepos();
    });
    $(".reset_fight").click( () =>{
        resetLog();
        resetRepos();
    });

}

function getPartyA()
{
    return $(".repos_teamA ul").data("fighter");
}
function getPartyB()
{
    return $(".repos_teamB ul").data("fighter");
}
function guiReport(stringA)
{
    $(".report").append(
        $('<li>'+stringA+'</li>')
    );
}

function guiReportRound(round)
{
    $(".report_round").html("Runde "+round);
}