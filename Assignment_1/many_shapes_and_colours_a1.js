/*
COMP 370 assignment #1: Many shapes and colours
Thomas Williamson
id: 588206
2021/09/22

*/

"use strict";
//load variables
var gl;
var triangle;
var square;
var circle
var program;
var program2;
var program3
var t_vPosition;
var s_vPosition;
var ci_vPosition;
var tBuffer;
var sBuffer;
var ciBuffer
var t_cBuffer;
var s_cBuffer;
var ci_cBuffer
var color = 1
var shape = 1; //1: triangle, 2: square
var colorT = [1,0,0, 0,1,0, 0,0,1,];
var colorS = [1,0,0, 1,0,0, 1,0,0, 1,0,0,];
var colorC = [1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0]
var t_ColorLoc;
var s_ColorLoc;
var ci_ColorLoc;


window.onload = function init()
{
    //load canvas
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    //set shape geometries
    triangle = new Float32Array([
        -1, -1 ,
         0,  1 ,
         1, -1
    ]);

    square = new Float32Array([
        -1,  1,
        -1, -1,
         1,  1,
         1, -1
    ]);

        //python code used to obtain verticies
        //     import math
        // print("{")
        // for i in range(90):
        //     if (i%3) == 0:
        //         #print(i)
        //         x = round((math.cos(i*math.pi/180)*1),2)
        //         y = round((math.sin(i*math.pi/180)*1),2)
        //         print(str(x) + ", " + str(y) + ", ")
        // for i in range(90):
        //     if (i%3) == 0:
        //         x = round(-(math.cos((90-i)*math.pi/180)*1),2)
        //         y = round((math.sin((90-i)*math.pi/180)*1),2)
        //         print(str(x) + ", " + str(y) + ", ")
        // for i in range(90):
        //     if (i%3) == 0:
        //         x = round(-(math.cos(i*math.pi/180)*1),2)
        //         y = round(-(math.sin(i*math.pi/180)*1),2)
        //         print(str(x) + ", " + str(y) + ", ")
        // for i in range(90):
            
        //     if (i%3) == 0:
        //         x = round((math.cos((90-i)*math.pi/180)*1),2)
        //         y = round(-(math.sin((90-i)*math.pi/180)*1),2)
        //         print(str(x) + ", " + str(y) + ", ")
    circle = new Float32Array([
        0, 0, 1.0, 0.0, 1.0, 0.05, 
        0.99, 0.1, 0.99, 0.16, 
        0.98, 0.21, 0.97, 0.26, 
        0.95, 0.31, 0.93, 0.36, 
        0.91, 0.41, 0.89, 0.45, 
        0.87, 0.5, 0.84, 0.54, 
        0.81, 0.59, 0.78, 0.63, 
        0.74, 0.67, 0.71, 0.71, 
        0.67, 0.74, 0.63, 0.78, 
        0.59, 0.81, 0.54, 0.84, 
        0.5, 0.87, 0.45, 0.89, 
        0.41, 0.91, 0.36, 0.93, 
        0.31, 0.95, 0.26, 0.97, 
        0.21, 0.98, 0.16, 0.99, 
        0.1, 0.99, 0.05, 1.0, 
        -0.0, 1.0, -0.05, 1.0, 
        -0.1, 0.99, -0.16, 0.99, 
        -0.21, 0.98, -0.26, 0.97, 
        -0.31, 0.95, -0.36, 0.93, 
        -0.41, 0.91, -0.45, 0.89, 
        -0.5, 0.87, -0.54, 0.84, 
        -0.59, 0.81, -0.63, 0.78, 
        -0.67, 0.74, -0.71, 0.71, 
        -0.74, 0.67, -0.78, 0.63, 
        -0.81, 0.59, -0.84, 0.54, 
        -0.87, 0.5, -0.89, 0.45, 
        -0.91, 0.41, -0.93, 0.36, 
        -0.95, 0.31, -0.97, 0.26, 
        -0.98, 0.21, -0.99, 0.16, 
        -0.99, 0.1, -1.0, 0.05, 
        -1.0, -0.0, -1.0, -0.05, 
        -0.99, -0.1, -0.99, -0.16, 
        -0.98, -0.21, -0.97, -0.26, 
        -0.95, -0.31, -0.93, -0.36, 
        -0.91, -0.41, -0.89, -0.45, 
        -0.87, -0.5, -0.84, -0.54, 
        -0.81, -0.59, -0.78, -0.63, 
        -0.74, -0.67, -0.71, -0.71, 
        -0.67, -0.74, -0.63, -0.78, 
        -0.59, -0.81, -0.54, -0.84, 
        -0.5, -0.87, -0.45, -0.89, 
        -0.41, -0.91, -0.36, -0.93, 
        -0.31, -0.95, -0.26, -0.97, 
        -0.21, -0.98, -0.16, -0.99, 
        -0.1, -0.99, -0.05, -1.0, 
        0.0, -1.0, 0.05, -1.0, 
        0.1, -0.99, 0.16, -0.99, 
        0.21, -0.98, 0.26, -0.97, 
        0.31, -0.95, 0.36, -0.93, 
        0.41, -0.91, 0.45, -0.89, 
        0.5, -0.87, 0.54, -0.84, 
        0.59, -0.81, 0.63, -0.78, 
        0.67, -0.74, 0.71, -0.71, 
        0.74, -0.67, 0.78, -0.63, 
        0.81, -0.59, 0.84, -0.54, 
        0.87, -0.5, 0.89, -0.45, 
        0.91, -0.41, 0.93, -0.36, 
        0.95, -0.31, 0.97, -0.26, 
        0.98, -0.21, 0.99, -0.16, 
        0.99, -0.1, 1.0, -0.05, 1, 0])

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1, 1, 1, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

//initiate vertex and fragment - shader buffer datta
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    program2 = initShaders( gl, "vertex-shader", "fragment-shader" );
    program3 = initShaders( gl, "vertex-shader", "fragment-shader");

//triangle buffer data and render
    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW );

    t_vPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );

    t_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorT), gl.STATIC_DRAW );

    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
    
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );

    gl.enableVertexAttribArray(t_ColorLoc);

    render();

//square ...
    sBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, square, gl.STATIC_DRAW );
    s_vPosition = gl.getAttribLocation( program2, "aPosition" );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );

    s_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );

    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);

//circle ...
    ciBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, ciBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, circle, gl.STATIC_DRAW );
    ci_vPosition = gl.getAttribLocation( program3, "aPosition" );
    gl.vertexAttribPointer( ci_vPosition, 2, gl.FLOAT, false, 0, 0 );

    ci_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ci_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );

    ci_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(ci_ColorLoc, 3, gl.FLOAT, false, 0, 0);

    window.addEventListener('keydown', this.checkKey);

};


function render() {

    if(shape==1){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }else if(shape==2){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }else if(shape==3){
        //console.log("c")

        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 122 );
    }
}

// keyboard input 

function checkKey(e){
    switch(e.keyCode){
        // input "1" color red
        case 49: 
            colorT = [1,0,0, 1,0,0, 1,0,0];
            colorS = [1,0,0, 1,0,0, 1,0,0, 1,0,0];
            colorC = [1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0];
            if(shape==1){
                triangle_Binding();
            }else if(shape==2){
                square_Binding();
            }else if(shape==3){
                circle_Binding();
            }
            render();
            break
       
       // input "2" color green
        case 50:
            colorT = [0,1,0, 0,1,0, 0,1,0];
            colorS = [0,1,0, 0,1,0, 0,1,0, 0,1,0];
            colorC = [0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0];
            if(shape==1){
                triangle_Binding();
            }else if(shape==2){
                square_Binding();
            }else if(shape==3){
                circle_Binding();
            }
            render();
            break

       // input "3" color blue
        case 51:
            colorT = [0,0,1, 0,0,1, 0,0,1, 0,0,1];
            colorS = [0,0,1, 0,0,1, 0,0,1, 0,0,1];
            colorC = [0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1];
            if(shape==1){
                triangle_Binding();
            }else if(shape==2){
                square_Binding();
            }else if(shape==3){
                circle_Binding();
            }
            render();
            break

        // input "4" color random
        case 52:
            colorT = [Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random()];
            colorS = [Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random()];
            colorC = [Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), 
Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random(), Math.random(),Math.random(),Math.random()];
            if(shape==1){
                triangle_Binding();
            }else if(shape==2){
                square_Binding();
            }else if(shape==3){
                circle_Binding();
            }
            render();
            break

        // input "5" color yellow
        case 53:
            colorT = [1,1,0, 1,1,0, 1,1,0];
            colorS = [1,1,0, 1,1,0, 1,1,0, 1,1,0];
            colorC = [1,1,0, 1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 1,1,0];
            if(shape==1){
                triangle_Binding();
            }else if(shape==2){
                square_Binding();
            }else if(shape==3){
                circle_Binding();
            }
            render();
            break

// input "s" square
        case 83:
            shape = 2;
            square_Binding();
            render();
            break;

        // input "t" triangle    
        case 84:
            shape = 1;
            triangle_Binding();
            render();
            break;    

        // input "c" circle
        case 67:
            shape = 3;
            circle_Binding();
            render();
            break;
    }   
}

//shape data
function triangle_Binding(){
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorT), gl.STATIC_DRAW );
    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}

function square_Binding(){
    gl.useProgram( program2 );
    gl.enableVertexAttribArray( s_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}

function circle_Binding(){
    gl.useProgram( program3 );
    gl.enableVertexAttribArray( ci_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, ciBuffer );
    gl.vertexAttribPointer( ci_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, ci_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );
    ci_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(ci_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}