

function loco(){
    
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();




const marqueeText = () =>{
    let tl = gsap.timeline({scrollTrigger: {
        trigger: ".marq-text .text",
        scroller: "#main",
        start: "top 150%",
        end: "top -50%",
        scrub: 1,
    }});
    
    tl.to(".text1", {
        marginLeft: "0%",
    },'a')
    
    tl.to(".text2", {
        marginLeft: "-180%",
    },'a')
    
    
    gsap.from(".sub-page", {
        scale: 0.9,
        y: 20,
        ease: "expo.inOut",
        duration: 0.9,
        scrollTrigger: {
            scroller: "#main",
            trigger: ".sub-page",
            start: "top 110%",
            end: "top 90%",
        }
    })
}
marqueeText()

const textFadeEffect = () =>{
    const h1Elements = document.querySelectorAll('.hoverable');

h1Elements.forEach(h1 => {
    h1.addEventListener('mouseenter', () => {
        // Apply the hover effect to the hovered element
        h1.classList.add('hovered');

        // Apply the not-hovered effect to the other elements
        h1Elements.forEach(otherH1 => {
            if (otherH1 !== h1) {
                otherH1.classList.add('not-hovered');
            }
        });
    });

    h1.addEventListener('mouseleave', () => {
        // Remove the hover effect from the hovered element
        h1.classList.remove('hovered');

        // Remove the not-hovered effect from all elements
        h1Elements.forEach(otherH1 => {
            otherH1.classList.remove('not-hovered');
        });
    });
});
}
textFadeEffect()


const imageHoverEffect = () =>{
    let section = document.querySelector(".floating-images")
    section.addEventListener("mousemove", function(details){
        document.querySelectorAll(".image").forEach((elem)=>{
            const position = elem.getAttribute("value")
    
            var x = (window.innerWidth + details.clientX * position)/200
            var y = (window.innerHeight + details.clientY * position)/200
    
            elem.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    })
}
imageHoverEffect()