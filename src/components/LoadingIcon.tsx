import React, { useEffect, useRef, RefObject } from 'react';
import { Player } from '@lordicon/react';
import ICON from '../assets/wired-flat-27-globe.json';

const LoadingIcon: React.FC = () => {
  const playerRef: RefObject<Player> = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.play();
  }, []);

  return (
    <Player
      ref={playerRef}
      icon={ICON}
      size={96}
      onComplete={() => playerRef.current?.playFromBeginning()}
    />
  );
};

export default LoadingIcon;
