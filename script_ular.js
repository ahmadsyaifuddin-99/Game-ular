window.onload=function()
{
	var
canvas=document.getElementById("game"), ctx=canvas.getContext("2d");
	canvas.style.border="1px solid #000"

	var size=15,
		scale=20;

	canvas.width=size*scale;
	canvas.height=size*scale;

	var view=document.getElementById("view")window.onresize=function()
	{
		var scale=Math.min(innerHeight/500, innerWidth/300);
		var t="translate(-50%,-50%)scale("+scale+") translate(0%,0%)";
		view.style.WebkitTransform=t;
		view.style.MozTransform=t;
		view.style.MsTransform=t;
		view.style.oTransform=t;
		view.style.transfrom=t;
	}
	window.onresize();

	var len=5;
	var x=y=0;
	var angle=dir=0;
	var queue=[];

	var fx, fy;
	function setFood()
	{
		do {

fx=Math.floor(Math.random()*size);

fy=Math.floor(Math.random()*size);
		} while(queue.indexOf([fx,fy])>-1);
	}
	setFood();
	function setDir(n)
	{
		var g=(dir-1)%4,
			h=(dir+1)%4;
		if(g<0) g+=4;
		if(h<0) h+=4;
		if(g==n||h==n)
		{
			dir=n;
			angle=n*pi/2;
		}
	}

	function rect(hue,x,y)
	{
		ctx.fillStyle="hsl("+hue+",100%,25%)";
		ctx.fillRect(x,y,1,1);
ctx.fillStyle="hsl("+hue+",100%,30%)";
		ctx.fillRect(x,y,0.9,0.9)
	}

	var buttons=document.querySelectorAll("#arrow-keys .game-button");
	var replay=document.getElementById("replay");
	replay.onclick=function()
	{
		x=y=0;
		dir=0;
		len=5;
		queue=[];
		angle=0;
		scoreElem.innerHTML=len;
		setFood();
		id=setInterval(loop,framerate);
		replay.style.display="none";
	}

	var pi=Math.PI;
	buttons(0).onclick=function(){setDir(2);}
	buttons(1).onclick=function(){setDir(3;}
	buttons(2).onclick=function(){setDir(0);}
	buttons(3).onclick=function(){setDir(1);}

	var framerate=1000/5;
	var id=setInterval(loop,framerate);
	var scoreElem=document.getElementById("score");
	function loop()
		{
			x+=Math.round(Math.cos(angle));
			y+=Math.round(Math.sin(angle));
			if(x<0) x=size-1;
			if(x>size-1) x=0;
			if(y<0) y=size-1;
			if(y>size-1) y=0;
			queue.unshift([x,y]);

			if(queue.length>len) queue.pop();
			if(x==fx && y==fy)
			{
				len++
				setFood();
				scoreElem.innerHTML=len;
			}

			ctx.save();
			ctx.scale(scale,scale);
			ctx.clearRect(0,0,size,size);

			rect("340",fx,fy);
			for(var i=0;i<queue.length;i++)
			{
				var qx=queue[i][0],
					qy=queue[i][1];
				rect("150",qx,qy);
				if(i==0) continue;
				if(x==qx&&y==qy);
				{
					clearInterval(id);
					replay.style.display="block";
				}
			}

			ctx.restore();
		}

		// body...
	}
	

