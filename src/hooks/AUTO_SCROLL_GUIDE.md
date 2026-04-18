# useAutoScroll Hook - Usage Guide

The `useAutoScroll` hook provides reusable auto-scrolling carousel/marquee functionality. Elements scroll automatically, pause when out of view or on hover, and loop back to the beginning.

## Features

- **Auto-scrolls** every N milliseconds
- **Pauses** when element is out of viewport (using Intersection Observer)
- **Pauses on hover** (optional, enabled by default)
- **Smooth scrolling** animation between positions
- **Loops** back to beginning when reaching the end
- **Configurable** scroll interval and distance

## Basic Usage

```jsx
import { useAutoScroll } from '../../hooks/useAutoScroll';

export function MyCarousel() {
  // Vertical scroll (default)
  const { containerRef, trackRef, handleMouseEnter, handleMouseLeave } = useAutoScroll({
    interval: 5000,      // Scroll every 5 seconds
    scrollAmount: -1,    // Auto-size to container height
    isVertical: true,    // Scroll down
    pauseOnHover: true,  // Pause when hovering
  });

  return (
    <div 
      ref={containerRef} 
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="carousel-track">
        {items.map((item) => (
          <div key={item.id} className="carousel-item">{item.name}</div>
        ))}
      </div>
    </div>
  );
}
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `interval` | `5000` | Milliseconds between scrolls (5 seconds) |
| `scrollAmount` | `-1` | Pixels to scroll each interval. Use `-1` for auto-size to container width/height |
| `isVertical` | `true` | Scroll down if true, scroll right if false |
| `pauseOnHover` | `true` | Pause scrolling when hovering over the carousel |

## CSS Requirements

Your carousel wrapper must have:
- `overflow: scroll` or `overflow-x: scroll` to enable horizontal scrolling
- `scroll-behavior: smooth` for smooth animations (optional, but recommended)
- Width constraints so it doesn't show the entire track at once

```css
.carousel {
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  width: 100%; /* or any constrained width */
}

.carousel-track {
  display: flex;
  white-space: nowrap;
}

.carousel-item {
  flex-shrink: 0;
  width: 250px; /* Fixed width for items */
}
```

## Return Values

| Return | Type | Description |
|--------|------|-------------|
| `containerRef` | RefObject | Ref for the scroll container (use on wrapper div) |
| `trackRef` | RefObject | Ref for the content track (use on inner div) |
| `isHovering` | Boolean | Current hover state |
| `handleMouseEnter` | Function | Call on container `onMouseEnter` to pause |
| `handleMouseLeave` | Function | Call on container `onMouseLeave` to resume |

## Real-World Example (Home Page)

### Horizontal Marquee Example (Partner marquee)

```jsx
const { containerRef: marqueeContainer, trackRef: marqueeTrack, handleMouseEnter, handleMouseLeave } = useAutoScroll({
  interval: 500,         // Scroll every 500ms
  scrollAmount: -1,      // Auto-size to container width
  isVertical: false,     // Scroll right instead of down
  pauseOnHover: true,
});

return (
  <div 
    className={styles.marqueeWrap} 
    ref={marqueeContainer}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div className={styles.marqueeTrack} ref={marqueeTrack}>
      {/* Items here */}
    </div>
  </div>
);
```

## Tips

### Calculating scrollAmount

- Measure one item width + gap between items
- Example: Item = 250px, gap = 14px → scrollAmount = 264px
- For partner chips: ~250px each + 28px margin = ~280px total

### Scroll Out of View Behavior

- The hook uses IntersectionObserver (threshold: 0.1)
- When 90%+ of the element scrolls out of view, auto-scroll pauses
- Resumes when 10%+ is back in view

### Looping Behavior

- Automatically scrolls back to position 0 when reaching the end
- No visible jump—smooth scroll to beginning

### Adjusting Speed

- Increase `interval` for slower scrolling (e.g., 7000ms)
- Decrease `interval` for faster scrolling (e.g., 3000ms)
- Increase `scrollAmount` to skip more items per scroll
- Decrease `scrollAmount` for gradual, small scrolls

## Advanced: Multiple Carousels

Use separate hook instances for different carousels:

```jsx
export function Dashboard() {
  const featured = useAutoScroll({ interval: 4000, scrollAmount: 320 });
  const recent = useAutoScroll({ interval: 6000, scrollAmount: 280 });
  const trending = useAutoScroll({ interval: 5000, scrollAmount: 300 });

  return (
    <div>
      <Carousel ref={featured.containerRef} trackRef={featured.trackRef} />
      <Carousel ref={recent.containerRef} trackRef={recent.trackRef} />
      <Carousel ref={trending.containerRef} trackRef={trending.trackRef} />
    </div>
  );
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses Intersection Observer API (fallback not included)
- Uses scrollTo() with smooth behavior (CSS smooth-scroll fallback recommended)

## Troubleshooting

### Carousel not scrolling
- Check if `containerRef` and `trackRef` are attached to correct elements
- Verify container has `overflow-x: scroll`
- Ensure track width > container width

### Scrolling too fast/slow
- Adjust `interval` and `scrollAmount` values
- Lower `scrollAmount` and higher `interval` = slower, more gradual
- Higher `scrollAmount` and lower `interval` = faster, larger jumps

### Items not visible after scroll
- Verify all items are rendered in the track
- Check if `flex-shrink: 0` is set on items
- Ensure items don't have max-width constraints
