# MiniAnimate - A Custom Animation Engine in JavaScript 🚀

MiniAnimate is a lightweight, **prototype-based animation engine** built from scratch in JavaScript. It provides smooth animations with ease of use and a timeline system for sequencing animations. The engine supports **custom easing**, **repeatable animations**, **callbacks**, and even the ability to **reverse animations**.

## Key Features 🛠️

- **Custom Easing**: Built-in easing functions (Ease-in, Ease-out, Bounce) for smooth transitions.
- **Chaining**: Chain multiple animations to a single element with ease.
- **Timeline System**: Queue animations in a timeline, complete with delays and repeat options.
- **Reversible Animations**: Reverse the entire animation sequence at any time.
- **Callback Support**: Trigger a callback once the entire timeline or individual animation finishes.

## How It Works 💡

The engine works by defining animations in a timeline, allowing for smooth sequencing with delays, repeat options, and easing functions.

### Example Usage:

```javascript
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
```

---

### 🧑‍💻 **Explanation of Sections**:

- **Key Features**: Lists all the cool features you’ve built.
- **How It Works**: A description of how the engine functions, with an example of usage.
- **Available Methods**: A breakdown of all the methods you can use in the engine.
- **Easing Functions**: Describes the different easing functions available.
- **How to Use**: Provides clear instructions on how to clone the repo, set it up, and start using the engine.
- **Demo**: Link to a live demo (if you host it somewhere like GitHub Pages).
- **Contributing**: Encourages contributions and improvements.

---

MIT © 2025 – Built with ❤️ by [Dipok]
