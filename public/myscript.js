function myFunction() {
    document.getElementById('form2').style.display = "block";
    enterlog("Day-In",getTime());
 }

 function myFunction1() {
    document.getElementById('form2').style.display = "none";
    enterlog("Day-out",getTime());
 }

//  var clicked=false;

//  function prodfunc() {
//     if(!clicked){
//         document.getElementById('prodform').style.display = "block";
//         clicked = true;
//     }
//     else{
//         document.getElementById("Production").disabled = true;
//     }
//  }

//  function nonprodfunc() {
//     if(!clicked){
//         document.getElementById('nonprodform').style.display = "block";
//         clicked = true;
//     }
//     else{
//         document.getElementById("Non-Production").disabled = true;
//     }
//  }

//  function breakfunc() {
//     if(!clicked){
//         document.getElementById('breakform').style.display = "block";
//         clicked = true;
//     }
//     else{
//         document.getElementById("Break").disabled = true;
//     }
//  }

const ptimer = document.getElementById('t1');
const btimer = document.getElementById('t2');
const nptimer = document.getElementById('t3');

let sec1 = 0;
let sec2 = 0;
let sec3 = 0;
let interval1 = null;
let interval2 = null;
let interval3 = null;

function prodfunc()
{
    document.getElementById('prodform').style.display="block";
    document.getElementById('breakform').style.display = "none";
    document.getElementById('nonprodform').style.display = "none";
    
}

function breakfunc()
{
    document.getElementById('prodform').style.display="none";
    document.getElementById('breakform').style.display = "block";
    document.getElementById('nonprodform').style.display = "none";
}

function nonprodfunc()
{
    document.getElementById('prodform').style.display="none";
    document.getElementById('breakform').style.display = "none";
    document.getElementById('nonprodform').style.display = "block";
}

//var f1 = false;

function pstart()
{
    document.getElementById('Break').disabled = true;
    document.getElementById('Non-Production').disabled = true;
    if(interval1){
        return ;
    }

    interval1 = setInterval(ptime,1000);
    enterlog("Production-start",getTime());
}

function pend()
{
    document.getElementById('Break').disabled = false;
    document.getElementById('Non-Production').disabled = false;
    ptend();
    enterlog("Production-end",getTime());
}

function bstart()
{
    document.getElementById('Production').disabled = true;
    document.getElementById('Non-Production').disabled = true;
    if(interval2){
        return ;
    }

    interval2 = setInterval(btime,1000);
    enterlog("Break-start",getTime());
}

function bend()
{
    document.getElementById('Production').disabled = false;
    document.getElementById('Non-Production').disabled = false;
    btend();
    enterlog("Break-end",getTime());
}

function npstart()
{
    document.getElementById('Break').disabled = true;
    document.getElementById('Production').disabled = true;
    if(interval3){
        return ;
    }

    interval3 = setInterval(nptime,1000);
    enterlog("NonProduction-start",getTime());
}

function npend()
{
    document.getElementById('Break').disabled = false;
    document.getElementById('Production').disabled = false;
    nptend();
    enterlog("NonProduction-end",getTime());
}

//timer

function ptime()
{
    sec1++;

    let h = Math.floor(sec1/3600);
    let m = Math.floor((sec1-(h*3600))/60);
    let s = sec1%60;

    if(h<10) h = "0"+h;
    if(m<10) m = "0"+m;
    if(s<10) s = "0"+s;

    ptimer.innerText = h+':'+m+':'+s;
}

function ptend()
{
    clearInterval(interval1);
    interval1 = null;
}

function btime()
{
    sec2++;

    let h1 = Math.floor(sec2/3600);
    let m1 = Math.floor((sec2-(h1*3600))/60);
    let s1 = sec2%60;

    if(h1<10) h1 = "0"+h1;
    if(m1<10) m1 = "0"+m1;
    if(s1<10) s1 = "0"+s1;

    btimer.innerText = h1+':'+m1+':'+s1;
}

function btend()
{
    clearInterval(interval2);
    interval2 = null;
}

function nptime()
{
    sec3++;

    let h2 = Math.floor(sec3/3600);
    let m2 = Math.floor((sec3-(h2*3600))/60);
    let s2 = sec3%60;

    if(h2<10) h2 = "0"+h2;
    if(m2<10) m2 = "0"+m2;
    if(s2<10) s2 = "0"+s2;

    nptimer.innerText = h2+':'+m2+':'+s2;
}

function nptend()
{
    clearInterval(interval3);
    interval3 = null;
}

//logging details

var tab = document.getElementById("log");

function enterlog(x,y){
    var row = tab.insertRow(-1);
    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);

    c1.innerHTML = x;
    c2.innerHTML = y;
}

function getTime(){
    const t = new Date();
    let hr = t.getHours();
    let min = t.getMinutes();
    let sec = t.getSeconds();

    var ans = hr+':'+min+':'+sec;
    return ans;

}