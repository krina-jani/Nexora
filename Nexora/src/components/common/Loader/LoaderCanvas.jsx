import { useEffect, useRef } from "react";

const PARTICLES = 120;

const LoaderCanvas = () => {

    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width;
        let height;

        function resize(){

            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

        }

        resize();

        window.addEventListener("resize",resize);

        const mouse = {

            x: width/2,
            y: height/2
        };

        window.addEventListener("mousemove",(e)=>{

            mouse.x = e.clientX;
            mouse.y = e.clientY;

        });

        class Particle{

            constructor(){

                this.reset();

                this.y=Math.random()*height;

            }

            reset(){

                this.x=Math.random()*width;

                this.y=height+Math.random()*200;

                this.size=Math.random()*2+1;

                this.speed=Math.random()*0.5+0.2;

                this.opacity=Math.random()*0.7+.2;

                this.vx=(Math.random()-.5)*0.4;

            }

            update(){

                this.y-=this.speed;

                this.x+=this.vx;

                if(this.y<-50){

                    this.reset();

                }

            }

            draw(){

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI*2
                );

                ctx.fillStyle=`rgba(70,170,255,${this.opacity})`;

                ctx.shadowBlur=15;
                ctx.shadowColor="#38bdf8";

                ctx.fill();

            }

        }

        const particles=[];

        for(let i=0;i<PARTICLES;i++){

            particles.push(new Particle());

        }

        function connect(){

            for(let a=0;a<PARTICLES;a++){

                for(let b=a+1;b<PARTICLES;b++){

                    const dx=particles[a].x-particles[b].x;
                    const dy=particles[a].y-particles[b].y;

                    const dist=Math.sqrt(dx*dx+dy*dy);

                    if(dist<120){

                        ctx.beginPath();

                        ctx.moveTo(
                            particles[a].x,
                            particles[a].y
                        );

                        ctx.lineTo(
                            particles[b].x,
                            particles[b].y
                        );

                        ctx.strokeStyle=`rgba(56,189,248,${0.15-(dist/1200)})`;

                        ctx.lineWidth=1;

                        ctx.stroke();

                    }

                }

            }

        }

        function mouseGlow(){

            const gradient=ctx.createRadialGradient(

                mouse.x,
                mouse.y,
                0,

                mouse.x,
                mouse.y,
                250

            );

            gradient.addColorStop(0,"rgba(56,189,248,.18)");
            gradient.addColorStop(.5,"rgba(56,189,248,.05)");
            gradient.addColorStop(1,"transparent");

            ctx.fillStyle=gradient;

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

        }

        function animate(){

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            mouseGlow();

            particles.forEach((p)=>{

                p.update();

                p.draw();

            });

            connect();

            requestAnimationFrame(animate);

        }

        animate();

        return()=>{

            window.removeEventListener("resize",resize);

        }

    },[]);

    return(

        <canvas

            className="loader-canvas"

            ref={canvasRef}

        />

    )

}

export default LoaderCanvas;