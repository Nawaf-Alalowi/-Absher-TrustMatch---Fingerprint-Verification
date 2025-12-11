# Absher TrustMatch

RTL Arabic fingerprint verification UI implementing Absher design system with state-driven architecture.

## Architecture

**State Machine**: Four-state finite state machine (`idle` → `scanning` → `success`/`failure` → `idle`) with centralized state management via `setState()`.

**CSS Architecture**: CSS custom properties for theming, BEM-like naming, consolidated animations, reduced motion support.

**JavaScript Pattern**: Configuration-driven constants (`APP_STATES`, `TIMING`, `STATUS_MESSAGES`), separation of concerns, ARIA attribute management.

## Tech Stack

- **HTML5**: Semantic structure with ARIA attributes (`aria-live`, `aria-busy`, `role`)
- **CSS3**: Custom properties, CSS Grid/Flexbox, keyframe animations, `prefers-reduced-motion`
- **ES6+**: State management, event delegation, configuration objects

## Implementation Details

### State Management
```javascript
const APP_STATES = { IDLE, SCANNING, SUCCESS, FAILURE };
// Centralized state transitions with UI synchronization
// ARIA attributes updated dynamically per state
```

### CSS Variables
```css
:root {
  --absher-green: #1A7A4C;
  --spacing-*: 8px | 12px | 16px | 24px | 32px;
  --shadow-*: elevation system
}
```

### Animation System
- **Idle**: `pulse` keyframe (2s infinite)
- **Scanning**: Three concentric rings with staggered delays (0.3s, 0.6s)
- **Transitions**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` for result icons

### Accessibility
- ARIA live regions for status updates
- Keyboard navigation (Enter key support)
- Screen reader optimization (`.sr-only` utility)
- Reduced motion media query support

## File Structure

```
/
├── index.html    # Semantic HTML, ARIA attributes
├── css/
│   └── style.css    # CSS custom properties, animations
└── js/
    └── main.js      # State machine, event handlers
```

## API

### Public Functions
- `setState(state)` - Transition to state (`idle`, `scanning`, `success`, `failure`)
- `startVerification()` - Initiate verification flow
- `fillTestData()` - Populate form with test data
- `getState()` - Return current state

### Configuration
- `TIMING.SCAN_DURATION`: 3000ms
- `TIMING.RESULT_DISPLAY_DURATION`: 4000ms
- `TIMING.SUCCESS_RATE`: 0.7 (70% simulation success)

## Design System

**Colors**: Absher green palette (`#1A7A4C`), semantic colors (success `#2E7D32`, error `#C62828`)

**Typography**: Tajawal (Arabic), system font stack fallback

**Spacing**: 8px base unit scale (xs: 8px → xl: 32px)

**Components**: 12px border-radius, elevation shadows, 48px input height

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Mobile-optimized (max-width: 480px).

## Performance

- CSS animations use `transform` and `opacity` (GPU-accelerated)
- Event delegation for keyboard handlers
- Minimal DOM manipulation (classList API)
- No external dependencies except Font Awesome CDN

## Notes

- Input validation disabled (per requirements)
- Fingerprint scanning simulated (3s delay, 70% success rate)
- Date picker uses native `prompt()` (replace with proper widget in production)
