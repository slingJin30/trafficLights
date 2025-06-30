# Traffic Light Pro Simulator 🚦✨

An advanced, interactive traffic light simulator built with HTML, Bootstrap 5, CSS, and JavaScript. This project features a professional UI, automatic sequencing, pedestrian signals, and special operational modes.

## Features

- **Professional UI with Bootstrap 5:** Clean, responsive, and modern interface.
- **Manual Light Control:** Click buttons (Green, Yellow, Red) to manually change the traffic light.
- **Automatic Sequencing Mode:**
    - Initiates a standard Green -> Yellow -> Red cycle with configurable timings.
    - "Start Auto" and "Stop Auto" controls.
    - Manual controls are disabled during automatic mode.
- **Pedestrian Signal:**
    - Displays "WALK" or "DON'T WALK" synchronized with the traffic light.
    - "WALK" during green, "DON'T WALK" during yellow and red (simplified logic).
- **Special Operational Modes:**
    - **Flashing Yellow:** Caution mode, yellow light flashes.
    - **Flashing Red:** Stop mode (like a 4-way stop), red light flashes.
    - **All Off:** Simulates a power outage, all lights are off.
    - **Resume Normal:** Button to exit special modes and re-enable manual/auto controls.
- **Responsive Design:** Adapts to various screen sizes for a consistent experience.
- **Semantic HTML & ARIA:** Structured for accessibility and SEO.
- **Efficient JavaScript:** Modularized code for managing different states and features.
- **CSS Enhancements:** Custom styles complement Bootstrap, including light glow effects and flashing animations.

## Screenshots

**New Interface (Traffic Light Pro):**
*(Imagine a new screenshot here reflecting the Bootstrap UI with all feature controls visible: traffic light, manual buttons, automatic mode card, pedestrian signal card, and special modes card.)*

**Previous Interface (for comparison):**
![Old App Screenshot](./screenshot/trafficLightIndex.png)

*(Ideally, you would replace the placeholder above with an actual screenshot of the new UI after running the application in a browser.)*

## How to Use

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd trafficLights  # Or your project directory name
   ```
3. Open `index.html` in your web browser.
4. **Manual Control:** Click "Green", "Yellow", or "Red" buttons.
5. **Automatic Mode:** Click "Start Auto" to begin the sequence. Click "Stop Auto" to halt it.
6. **Special Modes:**
   - Click "Flash Yellow", "Flash Red", or "All Off" to activate.
   - Click "Resume Normal" to return to standard operation.

## Project Structure

```
trafficLights/
├── assets/
│   ├── css/
│   │   └── styles.css      # Custom stylesheets complementing Bootstrap
│   └── js/
│       └── script.js       # JavaScript for all interactivity and logic
├── screenshot/
│   └── trafficLightIndex.png # Screenshot of the original (pre-makeover) UI
├── index.html              # Main HTML file (Bootstrap integrated)
└── README.md               # This file
```

## Key Enhancements in "Pro" Version:

- **Bootstrap Integration:** Complete UI overhaul using Bootstrap 5 for a professional look, responsive grid, and pre-styled components.
- **Automatic Sequencing:** Full cycle automation with start/stop controls.
- **Pedestrian Signals:** Basic "WALK" / "DON'T WALK" display.
- **Special Modes:** Flashing lights (yellow/red) and an "all off" mode provide realistic operational scenarios.
- **Improved State Management:** JavaScript logic enhanced to handle interactions between different modes (manual, auto, special).
- **Enhanced CSS:** Added animations for flashing lights and refined styles for new components.
