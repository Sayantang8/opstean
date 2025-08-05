import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CompanyGrowthChart = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoControls = useAnimation();
  const pathControls = useAnimation();

  // Chart dimensions - responsive
  const width = 800;
  const height = 400;
  const padding = 60;



  // Define the growth path points (x, y coordinates) - memoized to prevent re-renders
  const pathPoints = useMemo(() => [
    { x: padding, y: height - padding }, // Start (0,0 relative)
    { x: width * 0.3, y: height * 0.6 }, // Growth phase peak (80% height)
    { x: width * 0.5, y: height * 0.7 }, // Major dip (30% of peak)
    { x: width - padding, y: height * 0.1 } // Recovery peak (higher than initial)
  ], [width, height, padding]);

  // Create smooth SVG path
  const createSmoothPath = (points: typeof pathPoints) => {
    if (points.length < 2) { return '' };

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else if (i === points.length - 1) {
        // Last curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.5;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        // Middle curves
        const cp1x = prev.x + (curr.x - prev.x) * 0.4;
        const cp1y = prev.y + (curr.y - prev.y) * 0.1;
        const cp2x = curr.x - (curr.x - prev.x) * 0.4;
        const cp2y = curr.y - (curr.y - prev.y) * 0.1;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
    }

    return path;
  };

  const pathData = createSmoothPath(pathPoints);

  // Calculate path segment lengths for perfect timing
  const calculatePathTiming = useCallback(() => {
    if (!pathRef.current) { return [0, 0.33, 0.66, 1] };

    const pathLength = pathRef.current.getTotalLength();
    const segmentLengths = [];

    // Calculate approximate lengths for each segment
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const start = pathPoints[i];
      const end = pathPoints[i + 1];
      const distance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      segmentLengths.push(distance);
    }

    const totalDistance = segmentLengths.reduce((sum, length) => sum + length, 0);

    // Convert to cumulative timing array
    let cumulativeDistance = 0;
    const timings = [0];

    for (let i = 0; i < segmentLengths.length; i++) {
      cumulativeDistance += segmentLengths[i];
      timings.push(cumulativeDistance / totalDistance);
    }

    return timings;
  }, [pathPoints]);

  // Animation sequence - logo moves with the tip of the drawing line
  const startAnimation = useCallback(async () => {
    if (!pathRef.current || hasAnimated) { return };

    setHasAnimated(true);
    const pathLength = pathRef.current.getTotalLength();
    const timings = calculatePathTiming();

    // Reset animations - position logo at start
    pathControls.set({
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    logoControls.set({
      x: pathPoints[0].x - 35,
      y: pathPoints[0].y - 12.5,
      scale: 1,
      rotate: 0
    });

    // Animate both path drawing and logo movement simultaneously with perfect timing
    const pathAnimation = pathControls.start({
      strokeDashoffset: 0,
      transition: {
        duration: 4,
        ease: "linear" // Linear for consistent drawing speed
      }
    });

    // Logo moves with calculated timing to match path drawing exactly
    const logoAnimation = logoControls.start({
      x: pathPoints.map(point => point.x - 35),
      y: pathPoints.map(point => point.y - 12.5),
      rotate: [0, -10, 15, -5],
      transition: {
        duration: 4,
        ease: "linear", // Linear to match path drawing
        times: timings
      }
    });

    // Wait for both animations to complete
    await Promise.all([pathAnimation, logoAnimation]);

    // Final: Celebration bounce at the end
    await logoControls.start({
      scale: [1, 1.3, 1],
      y: pathPoints[3].y - 12.5 - 10,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    });

    await logoControls.start({
      y: pathPoints[3].y - 12.5,
      transition: {
        duration: 0.3,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    });
  }, [pathControls, logoControls, pathPoints, hasAnimated, calculatePathTiming]);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '0px 0px -100px 0px' // Start animation a bit before fully visible
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasAnimated]);

  // Start animation when component becomes visible
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(startAnimation, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, startAnimation]);

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-lg p-3 md:p-6 mb-12 animate-fade-in">
      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy mb-2 md:mb-4">
          Our Growth Journey
        </h3>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
          Experience our remarkable transformation from startup to industry leader,
          navigating challenges and achieving unprecedented growth.
        </p>
        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-teal to-navy mx-auto mt-3 md:mt-4 rounded-full"></div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-4xl">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background grid */}
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2D8B9D" />
                <stop offset="100%" stopColor="#1F3C5C" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Axis labels */}
            <text x={padding / 2} y={height / 2} textAnchor="middle" className="fill-gray-600 text-sm" transform={`rotate(-90, ${padding / 2}, ${height / 2})`}>
              Growth Type
            </text>
            <text x={width / 2} y={height - 20} textAnchor="middle" className="fill-gray-600 text-sm">

            </text>

            {/* Animated path */}
            <motion.path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              animate={pathControls}
            />

            {/* Animated logo */}
            <motion.g animate={logoControls}>
              <image
                href="/logo.png"
                x="-35"
                y="-12.5"
                width="70"
                height="25"
                filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
              />
            </motion.g>
          </svg>
        </div>
      </div>

      <div className="mt-4 md:mt-6 text-center">
        <div className="flex justify-center space-x-4 md:space-x-8 text-xs md:text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-teal to-navy rounded mr-1 md:mr-2"></div>
            <span>We Rise in Glory...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyGrowthChart;
