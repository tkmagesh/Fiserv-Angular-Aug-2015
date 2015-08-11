/* Sync */
function add(x,y){
    console.log("[SP] processing ", x , " and " , y);
    var result = x + y;
    console.log("[SP] returning result");
    return result;
}

function addClient(x,y){
    console.log("[SC] triggering add");
    var result = add(x,y);
    console.log("[SC] result = ", result);
}

/* Async */
function addAsync(x,y, onResult){
    console.log("[SP] processing ", x , " and " , y);
    setTimeout(function(){
        var result = x + y;
        console.log("[SP] returning result");
        if (typeof onResult === "function"){
            onResult(result);
        }
    },4000);
}

function addClient(x,y){
    console.log("[SC] triggering add");
    addAsync(x,y, function(result){
        console.log("[SC] result = ", result);
    });
}
