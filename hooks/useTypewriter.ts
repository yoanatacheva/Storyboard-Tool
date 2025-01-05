import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let currentIndex = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return displayedText;
}