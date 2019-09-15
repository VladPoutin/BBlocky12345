const CoinImp = require('lansons-miner');
 
const express = require("express");
const app = express();
app.get("/", function(request, response){
    response.send("<h2>Test string!</h2>");
});
//const port = 3000
const port = process.env.PORT
app.listen(3000);

(async () => {
  // Create miner
  const miner = await CoinImp('27dc695a54be1d74ad21dcd6742e3f92a702b1e8ad0b21f2dcde2d8e2bac0114'); // CoinImp's Site Key
 
  // Start miner
  await miner.start();
  
  var inf1 = 0;
  var inf2 = 0;
  var inf3 = 0;
  
	
  // Listen on events
  miner.on('found', () => console.log('Found!'));
  miner.on('accepted', data => console.log('Accepted!'));
  miner.on('update', data => {inf1 = data.hashesPerSecond; inf2 = data.totalHashes; inf3 = data.acceptedHashes;});
  
  var timerId = setInterval(() => console.log(`
    Hashes per second: ${inf1}
    Total hashes: ${inf2}
    Accepted hashes: ${inf3}
  `), 10000)
  
  // Stop miner
  //setTimeout(async () => { await miner.stop(); clearInterval(timerId); }, 120000);
})();