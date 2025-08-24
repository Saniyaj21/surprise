import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/App.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [clickWaves, setClickWaves] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  
  // Refs for scroll animations
  const cardsSectionRef = useRef(null);
  const cardsTitleRef = useRef(null);
  const cardCarouselRef = useRef(null);
  const cardsHintRef = useRef(null);

  // Array of music files - add more as needed
  const musicFiles = [
    '/music1.m4a',
    '/music2.m4a', 
    '/music3.m4a',
    '/music4.m4a',
    '/music5.m4a'
  ];

  // Birthday cards with reasons why she is special
  const birthdayCards = [
    {
      message: "Your smile lights up every room you enter and brings joy to everyone around you."
    },
    {
      message: "You have the most caring heart - always putting others before yourself and making everyone feel loved."
    },
    {
      message: "Your strength and determination inspire everyone who knows you. You never give up on your dreams."
    },
    {
      message: "You're incredibly intelligent and creative, always coming up with amazing ideas that surprise everyone."
    },
    {
      message: "Your sense of humor is unmatched - you can make anyone laugh even on their worst days."
    },
    {
      message: "You're the most loyal friend anyone could ask for, always there when someone needs support."
    },
    {
      message: "Your kindness knows no bounds. You see the good in everyone and help them see it too."
    },
    {
      message: "You're absolutely beautiful inside and out, with a spirit that shines brighter than any star."
    }
  ];

  const playRandomMusic = () => {
    // Stop current music if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Select random music file
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    const randomMusicFile = musicFiles[randomIndex];
    
    // Create new audio element
    const newAudio = new Audio(randomMusicFile);
    
    // Set up event listeners
    newAudio.onended = () => {
      setIsMusicPlaying(false);
      setCurrentAudio(null);
    };

    newAudio.onerror = () => {
      console.log(`Error loading: ${randomMusicFile}`);
      setIsMusicPlaying(false);
      setCurrentAudio(null);
    };

    // Play the music
    newAudio.play().then(() => {
      setCurrentAudio(newAudio);
      setIsMusicPlaying(true);
    }).catch((error) => {
      console.log(`Could not play: ${randomMusicFile}`, error);
      setIsMusicPlaying(false);
      setCurrentAudio(null);
    });
  };

  const stopMusic = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsMusicPlaying(false);
      setCurrentAudio(null);
    }
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      playRandomMusic();
    }
  };

  const handleMessageClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newWave = {
      id: Date.now(),
      x: x,
      y: y,
      timestamp: Date.now()
    };
    
    setClickWaves(prev => [...prev, newWave]);
    
    // Remove wave after animation completes
    setTimeout(() => {
      setClickWaves(prev => prev.filter(wave => wave.id !== newWave.id));
    }, 1000);
  };

  useEffect(() => {
    // Initialize particles.js
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.particlesRefresh();
    } else {
      // Load particles.js script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = () => {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 120,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ['#6366f1', '#8b5cf6', '#f59e0b', '#fbbf24', '#ef4444', '#10b981', '#3b82f6']
            },
            shape: {
              type: ['circle', 'triangle', 'star', 'polygon'],
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 5,
              random: true,
              anim: {
                enable: true,
                speed: 20,
                size_min: 0.5,
                sync: false
              }
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'top',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        });
      };
      document.head.appendChild(script);
    }

    // Scroll Trigger Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsSectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Initial state - hide elements
    gsap.set([cardsTitleRef.current, cardCarouselRef.current, cardsHintRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate elements in sequence
    tl.to(cardsTitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(cardCarouselRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(cardsHintRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6");

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="app">
      {/* Particles.js Container */}
      <div id="particles-js" className="particles-container"></div>
      
      {/* Music Button */}
      <div className="music-controls">
        <button 
          className={`music-btn ${isMusicPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
          title={isMusicPlaying ? 'Stop Music' : 'Play Random Music'}
        >
          {isMusicPlaying ? '🔊' : '🔇'}
        </button>
        
        {/* Music Wave Line */}
        {isMusicPlaying && (
          <div className="music-wave-line">
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
            <div className="wave-segment"></div>
          </div>
        )}
      </div>
      
      <div className="birthday-container">
        <h1 className="birthday-title">
          <div className="title-line">
            <span>H</span>
            <span>a</span>
            <span>p</span>
            <span>p</span>
            <span>y</span>
            <span>&nbsp;</span>
            <span>B</span>
            <span>i</span>
            <span>r</span>
            <span>t</span>
            <span>h</span>
            <span>d</span>
            <span>a</span>
            <span>y</span>
          </div>
          <div className="title-line">
            <span>G</span>
            <span>o</span>
            <span>u</span>
            <span>r</span>
            <span>a</span>
            <span>v</span>
            <span>!</span>
          </div>
        </h1>

        <p className="birthday-message" onClick={handleMessageClick}>
          May you be gifted with life's biggest joys and never-ending bliss.
          After all, you yourself are a gift to earth, so you deserve the best!
        </p>
        
        {/* Click Wave Effects */}
        {clickWaves.map(wave => (
          <div
            key={wave.id}
            className="click-wave"
            style={{
              left: wave.x,
              top: wave.y
            }}
          />
        ))}
      </div>

      {/* Interactive Birthday Cards Section */}
      <div className="cards-section" ref={cardsSectionRef}>
        <h2 className="cards-title" ref={cardsTitleRef}>Why You're Amazing</h2>
        
        <div className="card-carousel" ref={cardCarouselRef}>
          <button 
            className="card-nav-btn prev-btn" 
            onClick={() => setCurrentCard((prev) => (prev - 1 + birthdayCards.length) % birthdayCards.length)}
            aria-label="Previous card"
          >
            ‹
          </button>
          
          <div className="card-container">
            {birthdayCards.map((card, index) => (
              <div
                key={index}
                className={`birthday-card ${index === currentCard ? 'active' : ''}`}
                onClick={() => setCurrentCard(index)}
              >
                <div className="card-content">
                  <div className="card-icon">🎉</div>
                  <p className="card-message">"{card.message}"</p>
                </div>
                <div className="card-footer">
                  <span className="card-number">{index + 1} / {birthdayCards.length}</span>
                  <div className="card-dots">
                    {birthdayCards.map((_, dotIndex) => (
                      <span 
                        key={dotIndex} 
                        className={`dot ${dotIndex === index ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentCard(dotIndex);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="card-nav-btn next-btn" 
            onClick={() => setCurrentCard((prev) => (prev + 1) % birthdayCards.length)}
            aria-label="Next card"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
