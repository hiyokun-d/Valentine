import "../css/greetings.css"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Greetings = ({ setBackgroundToPink, setGreetingsDone }) => {
  const containerRef = useRef(null);
  const greeting1Ref = useRef(null);
  const greeting2Ref = useRef(null);
  const greeting3Ref = useRef(null);

  // Function to create a heart element
  const createHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = '100vh';
    heart.style.opacity = '0';
    heart.style.zIndex = '99';
    containerRef.current.appendChild(heart);
    return heart;
  };

  // Function to animate a single heart
  const animateHeart = () => {
    const heart = createHeart();
    gsap.to(heart, {
      top: `-50px`,
      left: `+=${Math.random() * 100 - 50}px`,
      rotation: Math.random() * 360,
      opacity: 1,
      duration: Math.random() * 2 + 3,
      ease: "power1.out",
      onComplete: () => heart.remove()
    });
  };

  useEffect(() => {
    // Initial setup
    gsap.set([greeting1Ref.current, greeting2Ref.current, greeting3Ref.current], {
      opacity: 0,
      scale: 0.5,
      rotate: -5
    });

    // Create floating hearts interval
    const heartInterval = setInterval(animateHeart, 300);

    const tl = gsap.timeline({
      onComplete: () => {
        // Cleanup hearts interval when animation completes
        clearInterval(heartInterval);

        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          delay: 1,
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          }
        });
      }
    });

    // Enhanced animation sequence
    tl.to(greeting1Ref.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })
      .to(greeting1Ref.current, {
        y: -10,
        duration: 0.5,
        repeat: 1,
        yoyo: true,
        ease: "power1.inOut"
      })
      .to(greeting1Ref.current, {
        opacity: 0,
        scale: 1.2,
        rotate: 5,
        duration: 0.4,
        delay: 0.5
      })

      .to(greeting2Ref.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      })
      .to(greeting2Ref.current, {
        scale: 1.1,
        duration: 0.3,
        repeat: 1.5,
        yoyo: true,
        ease: "power1.inOut"
      })
      .to(greeting2Ref.current, {
        opacity: 0,
        scale: 1.2,
        rotate: -5,
        duration: 0.8,
        delay: 1.5
      })
      .to(greeting3Ref.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
      })
      .to(greeting3Ref.current, {
        scale: 1.15,
        duration: 0.4,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut"
      })
      .call(() => {
        setBackgroundToPink(true);

        for (let i = 0; i < 25; i++) {
          setTimeout(animateHeart, i * 100);
        }
        setGreetingsDone(true)
      }, [], "+=0.2");

    return () => clearInterval(heartInterval);
  }, [setBackgroundToPink]);

  return (
    <div ref={containerRef} className="greetings-container">
      <div className="text-container">
        <h1 ref={greeting1Ref} className="greeting-text">
          HALOO, baca dengan cepat yaaaa
        </h1>
        <h1 ref={greeting2Ref} className="greeting-text">
          Mungkin sebelum mulai, kita bisa ubah backgroundnya dulu kali ya
        </h1>
        <h1 ref={greeting3Ref} className="greeting-text">
          Karena warnanya kurang lucu, kita ubah dulu soalnya warna ini lebih cocok denganmu
        </h1>
      </div>
    </div>
  );
};

export default Greetings;
