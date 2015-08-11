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

/* Async - callbacks*/
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

/* Async - events */
function getAdder(){
    var _callbacks = [];
    return {
        add: function(x,y){
                console.log("[SP] processing ", x , " and " , y);
                setTimeout(function(){
                    var result = x + y;
                    console.log("[SP] returning result");
                    _callbacks.forEach(function(callback){
                        callback(result);
                    })
                },4000);
        },
        addSubscriber : function(callback){
            _callbacks.push(callback);
        }
    }
}

//Client

var adder = getAdder();

adder.addSubscriber(function(result){
   console.log("[SC] result = ", result);
});

adder.add(100,200);



/* Async - Promises */
function add(x,y){
    console.log("[SP] processing ", x , " and " , y);

    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            var result = x + y;
            console.log("[SP] returning result");
            resolve(result);
        },4000);
    });

    return promise;
}

//Client

var p = add(100,200);
p.then(function(result){
    console.log("result = ", result);
});

p.catch(function(err){

})
















