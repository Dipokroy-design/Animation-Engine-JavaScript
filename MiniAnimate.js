class MiniAnimate {
  constructor(el) {
    this.el = document.querySelector(el);
    this.timelineQueue = [];
    this.isReversed = false; // To track if the timeline is reversed
  }

  // Easing Functions
  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  static easeIn(t) {
    return t * t;
  }

  static easeOut(t) {
    return t * (2 - t);
  }

  static bounce(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  }

  // Basic Animation Methods
  to(props, duration = 1000, easing = MiniAnimate.easeInOut) {
    const el = this.el;
    const start = {};
    const startTime = performance.now();
    let resolveNext;

    for (let prop in props) {
      start[prop] = parseFloat(getComputedStyle(el)[prop]);
    }

    function animate(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = easing(progress); // Apply easing here

      for (let prop in props) {
        const initial = start[prop];
        const target = props[prop];
        const current = initial + (target - initial) * easedProgress;
        el.style[prop] = current + "px";
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (resolveNext) resolveNext(); // Trigger next animation in queue
      }
    }

    requestAnimationFrame(animate);
    return this; // Allow chaining
  }

  scale(value, duration = 1000, easing = MiniAnimate.easeInOut) {
    return this.to({ transform: `scale(${value})` }, duration, easing);
  }

  rotate(value, duration = 1000, easing = MiniAnimate.easeInOut) {
    return this.to({ transform: `rotate(${value}deg)` }, duration, easing);
  }

  fadeIn(duration = 1000) {
    return this.to({ opacity: 1 }, duration);
  }

  fadeOut(duration = 1000) {
    return this.to({ opacity: 0 }, duration);
  }

  // Timeline System
  timeline() {
    this.timelineQueue = [];
    return this;
  }

  add(animationFunc, delay = 0, repeat = 0) {
    this.timelineQueue.push({ animationFunc, delay, repeat });
    return this; // Allow chaining
  }

  startTimeline(timelineEndCallback) {
    let currentTime = 0;
    let totalTime = 0;

    // Reverse the queue if needed
    if (this.isReversed) {
      this.timelineQueue.reverse(); // Reverse the order of animations
    }

    const runNext = () => {
      const item = this.timelineQueue.shift();
      if (item) {
        const { animationFunc, delay, repeat } = item;
        totalTime += delay;

        let repeatCount = 0;
        const runAnimation = () => {
          if (repeatCount < repeat || repeat === -1) {
            setTimeout(() => {
              animationFunc.call(this);
              repeatCount++;
              runAnimation();
            }, totalTime);
          } else {
            runNext(); // Go to the next animation after this one finishes
          }
        };

        runAnimation();
      } else {
        if (timelineEndCallback) timelineEndCallback(); // Trigger callback when timeline finishes
      }
    };

    runNext();
    return this; // Allow chaining
  }

  reverse() {
    this.isReversed = !this.isReversed; // Toggle the reversed state
    return this; // Allow chaining
  }
}

// Example Usage:
let box = new MiniAnimate("#box");

box
  .timeline()
  .add(() => box.to({ left: 500 }, 1000), 0)
  .add(() => box.scale(1.5, 1000), 500)
  .add(() => box.rotate(360, 1000), 1000)
  .add(() => box.fadeOut(1000), 1500)
  .startTimeline(() => {
    console.log("Timeline complete!");
    setTimeout(() => {
      box.reverse().startTimeline(() => console.log("Timeline reversed!"));
    }, 1000);
  });
