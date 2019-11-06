//import {Graph} from "./graph"
window.onload=myInit()
var rows;
var columns;
var w;
var h;
var cells;
var grid;
var cell_graph;
var cell_boundry;
var selected_cells;
var ctx
var cvs
var whiteCells
var timer
var coloring
var colorFlag
var timer;
var startPos
var currentPos
var move
var x_timer
var stop_timer,source,dest
var i = 0,j=0,k
var index                     //  set your counter to 1
var delayTime

function myInit(){
	 
	//i=0
	//delayLoop(con,"a",12);
	
	/*if(localStorage.getItem("rows")!=null){
		rows=localStorage.getItem("rows")
		columns=localStorage.getItem("columns")
		w=localStorage.getItem("w")
		h=localStorage.getItem("h")
		
	}
	else{
		rows=5;
		columns=5;
		w=10;
		h=10;
		localStorage.setItem("rows",rows)
		localStorage.setItem("columns",columns)
		localStorage.setItem("w",w)
		localStorage.setItem("h",h)
	}*/
	rows=15;
	columns=15;
	w=20;
	h=20;
	colorFlag=0
	delayTime=10
	
	cells=[]
	cell_boundry=[]
	selected_cells=[]
	cell_graph=new Graph();
	
	cvs=document.getElementById("mycanvas");
	
	if(cvs.getContext){
		ctx=cvs.getContext("2d");
		
		drawGrid()
		identifyWalls()
		
		button(450,10,100,40,"Easy",easy)
		button(450,70,100,40,"Medium",medium)
		button(450,130,100,40,"Hard",hard)
		
		//removeWalls()
		//cell_graph.BFS(cell_graph.nodes[3*3-1].node)
		//colorTheCells(selected_cells,"lightgreen")
		//ctx.fillStyle="blue";
		//ctx.fillRect(1,1,28,28);
			
		ctx.stroke();
	}
	document.body.addEventListener('keydown',function(e){
		e=event||window.event;
		
		var keyCode=e.charCode || e.keyCode;
		console.log("keydown",keyCode)
		if(keyCode=== 40){
			moveDown()
		}
		if(keyCode=== 39){
			moveRight()
		}
		if(keyCode===38){
			moveUp()
		}
		if(keyCode===37){
			moveLeft()
		}
		cell_graph.display()
		
	})
	
}
function easy(){
	console.log("Easy")
	rows=5
	columns=5
	w=80
	h=80
	document.location.reload()
}
function medium(){
	console.log("Medium")
}
function hard(){
	console.log("Hard")
}
function drawInitAndDest(){
	startPos=cell_graph.nodes[0]
	drawBall(startPos.node.x,startPos.node.y)
	currentPos=startPos
	drawDestination(w/2,w/2)
	drawDestination(rows*w-(w/2),columns*h-(h/2))
}
function moveRight(){
	
			newPos=cell_graph.nodes[(currentPos.node.i*rows)+currentPos.node.j+rows]
			//console.log("mr",isPathAlreadyExist(currentPos.edges,newPos.node))
			if(isPathExist(currentPos.edges,newPos.node)){
				c=currentPos.node
				currentPos=newPos
				moveBall(c,newPos.node)
				currentPos=newPos
			}
}
function moveLeft(){
	
			newPos=cell_graph.nodes[(currentPos.node.i*rows)+currentPos.node.j-rows]
			//console.log("mr",isPathAlreadyExist(currentPos.edges,newPos.node))
			if(isPathExist(currentPos.edges,newPos.node)){
				c=currentPos.node
				currentPos=newPos
				moveBall(c,newPos.node)
				currentPos=newPos
			}
}
function moveDown(){
	newPos=cell_graph.nodes[(currentPos.node.i*rows)+currentPos.node.j+1]
	//newPos=new Vertex(n.node)
	if(isPathExist(currentPos.edges,newPos.node)){
		c=currentPos
		currentPos=newPos
		moveBall(c.node,newPos.node)
	}
}
function moveUp(){
	newPos=cell_graph.nodes[(currentPos.node.i*rows)+currentPos.node.j-1]
	console.log("newPos",newPos)
	//console.log(findNode(newPos.node))
	console.log("current",currentPos)
	if(isPathExist(currentPos.edges,newPos.node)){
		console.log("Path exist")
		c=currentPos
		currentPos=newPos
		console.log("NJKHDJK",c.node,newPos.node)
		moveBall(c.node,newPos.node)
	}
}

function removeWalls(){
	var x=0,y=0,rec=0,drawRec=0;
		for(i in cell_graph.nodes){
			for(j in cell_graph.nodes[i].edges){
				x=0
				y=0
				if(cell_graph.nodes[i].node.j===cell_graph.nodes[i].edges[j].node.node.j){
					if(cell_graph.nodes[i].node.i<=cell_graph.nodes[i].edges[j].node.node.i){
						x=2;
						drawRec=1;
					}
					else if(cell_graph.nodes[i].node.i>=cell_graph.nodes[i].edges[j].node.node.i){
						x=-2
						drawRec=1;
					}
					else 
						drawRec=0;
				}
				else if(cell_graph.nodes[i].node.i===cell_graph.nodes[i].edges[j].node.node.i){
					
					if(cell_graph.nodes[i].node.j<=cell_graph.nodes[i].edges[j].node.node.j){
						y=2;
						drawRec=1;
					}
					else if(cell_graph.nodes[i].node.j>=cell_graph.nodes[i].edges[j].node.node.j){
						y=-2
						drawRec=1;
					}
					else drawRec=0;
				}
		
				else{
					drawRec=0
				}
				if(drawRec===1){
				
				ctx.fillStyle="white";
				ctx.fillRect(cell_graph.nodes[i].node.i*w+1+x,cell_graph.nodes[i].node.j*h+1+y,w-2,h-2);
				ctx.stroke();
				rec+=1
				}
			}
		}
		
}
function colorCell(cell,color){
	
		ctx=cvs.getContext("2d");
		//console.log("coloring the cell",cell)
		ctx.fillStyle=color;
		ctx.fillRect(cell.node.x+1,cell.node.y+1,w-2,h-2);
		ctx.stroke()
}
function fingNewEdge(){
	var ne=generateRandom(cell_boundry.length)
	return cell_boundry[ne]
}
function findNeighbour(cell){
	var i,j
	for(i in selected_cells){
		if(selected_cells[i].i===cell.i){
			console.log("i==i",selected_cells[i].i,cell.i)
			for(j=selected_cells[i].j+1;;){
				if(j===cell.j){
					console.log(j==j)
					var s={x:selected_cells.x,y:selected_cells*h*j,i:i,j:j}
					cell_graph.addEdge(cell,s,9999)
					break;

				}
				else if(j+1===rows-1){
					break;
				}
				else{
					j++;
				}
			}
		}
		else{
			console.log("in outer else")
			
		}
	}
}
function include(arr, obj) {
	var i
    for(i=0; i<arr.length; i++) {
	if (arr[i].x === obj.x && arr[i].y === obj.y){
		return true
	}
	else{ 
	return false
	}
    }
}
function remove(arr, obj){
	var i
	for( i = 0; i < arr.length; i++){ 
		if ( arr[i].child.node.x === obj.node.x && arr[i].child.node.y === obj.node.y) {
		arr.splice(i, 1);
		
    }
}
}
function removeOverwrite(){
	var i
	for(i=0;i<selected_cells.length;i++){
		remove(cell_boundry,selected_cells[i])
	}
}
function ifAlreadyExist(arr,obj){
	var ret=false
	for(i in arr){
		if((arr[i].child.node.i === obj.node.i) && (arr[i].child.node.j===obj.node.j)){ 
			ret=true
		}
	}
	return ret
}
function identifyBoundry(cell){
	var a;
	if(cell.node.j!=0) {
		var obj=findNode({x:cell.node.x,y:cell.node.y-h,i:cell.node.i,j:cell.node.j-1})
		if(!ifAlreadyExist(cell_boundry,obj)){
			cell_boundry.push({child:obj,parent:cell})
		}
	}
	if(cell.node.i!=0){
		var obj=findNode({x:cell.node.x-w,y:cell.node.y,i:cell.node.i-1,j:cell.node.j})
		if(!ifAlreadyExist(cell_boundry,obj)) 
			cell_boundry.push({child:obj,parent:cell})
	}	
	if(cell.node.j!=rows-1){
		var obj=findNode({x:cell.node.x,y:cell.node.y+h,i:cell.node.i,j:cell.node.j+1})
		if(!ifAlreadyExist(cell_boundry,obj)) 
			cell_boundry.push({child:obj,parent:cell})
	}
	if(cell.node.i!=columns-1){
		var obj=findNode({x:cell.node.x+w,y:cell.node.y,i:cell.node.i+1,j:cell.node.j})
		if(!ifAlreadyExist(cell_boundry,obj)) 
			cell_boundry.push({child:obj,parent:cell})
	}
	removeOverwrite()
}
function findNode(node){
		var a=cell_graph.nodes.filter(a=>  a.node.i===node.i && a.node.j===node.j)
		return a[0]
}
function isPathExist(arr,obj){
	var ret=false;
	var i
	for (i in arr){
		if((arr[i].node.node.i===obj.i) && (arr[i].node.node.j===obj.j)){
			ret=true
		}
	}
	return ret;
}
function isPathAlreadyExist(arr,obj){
	
	var ret=false;
	var i
	for (i in arr){
		if((arr[i].node.i===obj.i) && (arr[i].node.j===obj.j)){
			ret=true
		}
	}
	return ret;
}
function delayColor (func,cell,color,len) {
	//console.log("dlay",cell,"len",len)	
	setTimeout(function () {  
		//console.log("index",index,cell,cell[index],cell.length)
		if (j < len-1) {
		//console.log("whyyyy",cell[index])
		if(cell[index]!==undefined) func(cell[index].child,color)
		j++
		index++;
        delayColor(func,cell,color,len);          
	}                       
	}, delayTime,func,cell,color,len)
}
function IdentifyBoudryAndDelayColor(time,leng){
	//console.log("leng",leng,time,k)
	setTimeout(function(){
		if(k<leng-1){
			
			//console.log("dil roya k ankh bhar aaii",i)
			j=0
			var newEdge=fingNewEdge()
			cell_graph.addEdge(newEdge.parent,newEdge.child)
			removeWalls()
			var new_edge_ref=findNode(newEdge.child.node)
			selected_cells.push(new_edge_ref)
			//console.log("new Edge",newEdge)
			//cell_graph.display()
			colorCell(newEdge.child,"white")
			identifyBoundry(new_edge_ref)
			//console.log("cell boundtry" ,cell_boundry.length)
			index=0
			time=(cell_boundry.length*delayTime)-delayTime
			delayColor(colorCell,cell_boundry,"pink",cell_boundry.length)
			k++
			IdentifyBoudryAndDelayColor(time,leng)
		}
		else if(k===leng-1){
			drawInitAndDest()
		}
	},time,leng)
} 
function identifyWalls(){
	
	var init=cell_graph.nodes[generateRandom(cell_graph.nodes.length)]	//randomly select a cell
	index=0
	i=0
	j=0
	colorCell(init,"white")
	selected_cells.push(init)
	identifyBoundry(init)
	delayColor(colorCell,cell_boundry,"pink",cell_boundry.length)
	i=0
	k=0
	IdentifyBoudryAndDelayColor((cell_boundry.length*delayTime)-delayTime,rows*columns)
	
	
	/*//console.log("disp",cell_boundry)
	//delayColor(colorCell,cell_boundry[index],"pink",cell_boundry.length)
	
	while(true){
		if(cell_boundry.length>0){
			
			var newEdge=fingNewEdge()
			cell_graph.addEdge(newEdge.parent,newEdge.child)
			var new_edge_ref=findNode(newEdge.child.node)
			selected_cells.push(new_edge_ref)
			console.log("new Edge",newEdge)
			//cell_graph.display()
			colorCell(newEdge.child,"lightgreen")
			identifyBoundry(new_edge_ref)
			
			//for(i in cell_boundry){
				//console.log("i",cell_boundry[i])
				
				console.log("cell boundry",cell_boundry)
				//delayColor(colorCell,cell_boundry[index].child,"pink",cell_boundry.length)
				//colorCell(cell_boundry[i].child,"pink")
			//}
			
		
		}
		else{
			colorTheCells(cell_boundry,"pink")
			//colorTheCells(selected_cells,"gray")
			break
		}
	}*/
	cell_graph.display()
}
function drawGrid(){
	var rect={
			x:0,
			y:0,
			width:w,
			height:h
		}
		grid=new Path2D();
		var i,j;
		for(i=0;i<rows;i++){
			for(j=0;j<columns;j++){
				drawRect(grid,rect)
				var n=new Vertex({x:rect.x,y:rect.y,i,j})
				cell_graph.addNode(n)
				rect.y+=h;
			}
			rect.y=0;
			rect.x+=w;
		}
		ctx.fillStyle="lightgrey"
		ctx.fill(grid);
		ctx.lineWidth=2;
		ctx.zIndex=0;
		ctx.strokeStyle="#000000"
		ctx.stroke(grid)
	
}
function drawRect(grid,rect){
	grid.rect(rect.x,rect.y,rect.width,rect.height);
}
function generateRandom(number){
	return Math.floor(Math.random() * number);
}
function drawBall(x,y){
      var radius = (w/3)-2;
      ctx.beginPath();
      ctx.arc((x*2+w)/2,(y*2+h)/2, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'darkgreen';
      ctx.stroke();
    
}
function drawDestination(x,y){
	
      var radius = (w/3)-1;
      ctx.beginPath();
      ctx.arc(x,y, radius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'parrot';
      ctx.stroke();
    
}
function moveBall(s,d){
	console.log("move ball")
	var new_s=new Vertex(s)
	var new_d=new Vertex(d)
	console.log("newwww",{x:new_s.node.x,y:new_s.node.y,i:new_s.node.i,j:new_s.node.j},new_d.node)
	source={x:new_s.node.x,y:new_s.node.y,i:new_s.node.i,j:new_s.node.j}
	dest={x:new_d.node.x,y:new_d.node.y,i:new_d.node.i,j:new_d.node.j}
	stop_timer=false
	x_timer=setInterval(animateBall,2,{x:new_s.node.x,y:new_s.node.y,i:new_s.node.i,j:new_s.node.j},new_d.node);
}
function animateBall(s,d){
	if(stop_timer===false){
		console.log("s,d",source,dest)
		drawBall(source.x,source.y)
		if(source.j===dest.j ){
			if(source.i<dest.i){
				if(source.x>dest.x){
					stop_timer=true
					clearInterval(x_timer)
				}
				drawBall(source.x,source.y)
				source.x+=1
			}
			else if(source.i>dest.i){
				if(source.x<dest.x){
					stop_timer=true
					clearInterval(x_timer)
				}
				drawBall(source.x,source.y)
				source.x-=1
			}
			
		}
		else if(source.i===dest.i ){
			if(source.j<dest.j){
				if(source.y>dest.y ){
					stop_timer=true
					clearInterval(x_timer)
					drawBall(source.x,source.y)
				}	 
				console.log("incre")
				source.y+=1
			}
			else if(source.j>dest.j){
				if(source.y<dest.y ){
					stop_timer=true
					clearInterval(x_timer)
					drawBall(source.x,source.y)
				}
				console.log("decre")
				source.y-=1
			}
		}
		
	}
}






















