window.onload=()=>{
	console.log("window. onload")
	var graph=new Graph()
	
	var a=new Vertex({a:"a"})
	var b=new Vertex({a:"b"})
	var c=new Vertex({a:"c"})
	var d=new Vertex({a:"d"})
	console.log("a",a)
	
	graph.addNode(a)
	graph.addNode(b)
	graph.addNode(c)
	graph.addNode(d)
	
	graph.addEdge(a,b)
	
	
	graph.display()
}