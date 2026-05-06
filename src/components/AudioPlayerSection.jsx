import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react';
import CTAButton from './CTAButton';
import './AudioPlayerSection.css';

const AudioPlayerSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const changeProgress = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const skipTime = (amount) => {
    audioRef.current.currentTime += amount;
  };

  return (
    <section className="media-section section-padding">
      <div className="container">
        <div className="media-container">
          {/* Columna Izquierda: Imagen */}
          <div className="media-left">
            <img src="/Lectura de Libro Somos infieles - 3.png" alt="Lectura del libro" className="media-image" />
          </div>
          
          {/* Columna Derecha: Texto + Reproductor */}
          <div className="media-right">
            
            <div className="review-card">
              <div className="review-header">
                <span className="review-source" style={{color: '#aaa', fontSize:'0.8rem', textAlign: 'right', width: '100%'}}>Felipe Beltrán</span>
              </div>
              <h3 className="review-title">Sobre la Fidelidad</h3>
              <p className="review-text">
                "FIDELIDAD: Lealtad profesada por uno mismo e incluso por otras personas, cuando se alcanza la coherencia entre pensamiento, palabra y obra, logrando reproducir una realidad de manera puntual y exacta, en la que no exista la posibilidad de albergar la mentira como un recurso cotidiano en el relacionamiento de los seres humanos."
              </p>
            </div>
            
            <div className="audio-card">
              <div className="audio-header">
                <span className="audio-badge">FB</span>
                <span className="audio-subtitle">Somos infieles</span>
              </div>
              
              <div className="audio-title-row">
                <h3 className="audio-title">Capítulo 4: <br /><span>"No eres dueño de nada"</span></h3>
                <span className="audio-sample-tag">MUESTRA</span>
              </div>
              
              <p className="audio-context-text">
                En este crudo fragmento, exploramos ese instante donde la posibilidad de elegir se desvanece y te enfrentas a la realidad de que no eres dueño de nada.
              </p>
              
              <div className="audio-player-container">
                <audio 
                  ref={audioRef} 
                  src="/Audiolibro - Clip de muestra - C 4.mp3" 
                  preload="metadata" 
                  onEnded={() => setIsPlaying(false)}
                />
                
                <input 
                  type="range" 
                  className="progress-bar" 
                  ref={progressBarRef}
                  value={currentTime}
                  min="0"
                  max={duration || 0}
                  onChange={changeProgress}
                />
                
                <div className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                
                <div className="controls">
                  <button className="control-btn secondary" onClick={() => skipTime(-10)}><RotateCcw size={20} /></button>
                  <button className="control-btn primary" onClick={togglePlayPause}>
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                  <button className="control-btn secondary" onClick={() => skipTime(10)}><RotateCw size={20} /></button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <CTAButton text="Comprar el libro" className="mt-16" darkNote={true} />
      </div>
    </section>
  );
};

export default AudioPlayerSection;
