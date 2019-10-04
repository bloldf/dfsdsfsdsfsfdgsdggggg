const Canvas = require("canvas");
const pretty = require("pretty-ms")
const credits = JSON.parse(fs.readFileSync('./credits.json'));
var time = require("./time.json");
client.on('message',async message => {
if(message.author.bot || message.channel.type === 'dm') return;
let args = message.content.split(' ');
let author = message.author.id;
if(!credits[author]) credits[author] = {
credits: 0
}
fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
if(args[0].toLowerCase() == `${prefix}credits`) {
const mention = message.mentions.users.first() || message.author;
const mentionn = message.mentions.users.first();
if(!args[2]) {
message.channel.send(`**${mention.username}, your :credit_card: balance is \`$${credits[mention.id].credits}\`**`)
} else if(mentionn && args[2]) {
if(isNaN(args[2])) return message.channel.send(`**:x: | Error**`);
if(args[2] < 1) return message.channel.send(`**:x: | Error**`);
if(mention.bot) return message.channel.send(`**:x: | Error**`);      
if(mentionn.id === message.author.id) return message.channel.send(`**:x: | Error**`);
if(args[2] > credits[author].credits) return message.channel.send(`**:x: | Error , You Don't Have Enough Credit**`);
if(args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
let resulting = Math.floor(args[2]-(args[2]*(5/100)));
let tax = Math.floor(args[2]*(5/100));
let first = Math.floor(Math.random() * 9);
let second = Math.floor(Math.random() * 9);
let third = Math.floor(Math.random() * 9);
let fourth = Math.floor(Math.random() * 9);
let num = `${first}${second}${third}${fourth}`;
let canvas = Canvas.createCanvas(108 , 40)
let ctx = canvas.getContext('2d');
const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.font = '20px Arial Bold';
ctx.fontSize = '20px';
ctx.fillStyle = "#ffffff";
message.channel.send(`**${message.author.username}, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `).then(essss => {
ctx.fillText(num, canvas.width / 2.4, canvas.height / 1.7);
message.channel.sendFile(canvas.toBuffer()).then(m => {
message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => {
if(collected.first().content === num) {
message.channel.send(`**:moneybag: | ${message.author.username}, Done Trans \`$${resulting.toLocaleString()}\` To ${mentionn}**`);
mention.send(`**:money_with_wings: | Transfer Receipt \`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${message.author.username}; (ID (${message.author.id})\`\`\``);
m.delete();
credits[author].credits += Math.floor((-resulting.toLocaleString()));
credits[mentionn.id].credits += Math.floor((+resulting.toLocaleString()));
fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
} else {
m.delete();
essss.delete();
}
})
})
})
}else {
message.channel.send(`**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`);
}
}
if(args[0].toLowerCase() === `${prefix}daily`) {
let cooldown = 8.64e+7
let Daily = time[message.author.id]
if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
let times = (cooldown - (Date.now() - Daily));
message.channel.send(`**:stopwatch: |  ${message.author.username}, your daily :dollar: credits refreshes in ${pretty(times, {verbose:true})}.**`);
fs.writeFile("./time.json", JSON.stringify(time), function(e) {
if(e)throw e;
})
}else{
let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
credits[author].credits += ammount;
time[message.author.id] = Date.now();
message.channel.send(`**:atm:  | ${message.author.username}, you received your :yen: ${ammount} daily credits!**`);
fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
if(e)throw e;
})
}
}
}); // By: FireKing , Codes
