import "../css/complement.css"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Compliments = ({ isGreetingDone }) => {
  console.log(isGreetingDone)
  const containerRef = useRef(null);
  const refs = Array(8).fill(0).map(() => useRef(null));
  const heartsContainerRef = useRef(null);

  const createSparkle = () => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.fontSize = `${Math.random() * 15 + 10}px`;
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = '100vh';
    sparkle.style.opacity = '0';
    sparkle.style.zIndex = '98';
    containerRef.current?.appendChild(sparkle);
    return sparkle;
  };

  const createFloatingHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = `${Math.random() * 20 + 15}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = '100vh';
    heart.style.opacity = '0';
    heart.style.zIndex = '99';
    heartsContainerRef.current?.appendChild(heart);
    return heart;
  };

  useEffect(() => {
    if (!isGreetingDone) return;

    // Hide all messages initially
    gsap.set(refs.map(ref => ref.current), { opacity: 0, y: 50 });
    gsap.set(containerRef.current, { display: 'flex' });

    const tl = gsap.timeline();

    // Sparkle animation interval
    const sparkleInterval = setInterval(() => {
      const sparkle = createSparkle();
      gsap.to(sparkle, {
        top: '-50px',
        left: `+=${Math.random() * 100 - 50}px`,
        opacity: 1,
        duration: 2,
        ease: "power1.out",
        onComplete: () => sparkle.remove()
      });
    }, 500);

    // Regular compliments animations
    setTimeout(() => {
      refs.slice(0, -1).forEach((ref, index) => {
        tl.to(ref.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        })
          .to(ref.current, {
            y: -10,
            duration: 0.5,
            repeat: 1,
            yoyo: true,
            ease: "power1.inOut"

          })
          .to(ref.current, {
            opacity: 0,
            y: -50,
            duration: 0.8,
            delay: 1
          });
      });

      // Special "I love you" animation
      tl.to(refs[refs.length - 1].current, {
        opacity: 1,
        scale: 1.2,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      })
        .call(() => {
          // Create heart burst
          for (let i = 0; i < 46; i++) {
            setTimeout(() => {
              const heart = createFloatingHeart();
              gsap.to(heart, {
                top: `${Math.random() * 70 + 15}vh`,
                left: `+=${Math.random() * 200 - 100}px`,
                rotation: Math.random() * 360,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.8,
                duration: Math.random() * 3 + 2,
                ease: "power1.out",
                onComplete: () => heart.remove()
              });
            }, i * 100);
          }
        });
    }, 1700)

    return () => clearInterval(sparkleInterval);
  }, [isGreetingDone]);

  return (
    <div ref={containerRef} className="compliments-container"
      style={{ display: 'none' }}
    >
      <div ref={heartsContainerRef} className="hearts-container" />
      <div className="text-container">
        <h1 ref={refs[0]} className="compliment-text">
          Nah ini kan backgroundnya lebih cocok dengan kamu
        </h1>
        <h1 ref={refs[1]} className="compliment-text">
          Warna yang cute cocok dengan orang yang Cute
        </h1>
        <h1 ref={refs[2]} className="compliment-text">
          Walau aku gak bisa pulang nemenin valentine mu
        </h1>
        <h1 ref={refs[3]} className="compliment-text">
          Semoga ini bisa menyembuhkan rasa kangenmu hahahahahah
        </h1>
        <h1 ref={refs[4]} className="compliment-text">
          gak kangen?
        </h1>
        <h1 ref={refs[5]} className="compliment-text">
          Iya tau kok, cuman saya berarti yang kangen denganmu
        </h1>
        <h1 ref={refs[6]} className="compliment-text">
          Mungkin kau sudah bosan baca ini tapi saya ndak bosan ngetiknya hahahahaha
        </h1>
        <h1 ref={refs[7]} className="compliment-text love-text">
          I love you
          <p>Happy Valentine</p>
        </h1>
      </div>
    </div>
  );
};

export default Compliments;
