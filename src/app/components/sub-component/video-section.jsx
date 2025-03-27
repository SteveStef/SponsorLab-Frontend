"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  CheckCircle,
  MessageSquare,
  Shield,
  Users,
  Clock,
  Star,
  Zap,
  Volume2,
  VolumeX,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

const VideoFeature = ({ icon, title, description, isActive = false, onClick }) => (
  <motion.div
    className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
      isActive ? "bg-green-900/30 border border-green-500/30" : "hover:bg-green-900/20"
    }`}
    whileHover={{ x: isActive ? 0 : 5 }}
    onClick={onClick}
  >
    <div className={`p-2 rounded-full ${isActive ? "bg-green-500/20" : "bg-green-900/30"}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

const VideoSection = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(120); // Default 2 minutes
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const progressInterval = useRef(null);
  const videoId = "So4xsqEIhsM"; // YouTube video ID

  // Features that correspond to video timestamps
  const videoFeatures = [
    {
      time: 0,
      icon: <Users className="w-5 h-5 text-green-400" />,
      title: "The Challenge",
      description:
        "Learn about the difficulties creators face securing sponsorships and the inefficient methods brands currently use.",
    },
    {
      time: 35,
      icon: <Zap className="w-5 h-5 text-green-400" />,
      title: "Market Opportunity",
      description: "See how the influencer market is growing rapidly, projected to reach $90 billion by 2033.",
    },
    {
      time: 42,
      icon: <Search className="w-5 h-5 text-green-400" />,
      title: "Open Marketplace",
      description:
        "Discover our platform's approach: an open marketplace where brands can shop for upcoming videos that align with their goals.",
    },
    {
      time: 107,
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      title: "Future of Collaboration",
      description:
        "Learn how SponsorLab helps creators grow their business while giving brands an efficient sponsorship platform.",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "SponsorLab has transformed how we find and work with creators. The platform's intuitive design makes the entire process seamless.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechGiant Inc.",
    },
    {
      quote:
        "As a YouTuber, finding reliable sponsors was always challenging. SponsorLab has made it incredibly easy to connect with brands that align with my content.",
      author: "Mark Reynolds",
      role: "Tech YouTuber, 500K subscribers",
    },
    {
      quote:
        "The security features give us peace of mind when working with new creators. We know our investment is protected until content is delivered.",
      author: "David Chen",
      role: "Brand Partnerships, FitLife Products",
    },
  ];

  // Stats
  const stats = [
    { value: "5,000+", label: "Active Creators", icon: <Users className="w-5 h-5 text-green-400" /> },
    { value: "1,200+", label: "Brand Partners", icon: <Star className="w-5 h-5 text-green-400" /> },
    { value: "30,000+", label: "Sponsorships Completed", icon: <CheckCircle className="w-5 h-5 text-green-400" /> },
    { value: "48 hours", label: "Average Deal Time", icon: <Clock className="w-5 h-5 text-green-400" /> },
  ];

  // Load YouTube API
  useEffect(() => {
    // Create YouTube script tag if it doesn't exist
    if (!document.getElementById("youtube-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (playerContainerRef.current) {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            mute: 0,
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
          },
        });
      }
    };

    // Clean up
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      // Reset the global callback to avoid conflicts
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  // Player event handlers
  const onPlayerReady = (event) => {
    setPlayerReady(true);
    setVideoDuration(playerRef.current.getDuration());
  };

  const onPlayerStateChange = (event) => {
    const playerState = event.data;

    // Update playing state based on YouTube player state
    if (playerState === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressTracker();
    } else if (
      playerState === window.YT.PlayerState.PAUSED ||
      playerState === window.YT.PlayerState.ENDED
    ) {
      setIsPlaying(false);
      stopProgressTracker();
    }
  };

  const onPlayerError = (event) => {
    console.error("YouTube Player Error:", event.data);
  };

  // Track video progress
  const startProgressTracker = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        const progress = (currentTime / duration) * 100;
        setVideoProgress(progress);

        // Update active feature based on current time
        for (let i = videoFeatures.length - 1; i >= 0; i--) {
          if (currentTime >= videoFeatures[i].time) {
            setActiveFeature(i);
            break;
          }
        }
      }
    }, 500);
  };

  const stopProgressTracker = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  // Video control functions
  const handlePlayPause = () => {
    if (!playerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleMuteToggle = () => {
    if (!playerReady || !playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const jumpToFeature = (index) => {
    if (!playerReady || !playerRef.current) return;

    const feature = videoFeatures[index];
    playerRef.current.seekTo(feature.time, true);
    setActiveFeature(index);

    if (!isPlaying) {
      playerRef.current.playVideo();
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Get current time in formatted string
  const getCurrentTime = () => {
    if (!playerReady || !playerRef.current) return "00:00";
    const currentTime = (videoProgress / 100) * videoDuration;
    return formatTime(currentTime);
  };

  // Get duration in formatted string
  const getDuration = () => {
    return formatTime(videoDuration);
  };

  return (
    <section className="bg-black bg-opacity-30 py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
            <span className="text-green-400 font-medium">How It Works</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300"
          >
            See SponsorLab in Action
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8">
            Watch how our platform connects creators and brands, streamlining the sponsorship process from start to finish.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Video Section - Takes up 3/5 of the grid on desktop */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 shadow-2xl border border-gray-800/50">
              {/* YouTube Player Container */}
              <div id="youtube-player-container" ref={playerContainerRef} className="absolute inset-0">
                <div id="youtube-player" className="w-full h-full"></div>
              </div>

              {/* Custom Video Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/30"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="p-4 rounded-full bg-green-500/90 cursor-pointer hover:bg-green-600/90 transition-colors"
                      onClick={handlePlayPause}
                    >
                      <Play className="w-12 h-12 text-white" fill="white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 z-20">
                <motion.div
                  className="h-full bg-green-500"
                  style={{ width: `${videoProgress}%` }}
                  transition={{ duration: 0.1 }}
                ></motion.div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    disabled={!playerReady}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={handleMuteToggle}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    disabled={!playerReady}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
                <div className="text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                  {getCurrentTime()} / {getDuration()}
                </div>
              </div>
            </div>

            {/* Video Caption */}
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800/50">
              <h3 className="text-xl font-semibold text-white mb-2">SponsorLab Platform Demo</h3>
              <p className="text-gray-400">
                This comprehensive walkthrough demonstrates how SponsorLab connects creators and brands, facilitates communication, ensures secure transactions, and verifies content delivery.
              </p>
            </div>
          </div>

          {/* Information Tabs - Takes up 2/5 of the grid on desktop */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="features" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="features" className="data-[state=active]:bg-green-900/30">
                  Features
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="data-[state=active]:bg-green-900/30">
                  Testimonials
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-green-900/30">
                  Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-0">
                <div className="bg-black/30 rounded-lg border border-gray-800/50 p-4 mb-4">
                  <h3 className="text-lg font-medium text-white mb-2">Key Platform Features</h3>
                  <p className="text-gray-400 text-sm">
                    Click on any feature to jump to that section in the video demonstration.
                  </p>
                </div>
                <div className="space-y-2">
                  {videoFeatures.map((feature, index) => (
                    <VideoFeature
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      isActive={activeFeature === index}
                      onClick={() => jumpToFeature(index)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="testimonials" className="mt-0">
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-lg border border-gray-800/50 p-5"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                          <Star className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{testimonial.author}</h4>
                          <p className="text-gray-400 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 italic">&quot;{testimonial.quote}&quot;</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-lg border border-gray-800/50 p-4 flex flex-col items-center text-center"
                    >
                      <div className="p-2 rounded-full bg-green-900/30 mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-800/30">
                  <h4 className="font-medium text-white flex items-center mb-2">
                    <Zap className="w-4 h-4 text-green-400 mr-2" />
                    Growing Every Day
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Our platform is expanding rapidly with new creators and brands joining daily. Be part of the fastest-growing sponsorship marketplace.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Process Steps - Now below the video */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
            The SponsorLab Process
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProcessStep
              icon={<Users className="w-10 h-10 text-green-400" />}
              title="Connect"
              step="1"
              description="Creators list their content opportunities while brands browse and select partnerships that align with their marketing goals."
            />
            <ProcessStep
              icon={<MessageSquare className="w-10 h-10 text-green-400" />}
              title="Collaborate"
              step="2"
              description="Negotiate terms, deliverables, and timelines through our secure messaging system with automated contract generation."
            />
            <ProcessStep
              icon={<Shield className="w-10 h-10 text-green-400" />}
              title="Secure"
              step="3"
              description="Brands deposit payment into our secure escrow system, protecting both parties until content is approved."
            />
            <ProcessStep
              icon={<CheckCircle className="w-10 h-10 text-green-400" />}
              title="Complete"
              step="4"
              description="Once content is published and verified, payment is automatically released to the creator's account."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

function ProcessStep({ icon, title, step, description }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl border border-green-900/30 backdrop-blur-sm flex flex-col items-center text-center relative overflow-hidden"
    >
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-green-500/10 rounded-full flex items-end justify-end">
        <span className="text-green-400/40 text-4xl font-bold mr-1 mb-1">{step}</span>
      </div>
      <div className="p-4 rounded-full bg-green-900/30 mb-4 z-10">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
}

export default VideoSection;
