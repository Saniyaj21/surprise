import React, { useEffect, useState } from 'react'
import './styles/App.css'

const App = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Array of music files - add more as needed
  const musicFiles = [
    '/music1.m4a',
    '/music2.m4a', 
    '/music3.m4a',
    '/music4.m4a',
    '/music5.m4a'
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

        <p className="birthday-message">
          May you be gifted with life's biggest joys and never-ending bliss.
          After all, you yourself are a gift to earth, so you deserve the best!
        </p>
      </div>
    </div>
  )
}

export default App
