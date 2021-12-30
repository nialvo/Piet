
//variables///////////////////////////////////////////////////////

const c = document.getElementById("viewScreen");
const ctx = c.getContext("2d");
ctx.fillstyle= "green";

//for when page is reloaded
document.getElementById("warn").innerText=" ";
document.querySelector('input[name="spac"]').value = "50";
document.querySelector('input[name="spac"]').placeholder = "50";

document.getElementById("warn2").innerText=" ";
document.querySelector('input[name="colo"]').value = "3";
document.querySelector('input[name="colo"]').placeholder = "3";


var nc;//number of colored squares
var r;//random number holder
var s; //random number holder
var closest; //for closest edge    
var colSqu = new Array();//colored square coordinates
var colors = ["red", "blue", "yellow"];

var lw;//line width in 10 pixels (must be multiple of .1)
var ma; //min distance between lines in 10 pixels
//screen dimensions / 10 (later to draw we multiply back)
var xM =  document.getElementById("viewScreen").width;
var yM = document.getElementById("viewScreen").height;


//can be made random
var nhl;
var extra; // number of vertical lines more than needed to cover naked horizontal endings
var nvl;
var mess =0; //message flag (not super elegant ok this is a work in progress)
var mess2 =0; //message flag (not super elegant ok this is a work in progress)

//breaker
var b;

var hlines = new Array();
var vlines = new Array();

//placeholder min, max, and flags
var m =0;
var M= 0;
var f = 0;
var p1 = 0;
var p2 = 0;
var ahr = 0;

//naked line ends
var nakedX1Y = new Array();
var nakedX2Y = new Array();

var posY = new Array();//possible y values for line enders, also indices of intersecting lines for colors
var dele = 0;//index of x=nakedX_Y to delete




//functions////////////////////////////////////////////////////////




function ra(min, max) {
    
    return Math.floor(Math.random() * (max - min) + min); 
}

function flip() {
    
    return Math.floor(Math.random() * 2); 
}




function drawHline(x1,x2,y,w){

    
    ctx.fillRect(x1,y,Math.abs(x2-x1),w);
    

}

function drawVline(y1,y2,x,w){

    ctx.fillRect(x,y1,w,Math.abs(y2-y1));

}

//console.log("x");

function draw(){

    ma = parseInt(document.querySelector('input[name="spac"]').value);
    nc = parseInt(document.querySelector('input[name="colo"]').value);

    if(!(ma>=0&&ma<=200)){

        document.getElementById("warn").innerText="Please enter a whole number between 0 and 200 ";
        mess = 1;

    }
    else if(!(nc>=0&&nc<=50)){

        document.getElementById("warn2").innerText="Please enter a whole number between 0 and 50 ";
        mess2 = 1;

    }
    else{

        document.getElementById("B").innerText="Click again to make another! ";


        if(mess==1){
            document.getElementById("warn").innerText=" ";
            mess=0;

        }

        if(mess2==1){
            document.getElementById("warn2").innerText=" ";
            mess2=0;

        }

    

    

   
    
    nhl = parseInt(document.querySelector('input[name="hor"]:checked').value);
    
    hlines.length=nhl;
    extra = parseInt(document.querySelector('input[name="ver"]:checked').value);

    lw = parseInt(document.querySelector('input[name="thic"]:checked').value);

    

    console.log("ma");
    console.log(ma);
    console.log("lw");
    console.log(lw);
    

    for(let i =0; i<nhl; i++){
        hlines[i]=new Array(3);
    }
    

    //console.log("x");


    //uncovered line ends
    nakedX1Y.length = 0;
    nakedX2Y.length = 0;
    //console.log("x");


    ctx.clearRect(0,0,xM,yM);

    for(let i =0; i<nhl; i++){

        p1=0;
        p2=0;
        //console.log("x");



        
        if(flip()==0){
            hlines[i][0]=0;
            //console.log("x");
        }else{
            //console.log("x");

            m=ma;
            M=xM-ma-lw;

            console.log("ma+lw");
            console.log(ma+lw);

            b=0;
            do{
                //console.log("x");

                f = 0;
                hlines[i][0]=ra(m,M+1);


                

                for(let k=0; k<i; k++){
                    //console.log("x");
                    if( (Math.abs(hlines[i][0]-hlines[k][0])<(ma+lw))||(Math.abs(hlines[i][0]-hlines[k][1])<(ma+lw))){
                        f=1;

                        
                    }

                    console.log("abs diff");
                    console.log(Math.abs(hlines[i][0]-hlines[k][0]));
                    console.log(Math.abs(hlines[i][0]-hlines[k][1]));
                }
                //console.log("x");
                b++;


            }while(f==1&&b<50);

            if(b==50){
                
                hlines[i][0]=0;
            }else{
            

                nakedX1Y.push(hlines[i][0]);
                p1=1;//flag naked line end
                //console.log("x");
            }
            
        }
        //console.log("x");

    

        if(flip()==0){
            hlines[i][1]=xM;
            //console.log("x");
        }else{
            //console.log("x");

            m=hlines[i][0]+lw+ma;
            M=xM-ma-lw;
            


            b=0;

            console.log("ma+lw");
            console.log(ma+lw);


            do{
                //console.log("x");

                f = 0;
                hlines[i][1]=ra(m,M+1);
                b++;
                

                for(let k=0; k<i; k++){
                    //console.log("x");
                    if( (Math.abs(hlines[i][1]-hlines[k][0])<(ma+lw))||(Math.abs(hlines[i][1]-hlines[k][1])<(ma+lw))){
                        f=1;
                    }
                    console.log("abs diff");
                    console.log(Math.abs(hlines[i][1]-hlines[k][0]));
                    console.log(Math.abs(hlines[i][1]-hlines[k][1]));
                }
                


            }while(f==1&&b<50);

            if(b==50){
                
                hlines[i][1]=xM;
            }else{


                nakedX2Y.push(hlines[i][1]);
                p2=1;//flag naked line end
                //console.log("x");
            }
        }

    
        //console.log("x");

        
        m=ma;
        M=yM-ma-lw;

        b=0;

        do{
            //console.log("x");

            f = 0;
            hlines[i][2]=ra(m,M+1);
            b++;
            

            for(let k=0; k<i; k++){
                //console.log("x");
                if( Math.abs(hlines[i][2]-hlines[k][2])<(ma+lw)){
                    f=1;
                }
            }
            //console.log("x");


        }while(f==1&&b<50);
        //console.log("x");
        if(b==50){

            hlines[i][2]=yM;
            hlines[i][0]=0;
            hlines[i][1]=xM;

            if(p1==1){
                p1=0;
                nakedX1Y.pop();
            }
            if(p2==1){
                p2=0;
                nakedX2Y.pop();
            }
        }
            


            

                


                

            
            //console.log("x");

   


        
        //record y-coordinate and line number of naked line ends: [x,y,i,x,y,i,...]
        if(p1==1){
            //console.log("x");
            nakedX1Y.push(hlines[i][2]);
            nakedX1Y.push(i);

        }
        if(p2==1){
            //console.log("x");
            nakedX2Y.push(hlines[i][2]);
            nakedX2Y.push(i)

        }





    }
    
    //console.log("x");

    console.log("nakedX1Y length /3");
    console.log(nakedX1Y.length/3);
    console.log("nakedX2Y length /3");
    console.log(nakedX2Y.length/3);
    

    nvl = nakedX1Y.length/3 + nakedX2Y.length/3;


    console.log("nvl");
    console.log(nvl);
    console.log("typeof extra");
    console.log(typeof extra);

    nvl+=extra;
    vlines.length=nvl;
    console.log("nvl");
    console.log(nvl);
    console.log("nhl");
    console.log(nhl);
    console.log("extra");
    console.log(extra);
    console.log("nakedX1Y");
    console.log(nakedX1Y);
    console.log("nakedX2Y");
    console.log(nakedX2Y);
    console.log("nakedX1Y length");
    console.log(nakedX1Y.length);
    console.log("nakedX2Y length");
    console.log(nakedX2Y.length);


    for(let i =0; i<nvl; i++){
        //console.log("x");
        vlines[i]=new Array(3);
    }


    

    for(let i = 0; i<nvl; i++){
        //console.log("x");
        

            

        if(nakedX1Y.length>0){
            //console.log("x");

            vlines[i][2]=nakedX1Y[nakedX1Y.length-3];
                    

            posY.length = 0;
            

            for(let k=0;k<nhl;k++){
                //console.log("x");

                if(k!=nakedX1Y[nakedX1Y.length-1]){
                    //console.log("x");
                    if((hlines[k][2]<nakedX1Y[nakedX1Y.length-2])&&(hlines[k][0]<vlines[i][2])&&(hlines[k][1]>vlines[i][2])){
                        posY.push(hlines[k][2]);
                        
                    }
                    //console.log("x");

                }
                //console.log("x");
            }
            //console.log("x");

            posY.push(0);

            console.log("posY for X1Y");
            console.log(posY);
            

            vlines[i][0]=posY[ra(0,posY.length)];
            

            posY.length = 0;

            for(let k=0;k<nhl;k++){
                //console.log("x");

                if(k!=nakedX1Y[nakedX1Y.length-1]){
                    //console.log("x");
                    if(hlines[k][2]>nakedX1Y[nakedX1Y.length-2]&&hlines[k][0]<vlines[i][2]&&hlines[k][1]>vlines[i][2]){
                        posY.push(hlines[k][2]);
                    }

                }
            }

            posY.push(yM);
            //console.log("x");



            vlines[i][1]=posY[ra(0,posY.length)];
            //console.log("x");
            




            nakedX1Y.pop();
            nakedX1Y.pop();
            nakedX1Y.pop();

        }else if(nakedX2Y.length>0){
            //console.log("x");

            vlines[i][2]=nakedX2Y[nakedX2Y.length-3];
                    
            
            posY.length = 0;

            for(let k=0;k<nhl;k++){
                //console.log("x");

                if(k!=nakedX2Y[nakedX2Y.length-1]){
                    //console.log("x");
                    if(hlines[k][2]<nakedX2Y[nakedX2Y.length-2]&&hlines[k][0]<vlines[i][2]&&hlines[k][1]>vlines[i][2]){
                        posY.push(hlines[k][2]);
                    }

                }
                //console.log("x");
            }
            //console.log("x");

            posY.push(0);

            console.log("posY for X1Y");
            console.log(posY);
            

            var z = ra(0,posY.length);

            vlines[i][0]=posY[z];
            

            console.log("ra(0,posY.length)");
            console.log(z);

            posY.length = 0;

            for(let k=0;k<nhl;k++){

                if(k!=nakedX2Y[nakedX2Y.length-1]){
                    //console.log("x");
                    if(hlines[k][2]>nakedX2Y[nakedX2Y.length-2]&&hlines[k][0]<vlines[i][2]&&hlines[k][1]>vlines[i][2]){
                            posY.push(hlines[k][2]);
                    }
                            
                }
            }
            //console.log("x");

            posY.push(yM);

            

            vlines[i][1]=posY[ra(0,posY.length)];
           




            nakedX2Y.pop();
            nakedX2Y.pop();
            nakedX2Y.pop();

        } else {
            //console.log("x");

            b=0;

            

            do{
                //console.log("x");
                vlines[i][2]=ra(ma,xM-ma-lw);
                f=0;
                b++;
            
                for(let k=0; k<i; k++){
                    //console.log("x");
                    if( Math.abs(vlines[i][2]-vlines[k][2])<(ma+lw)){
                        f=1;
                    }
                }
            }while(f==1&&b<50);

            if(b==50){

                vlines[i][2]=xM;
            }
                     
            //console.log("x");



            posY.length = 0;
            

            for(let k=0;k<nhl;k++){
                //console.log("x");

                
                if((hlines[k][2]<vlines[i][2])&&(hlines[k][0]<vlines[i][2])&&(hlines[k][1]>vlines[i][2])){
                    posY.push(hlines[k][2]);
                        
                }

               
            }

            posY.push(0);
            //console.log("x");

            

            vlines[i][0]=posY[ra(0,posY.length)];
            //console.log("x");
            

            posY.length = 0;

            for(let k=0;k<nhl;k++){
                //console.log("x");

                
                if(hlines[k][2]>vlines[i][2]&&hlines[k][0]<vlines[i][2]&&hlines[k][1]>vlines[i][2]){
                    posY.push(hlines[k][2]);
                }

                
            }

            posY.push(yM);
            //console.log("x");



            vlines[i][1]=posY[ra(0,posY.length)];
            





        }

        //console.log("x");

                




                
            


        
    }



    




    colSqu.length = nc;
    for(let i=0; i<nc; i++){
        colSqu[i]=new Array(4);
    }
    

    for(let i=0; i<nc; i++){

        //pick random vline[r]

        r=ra(0,vlines.length);
        colSqu[i][0]= vlines[r][2];////////////

        //pick random intersecting hline

        posY.length=0;

        for(let j=0; j<hlines.length; j++){
            if(hlines[j][2]<vlines[r][1]&&hlines[j][2]>=vlines[r][0]&&hlines[j][0]<=vlines[r][2]&&hlines[j][1]>vlines[r][2]){
                posY.push(j);
            }
        }

        if(posY.length==0){
            colSqu[i][2]=0;
        }else{

            s=posY[ra(0,posY.length)];

            colSqu[i][2]=hlines[s][2];////////////////////
        }
        

        //find closest downwards hline....

        closest=yM;


        for(let j=0; j<hlines.length; j++){

            if(hlines[j][2]>colSqu[i][2]&&hlines[j][2]<closest&&hlines[j][0]<=vlines[r][2]&&hlines[j][1]>vlines[r][2]){
                closest=hlines[j][2];
            }
        }
        colSqu[i][3]=closest;

        //find closest rightwards vline

        closest = xM;

        for(let j=0; j<vlines.length; j++){

            if(vlines[j][2]>vlines[r][2]&&vlines[j][2]<closest&&vlines[j][0]<=colSqu[i][2]&&vlines[j][1]>colSqu[i][2]){
                closest=vlines[j][2];
            }
        }
        colSqu[i][1]=closest;


    




    }

    console.log(colSqu);

    for(let i=0; i<nc; i++){
        ctx.fillStyle=colors[ra(0,colors.length)];

        ctx.fillRect(colSqu[i][0],colSqu[i][2],colSqu[i][1]-colSqu[i][0],colSqu[i][3]-colSqu[i][2]);


    }

    






    //console.log("x");
    ctx.fillStyle = "black";

    for(let i =0; i<nvl; i++){
        //console.log("x");
        drawVline(vlines[i][0],vlines[i][1],vlines[i][2],lw);
    }

    //console.log("x");


    for(let i =0; i<nhl; i++){
        //console.log("x");
        drawHline(hlines[i][0],hlines[i][1],hlines[i][2],lw);
    }

}
}

    

 









