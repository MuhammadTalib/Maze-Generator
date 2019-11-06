
class Graph{
	constructor(){
		this.nodes=[]
	}
	addNode(node){
		this.nodes.push(node)
	}
	addEdge(node1,node2){
		var e1=new Edge(node1)
		var e2=new Edge(node2)
		
		node2.edges.push(e1)
		node1.edges.push(e2)
		
	}
	BFS(node){
		console.log("BFS")
		let path=new Queue()
		let q = new Queue();
		q.enqueue(this.nodes[0]);
		//q.dequeue(q)
		//console.log("q",q)
		this.nodes[0].visited=true
		path.enqueue(this.nodes[0].node)
		console.log("node ffff",this.nodes)
		//console.log("pop",path.pop())
		path.display()
		var de=q.dequeue(q)
		console.log("de",de)
		q.display()
		var k=0
		while (k!==2) {
			k++
			for(i in de.edges){
				de.edges[i].node.visited=true
				q.enqueue(de.edges[i].node)
				path.enqueue(de.edges[i].node)
				console.log("comparing",de.edges[i].node.node,node)
				
			}
			de=q.dequeue()
			console.log("final de",de)
			q.display()
			//console.log("poP",q.pop())
			path.display()
			//break;
		}
		
		
		
		/*
		vertex->visited=true;
		Edge *CURR=vertex->edge;
		while(CURR!=NULL )
		{
			if( ((Vertex*)(CURR->value))->visited==false)
			{
				((Vertex*)(CURR->value))->visited=true;
				enqueue(&top,(Vertex*)CURR->value);
			}
			CURR=CURR->Next;
		}
		if(top!=NULL)
		{
			BreadthfirstTraversal(dequeue(&top));
		}*/
	}
	display(){
		console.log("PRINTING GRAPH")
		console.log("nodes",this.nodes)
	}
}
class Edge{
	constructor(a){
		this.node=a
	}
}
class Vertex{
	constructor(a){
		this.node=a
		this.visited=false
		this.edges=[]
	}
}
class Queue{
	constructor(){
		this.node=null
		this.next=null
	}
	enqueue(node){
		if(this.node===null){ 
			console.log("in if")
			this.node=node
			this.next=null
		}
		else{
			//console.log("in else")
			
			var curr=this
			while(curr.next!=null){
				curr=curr.next
			}
			curr.next=new Queue()
			curr.next.node=node
			curr.next.next=null
			//console.log("curr",curr,"this",this)
			//this.next=curr
		}
	}
	dequeue(q){
		if(this.node===null ){
			console.log("start is null")
			return null
		}
		else{
			var node=this.node
			if(this.next===null){
				this.node=null
				this.next=null
			}
			else{
				this.node=this.next.node
				this.next=this.next.next
				console.log("this af",this,node)
			}
			return node
		}
	}
	pop(){
		if(this.node===null ){
			console.log("start is null")
			return null
		}
		else {
			var curr=this
			while(curr.next!=null){
				curr=curr.next
			}
			var a=curr
			curr.node=null
			return a
		}
	}
	display(){
		console.log("display queue")
		console.log(this.node)
		var curr=this.next
		while(curr!=null){
			console.log(curr.node)
			curr=curr.next
		}
	}
}