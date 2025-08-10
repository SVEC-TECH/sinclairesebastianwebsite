import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, MoreHorizontal, ArrowLeft } from 'lucide-react';

interface MusicPlayerProps {
  onBack: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ onBack }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const albums = [
    {
      id: 1,
      title: "Frozen 2",
      artist: "Sseruwagi Sinclaire Sebastian",
      year: "2019",
      image: "/Frozen_2_soundtrack.png",
      description: "The enchanting soundtrack to Disney's Frozen 2, featuring original compositions and orchestral arrangements that capture the magic of Elsa and Anna's journey.",
      genre: "Film Score",
      duration: "1h 23m",
      tracks: [
        { title: "All Is Found", duration: "3:31", audio: "/audio/track1.mp3" },
        { title: "Some Things Never Change", duration: "3:36", audio: "/audio/track2.mp3" },
        { title: "Into the Unknown", duration: "3:26", audio: "/audio/track3.mp3" },
        { title: "When I Am Older", duration: "2:48", audio: "/audio/track4.mp3" },
        { title: "Reindeer(s) Are Better Than People", duration: "0:51", audio: "/audio/track5.mp3" },
        { title: "Lost in the Woods", duration: "3:35", audio: "/audio/track6.mp3" },
        { title: "Show Yourself", duration: "3:38", audio: "/audio/track7.mp3" },
        { title: "The Next Right Thing", duration: "3:22", audio: "/audio/track8.mp3" }
      ]
    },
    {
      id: 2,
      title: "Mary Poppins Returns",
      artist: "Sseruwagi Sinclaire Sebastian",
      year: "2018",
      image: "/Mary_Poppins_Returns_Soundtrack.jpg",
      description: "A magical collection of songs and score from the beloved sequel, blending classic musical theatre with modern orchestration and whimsical melodies.",
      genre: "Musical",
      duration: "1h 15m",
      tracks: [
        { title: "Overture", duration: "2:15", audio: "/audio/track1.mp3" },
        { title: "Can You Imagine That?", duration: "4:12", audio: "/audio/track2.mp3" },
        { title: "The Royal Doulton Music Hall", duration: "4:45", audio: "/audio/track3.mp3" },
        { title: "A Cover Is Not the Book", duration: "3:58", audio: "/audio/track4.mp3" },
        { title: "The Place Where Lost Things Go", duration: "3:27", audio: "/audio/track5.mp3" },
        { title: "Turning Turtle", duration: "2:33", audio: "/audio/track6.mp3" },
        { title: "Trip a Little Light Fantastic", duration: "4:52", audio: "/audio/track7.mp3" }
      ]
    },
    {
      id: 3,
      title: "Mufasa: The Lion King",
      artist: "Sseruwagi Sinclaire Sebastian",
      year: "2024",
      image: "/mufasascore.jpg",
      description: "An epic musical journey exploring the origins of the legendary lion king, featuring powerful African-inspired compositions and emotional orchestral pieces.",
      genre: "Animation Score",
      duration: "1h 45m",
      tracks: [
        { title: "The Legend Begins", duration: "4:23", audio: "/audio/track1.mp3" },
        { title: "Young Mufasa", duration: "3:45", audio: "/audio/track2.mp3" },
        { title: "Brotherhood", duration: "4:12", audio: "/audio/track3.mp3" },
        { title: "The Outsiders", duration: "3:28", audio: "/audio/track4.mp3" },
        { title: "Destiny Calls", duration: "5:15", audio: "/audio/track5.mp3" },
        { title: "The Great Kings", duration: "4:38", audio: "/audio/track6.mp3" },
        { title: "Circle of Life (Reprise)", duration: "3:52", audio: "/audio/track7.mp3" }
      ]
    },
    {
      id: 4,
      title: "Elio",
      artist: "Sseruwagi Sinclaire Sebastian",
      year: "2024",
      image: "/elio.jpeg",
      description: "A cosmic adventure soundtrack featuring otherworldly compositions that blend electronic elements with orchestral grandeur, perfect for Pixar's space odyssey.",
      genre: "Sci-Fi Score",
      duration: "1h 32m",
      tracks: [
        { title: "Among the Stars", duration: "3:45", audio: "/audio/track1.mp3" },
        { title: "First Contact", duration: "4:18", audio: "/audio/track2.mp3" },
        { title: "Alien Worlds", duration: "5:22", audio: "/audio/track3.mp3" },
        { title: "The Universal Language", duration: "3:33", audio: "/audio/track4.mp3" },
        { title: "Cosmic Dance", duration: "4:07", audio: "/audio/track5.mp3" },
        { title: "Home Among the Stars", duration: "4:45", audio: "/audio/track6.mp3" }
      ]
    }
  ];

  const currentAlbum = albums[selectedAlbum];
  const currentTrackData = currentAlbum.tracks[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, repeatMode]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentTrack < currentAlbum.tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    } else if (repeatMode === 'all') {
      setCurrentTrack(0);
    }
  };

  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    } else if (repeatMode === 'all') {
      setCurrentTrack(currentAlbum.tracks.length - 1);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-black text-white">
      {/* Header */}
      <div className="p-6 border-b border-stone-700">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide uppercase">Back to Home</span>
        </button>
        <h1 className="text-4xl font-serif font-light italic text-white">
          Musical Works
        </h1>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Sidebar - Album Selection */}
        <div className="w-80 bg-stone-900/50 border-r border-stone-700 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-stone-200">Albums</h2>
            <div className="space-y-4">
              {albums.map((album, index) => (
                <div
                  key={album.id}
                  onClick={() => {
                    setSelectedAlbum(index);
                    setCurrentTrack(0);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAlbum === index
                      ? 'bg-green-600/20 border border-green-500/30'
                      : 'bg-stone-800/30 hover:bg-stone-700/50'
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{album.title}</h3>
                      <p className="text-sm text-stone-400 truncate">{album.artist}</p>
                      <p className="text-xs text-stone-500">{album.year} • {album.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Album Details */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Album Header */}
              <div className="flex gap-8 mb-8">
                <div className="w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={currentAlbum.image}
                    alt={currentAlbum.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-400 uppercase tracking-wide mb-2">
                    {currentAlbum.genre}
                  </p>
                  <h1 className="text-5xl font-bold text-white mb-4">{currentAlbum.title}</h1>
                  <p className="text-xl text-stone-300 mb-4">{currentAlbum.artist}</p>
                  <p className="text-stone-400 leading-relaxed mb-6">{currentAlbum.description}</p>
                  <div className="flex items-center gap-4 text-sm text-stone-400">
                    <span>{currentAlbum.year}</span>
                    <span>•</span>
                    <span>{currentAlbum.tracks.length} songs</span>
                    <span>•</span>
                    <span>{currentAlbum.duration}</span>
                  </div>
                </div>
              </div>

              {/* Track List */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-stone-400 border-b border-stone-700">
                  <div className="col-span-1">#</div>
                  <div className="col-span-8">Title</div>
                  <div className="col-span-3 text-right">Duration</div>
                </div>
                {currentAlbum.tracks.map((track, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentTrack(index);
                      setIsPlaying(true);
                    }}
                    className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                      currentTrack === index
                        ? 'bg-green-600/20 text-green-400'
                        : 'hover:bg-stone-800/50 text-stone-300'
                    }`}
                  >
                    <div className="col-span-1 flex items-center">
                      {currentTrack === index && isPlaying ? (
                        <div className="flex items-center gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-green-400 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 12 + 4}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="col-span-8">
                      <span className="font-medium">{track.title}</span>
                    </div>
                    <div className="col-span-3 text-right text-sm">
                      {track.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Player */}
          <div className="w-80 bg-stone-900/80 border-l border-stone-700 flex flex-col">
            {/* Now Playing */}
            <div className="p-6 border-b border-stone-700">
              <h3 className="text-lg font-semibold mb-4 text-stone-200">Now Playing</h3>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={currentAlbum.image}
                    alt={currentAlbum.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-white mb-1">{currentTrackData.title}</h4>
                <p className="text-sm text-stone-400">{currentAlbum.artist}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex-1 p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="w-full h-2 bg-stone-700 rounded-full cursor-pointer mb-2"
                >
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-100"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isShuffled ? 'text-green-400' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                
                <button
                  onClick={prevTrack}
                  className="p-2 text-stone-400 hover:text-white transition-colors duration-200"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="p-3 bg-green-500 hover:bg-green-400 rounded-full transition-all duration-200 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-black" />
                  ) : (
                    <Play className="w-6 h-6 text-black ml-1" />
                  )}
                </button>
                
                <button
                  onClick={nextTrack}
                  className="p-2 text-stone-400 hover:text-white transition-colors duration-200"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    repeatMode !== 'off' ? 'text-green-400' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mb-6">
                <button onClick={toggleMute} className="text-stone-400 hover:text-white transition-colors duration-200">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-stone-700 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isLiked ? 'text-green-400' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-2 text-stone-400 hover:text-white transition-colors duration-200">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrackData.audio}
        volume={volume}
        muted={isMuted}
      />
    </div>
  );
};

export default MusicPlayer;
