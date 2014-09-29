var server = require( "./server.js" );
var cluster = require('cluster');
var App={
	run: function(){
		console.log('Good morning. A coffee ?');
		server.listen( );

	}
};

if(cluster.isMaster){
	cluster.fork();
	cluster.on('exit',function(worker){
        console.log('Worker ' + worker.id + ' died..');
		setTimeout( function () {
            cluster.fork();
        }, 1000 );
	});
}
else{
	try{
			App.run();
		}
		catch(e)
		{
			console.log(e);
			process.exit(1);
		}
		process.on('uncaughtException', function(err){
			console.log(err);
			process.exit(1);
		});
		process.on( 'SIGINT', function () {
		    console.log( "\n SIGINT (Crtl-C)" );
			//Kill worker
			cluster.disconnect();
			// Sortie
			process.exit(1);
		});
}	
