//Import dependencies
const express = require('express');
const multer = require('multer');
const Uuid = require('uuid');
const fs = require('fs');
var builder = require('xmlbuilder');

//Instantiate variables
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
//Save the port number where your server will be listening
const port = 12500;

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.post('/create-ssh-config-jetbrains',upload.single('file'), (req, res) => {
    console.log(req.file);

    let xml = builder.create('application')
        .ele('component', {'name': 'SshConfigs'})
        .ele('configs');

    fs.readFile(req.file.path, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        let lines = data.split('\n');
        let config_ssh = {
            host: '',
            keyPath: '',
            port: '',
            customName: '',
            nameFormat: 'CUSTOM',
            username: '',
        }
        for(let i = 0;i < lines.length;i++){
            //code here using lines[i] which will give you each line
            if(lines[i].includes('Host ')) {
                config_ssh = {
                    host: '',
                    keyPath: '',
                    port: '',
                    customName: '',
                    nameFormat: 'CUSTOM',
                    username: '',
                }
                config_ssh.customName = lines[i].replace('Host','').trim();
            } else if (lines[i].includes('Hostname')) {
                config_ssh.host = lines[i].replace('Hostname','').trim();
            } else if (lines[i].includes('Port')) {
                config_ssh.port = lines[i].replace('Port','').trim();
            } else if (lines[i].includes('User')) {
                config_ssh.username = lines[i].replace('User','').trim();
            } else if (lines[i].includes('IdentityFile')) {
                config_ssh.keyPath = lines[i].replace('~','$USER_HOME$').replace('IdentityFile','').trim();
                xml.ele('sshConfig', {
                    'host': config_ssh.host,
                    'id': Uuid.v4(),
                    'keyPath': config_ssh.keyPath,
                    'port': config_ssh.port,
                    'customName': config_ssh.customName,
                    'nameFormat': config_ssh.nameFormat,
                    'username': config_ssh.username
                }).ele('option',{
                    'name': 'customName',
                    'value': config_ssh.customName,
                })
            }
        }

        let xml_content = xml.end({ pretty: true});

        fs.writeFile('xml_configs/sshConfigs.xml', xml_content, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });

        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log(req.file.path + ' was deleted');
        });

        res.send('get-ssh-file-config');
    });
});

app.get('/get-ssh-file-config',(req,res) => {
    res.download('xml_configs/sshConfigs.xml','sshConfigs.xml', function (err) {
        fs.unlink('xml_configs/sshConfigs.xml', (err) => {
            if (err) throw err;
            console.log('xml_configs/sshConfigs.xml was deleted');
        });
    });
});

//Server starts listening for any attempts from a client to connect at port: {port}
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
