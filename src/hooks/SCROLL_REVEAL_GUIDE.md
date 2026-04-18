# Scroll Reveal Hook - Usage Guide

The `useScrollReveal` hook provides reusable scroll-triggered animations. Elements animate when they enter the viewport and reverse when they leave.

## Available Effects

| Effect | Description |
|--------|-------------|
| `slideUp` (default) | Fades in and slides up from 30px below |
| `fade` | Pure fade in/out, no movement |
| `floatLeft` | Fades in and floats from left (50px) |
| `floatRight` | Fades in and floats from right (50px) |
| `fadeRotateInLeft` | Fades in while rotating in from left (-15deg) |
| `fadeRotateInRight` | Fades in while rotating in from right (+15deg) |

## Basic Usage (with automatic class names)

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function MyComponent() {
  // Option 1: Slide Up (default)
  const { ref, classNames } = useScrollReveal();
  
  return <section ref={ref} className={classNames}>Content</section>;
}
```

## Using Different Effects

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function MyComponent() {
  // Fade only
  const { ref: fadeRef, classNames: fadeClasses } = useScrollReveal('fade');
  
  // Float from left
  const { ref: leftRef, classNames: leftClasses } = useScrollReveal('floatLeft');
  
  // Float from right
  const { ref: rightRef, classNames: rightClasses } = useScrollReveal('floatRight');
  
  // Fade rotate in from left
  const { ref: rotLeftRef, classNames: rotLeftClasses } = useScrollReveal('fadeRotateInLeft');
  
  // Fade rotate in from right
  const { ref: rotRightRef, classNames: rotRightClasses } = useScrollReveal('fadeRotateInRight');
  
  return (
    <div>
      <section ref={fadeRef} className={fadeClasses}>
        Fade in/out
      </section>
      
      <div ref={leftRef} className={leftClasses}>
        Float in from left
      </div>
      
      <div ref={rightRef} className={rightClasses}>
        Float in from right
      </div>
      
      <div ref={rotLeftRef} className={rotLeftClasses}>
        Fade rotate in from left
      </div>
      
      <div ref={rotRightRef} className={rotRightClasses}>
        Fade rotate in from right
      </div>
    </div>
  );
}
```

## Manual Class Name Usage

If you prefer to manually handle class names:

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function MyComponent() {
  // Get isVisible state, then apply classes manually
  const { ref, isVisible } = useScrollReveal('floatLeft');
  
  return (
    <section 
      ref={ref} 
      className={`my-section ${isVisible ? 'scroll-float-left-reveal' : 'scroll-float-left-hidden'}`}
    >
      Content
    </section>
  );
}
```

## Advanced Options

```jsx
const { ref, classNames } = useScrollReveal('slideUp', {
  threshold: 0.5,     // Trigger when 50% is visible (default: 0.2)
  rootMargin: '100px' // Trigger 100px before entering viewport
});
```

## Real-World Examples

### Home Page - Multiple Effects

```jsx
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function Home() {
  const { ref: productsRef, classNames: productsClasses } = useScrollReveal('slideUp');
  const { ref: benefitsRef, classNames: benefitsClasses } = useScrollReveal('floatLeft');
  const { ref: newsRef, classNames: newsClasses } = useScrollReveal('floatRight');
  
  return (
    <div>
      <section ref={productsRef} className={productsClasses}>
        {/* Products fade in and slide up */}
      </section>
      
      <section ref={benefitsRef} className={benefitsClasses}>
        {/* Benefits float in from left */}
      </section>
      
      <section ref={newsRef} className={newsClasses}>
        {/* News floats in from right */}
      </section>
    </div>
  );
}
```

## Animation Duration

All animations use 0.8 seconds by default. To change duration globally, edit `/src/styles/animations.css`:

```css
.scroll-reveal {
  animation: scrollRevealIn 1.2s ease both; /* Change 0.8s to 1.2s */
}
```

## CSS Classes Reference

If you need to apply animations without the hook:

```jsx
// Slide Up (fade + slide)
<div className="scroll-reveal">Content</div>
<div className="scroll-hidden">Content</div>

// Fade Only
<div className="scroll-fade-reveal">Content</div>
<div className="scroll-fade-hidden">Content</div>

// Float Left
<div className="scroll-float-left-reveal">Content</div>
<div className="scroll-float-left-hidden">Content</div>

// Float Right
<div className="scroll-float-right-reveal">Content</div>
<div className="scroll-float-right-hidden">Content</div>
```

## Tips

- Use different effects on the same page for visual variety
- `floatLeft` and `floatRight` work well for alternating card layouts
- `fade` is good for subtle animations on text/headers
- `slideUp` is the most impactful, use for hero sections or important content
- Adjust `threshold` for when animation should trigger (0.2 = 20% visible)
