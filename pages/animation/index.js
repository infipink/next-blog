// https://greensock.com/docs/v3
import { useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

import { useIsomorphicLayoutEffect } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

// A Timeline is a container for Tweens.

export default function Scroll() {
  const main = useRef();
  const tl = useRef();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector('.scBox');
      boxes.forEach((box, i) => {
        gsap.to(box, {
          x: '50vw',
          // y: '50vh',
          scrollTrigger: {
            trigger: box,
            start: 'bottom bottom',
            end: 'top 20%',
            scrub: true,
          },
          opacity: 0.5,
          duration: i + 1,
        });
      });

      const rBoxes = self.selector('.r-item');
      tl.current = gsap
        .timeline()
        .to(rBoxes[0], { x: 220, rotation: 360 })
        .to(rBoxes[1], { x: -220, rotation: -360 }, '<')
        .to(rBoxes[2], { y: -166 })
        .reverse();
    }, main);
    return () => ctx.revert();
  }, []);

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  return (
    <div className="flex flex-col justify-center items-center h-fit" ref={main}>
      <div className="w-screen h-screen bg-orange-300 flex flex-col justify-center items-center">
        <div>
          <button onClick={toggleTimeline}>Toggle Timeline</button>
        </div>
        <div className="r-item bg-red-400 w-[200px] h-[200px] mb-10"></div>
        <div className="r-item bg-red-400 w-[200px] h-[200px] mb-10"></div>
        <div className="r-item bg-red-400 w-[200px] h-[200px] mb-10"></div>
      </div>
      <div className="w-1/4 h-40 bg-lime-400 mb-20 scBox">box</div>
      <div className="w-1/4 h-40 bg-lime-400 mb-20 scBox">box</div>
      <div className="w-1/4 h-40 bg-lime-400 mb-20 scBox">box</div>
      <div className="w-screen h-screen bg-slate-400 box-end"></div>
    </div>
  );
}
