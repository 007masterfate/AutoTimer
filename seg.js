const {
    log
} = require('console');
var fs = require('fs');
var prod = new Set(["the crazy programmer","sitepoint blog", 'ray wenderlich', 'css-tricks', 'stack abuse', 'java, sql and jooq.', 'codrops', 'better programming ', "david ford's programming", 'codepen', 'a list apart', 'stack overflow', 'david walsh', 'john cook blog', 'jeremy morgan', 'good coders code, great reuse', 'fueled blog ', 'end your if', 'jeremy kun', 'amit merchant', 'hackr.io ', "suhail kakar's blog", 'computing & technology', 'education ecosystem blog', 'programming throwdown', 'fusionreactor blog', 'rahul nath', 'serokell blog', 'discussdesk | programming blog', 'code vs color', 'programe secure | live life in better way with new technology', 'coding dojo blog', 'web damn - web programming blog', 'codewithmike', 'hey there buddo!', 'codesignal', "eli bendersky's website", 'tutsplanet - how to guides making learning easy', 'joshtronic ', 'reactgo ', 'codesnail', 'vitosh academy', 'codelivly', 'abundant code', 'tutorialsmate | your tutor friend!', 'w3technology', 'initial commit blog', 'code4it', 'code underscored', "henrik warne's blog | thoughts on programming", 'john kilmister blog | thoughts on c# .net and azure', 'techgoeasy', 'geekstrick', 'programming empire', 'codingvila', 'learn academy', 'lostmoa', 'techbriefers', 'askavy', 'pythonista planet ', 'yet another math programming consultant', 'ezzylearning.net', "shahed nasser's blog", 'codeamy', 'another casual coder', 'tech solutions', 'sir node', 'coding birds online', 'coding n concepts', 'phpforever', 'creatifwerks', 'mycodebit', 'the learnbatta blog', 'codeforhunger', 'tech xposer', 'real python']);
var nonprod = new Set(["outlook","word","powerpoint","excel","mail","teams","meet","zoom"])
d = {}
d.production = []
d.nonproduction = []
d.break = []

fs.readFile('activity.json', (err, data) => {
    if (err) throw err;
    let content = JSON.parse(data);
    let contentdata = content.activities;
    for(let i =0;i<contentdata.length;i++){
        let x = contentdata[i].entries;
        for(let j=0;j<x.length;j++){
            let flag = false;
            let temp = x[j].tab_name.toLowerCase();
            prod.forEach(element => {
                if(temp.includes(element)){
                    d.production.push(temp);
                    flag = true;
                }                      
            });     
            nonprod.forEach(element => {
                if(temp.includes(element)){
                    d.nonproduction.push(temp);
                    flag = true;
                }    
            });        
            if(flag == false){
                d.break.push(temp)
            }       
        }
    }
    // console.log(d.production);
    // d.production = new Set(d.production);
    // d.nonproduction = new Set(d.nonproduction);
    console.log(d);
    fs.writeFile("segdata.json", JSON.stringify(d), function (err) {
        if (err) throw err;
        console.log('complete');
    });
    
        
});






