import React, { useContext, useState, useEffect } from 'react';
import MaterialIcon from 'material-icons-react';
// Local
import { DocMain } from '../../doc/DocMain';
import ClipboardCopyContext from '../../doc/ClipboardCopyContext';

import './doc.scss';

export default {
  title: 'Tools/Color Tool',
  parameters: { 
    docs: { 
      page: null,
    },
    options: {
      showPanel: true,
    },
  },
};

// Color utility functions
const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  return { r, g, b };
};

const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

// Improved color generation algorithm based on perceptual color spaces
// Utility functions for OKLab color space calculations
const linearSrgbToOklab = (r, g, b) => {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
};

const oklabToLinearSrgb = (L, a, b) => {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return {
    r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  };
};

// Convert between color spaces
const hexToOklab = (hex) => {
  const rgb = hexToRgb(hex);
  // Convert sRGB to linear sRGB
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  // Apply gamma correction
  const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return linearSrgbToOklab(linearR, linearG, linearB);
};

const oklabToHex = (L, a, b) => {
  const linearRgb = oklabToLinearSrgb(L, a, b);
  
  // Clamp values to valid range
  let r = Math.max(0, Math.min(1, linearRgb.r));
  let g = Math.max(0, Math.min(1, linearRgb.g));
  let bVal = Math.max(0, Math.min(1, linearRgb.b));
  
  // Convert linear sRGB to sRGB
  r = r <= 0.0031308 ? 12.92 * r : 1.055 * Math.pow(r, 1/2.4) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : 1.055 * Math.pow(g, 1/2.4) - 0.055;
  bVal = bVal <= 0.0031308 ? 12.92 * bVal : 1.055 * Math.pow(bVal, 1/2.4) - 0.055;
  
  // Convert to 8-bit values
  const rInt = Math.round(r * 255);
  const gInt = Math.round(g * 255);
  const bInt = Math.round(bVal * 255);
  
  return rgbToHex(rInt, gInt, bInt);
};

// Generate color shades (100-900) using improved algorithm
const generateShades = (baseColor) => {
  const oklab = hexToOklab(baseColor);
  const shades = {};
  
  // Generate lighter shades (100-400)
  for (let i = 1; i <= 4; i++) {
    // Increase lightness and slightly reduce chroma for lighter shades
    const scaleValue = (9 - i) / 10;
    const L = Math.min(oklab.L + (0.4 * scaleValue), 0.95);
    const a = oklab.a * (1 - 0.3 * scaleValue);
    const b = oklab.b * (1 - 0.3 * scaleValue);
    shades[i * 10] = oklabToHex(L, a, b);
  }
  
  // Base color (500)
  shades[50] = baseColor;
  
  // Generate darker shades (600-900)
  for (let i = 6; i <= 9; i++) {
    // Decrease lightness and slightly increase chroma for darker shades
    const scaleValue = (i - 5) / 5;
    const L = Math.max(oklab.L - (0.3 * scaleValue), 0.15);
    const a = oklab.a * (1 + 0.1 * scaleValue);
    const b = oklab.b * (1 + 0.1 * scaleValue);
    shades[i * 10] = oklabToHex(L, a, b);
  }
  
  return shades;
};

// Generate secondary color based on primary with improved algorithm and randomization
const generateSecondaryColor = (primaryHex, randomFactor = 0) => {
  const rgb = hexToRgb(primaryHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Random offset for regeneration feature - increased for more noticeable changes
  const randomOffset = () => (Math.random() - 0.5) * 120 * randomFactor;
  
  // Use a more harmonious hue shift with randomization
  // Base shift is 120 degrees, but can vary with randomFactor
  let newHue = (hsl.h + 120 + randomOffset()) % 360;
  
  // Maintain high saturation and good lightness for vibrant secondary color
  const newSaturation = Math.min(Math.max(hsl.s, 65), 85);
  const newLightness = Math.min(Math.max(hsl.l, 45), 60);
  
  const newRgb = hslToRgb(newHue, newSaturation, newLightness);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

// Generate semantic colors with improved algorithm
const generateSemanticColors = (primaryHex, randomFactor = 0) => {
  // Random offset for regeneration feature - increased for more noticeable changes
  const randomOffset = () => (Math.random() - 0.5) * 40 * randomFactor;
  
  // Success color (green) - more vibrant
  const successHue = 135 + randomOffset(); // Slightly blue-green for modern look
  const successRgb = hslToRgb(successHue, 75, 45);
  const success = rgbToHex(successRgb.r, successRgb.g, successRgb.b);
  
  // Error color (red) - with a hint of purple-blue to make it less intensely red
  const errorHue = 345 + randomOffset(); // Shifted more toward purple (345 instead of 350)
  const errorRgb = hslToRgb(errorHue, 70, 50); // Further reduced saturation from 75 to 70
  const error = rgbToHex(errorRgb.r, errorRgb.g, errorRgb.b);
  
  // Warning color (yellow/orange) - more vibrant
  const warningHue = 35 + randomOffset(); // More orange than yellow for better visibility
  const warningRgb = hslToRgb(warningHue, 85, 55);
  const warning = rgbToHex(warningRgb.r, warningRgb.g, warningRgb.b);
  
  // Info color (blue) - more vibrant
  const infoHue = 210 + randomOffset(); // Slightly purple-blue for modern look
  const infoRgb = hslToRgb(infoHue, 75, 55);
  const info = rgbToHex(infoRgb.r, infoRgb.g, infoRgb.b);
  
  return { success, error, warning, info };
};

// Check if text should be dark or light based on background color
const shouldUseDarkText = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
};

const ColorToolComponent = () => {
  const clipboardCopy = useContext(ClipboardCopyContext);
  const [primaryColor, setPrimaryColor] = useState('#5F5FC9');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [semanticColors, setSemanticColors] = useState({});
  const [colorShades, setColorShades] = useState({});
  const [randomFactor, setRandomFactor] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  // Generate colors when primary color changes or randomFactor changes
  useEffect(() => {
    if (primaryColor && primaryColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // Generate secondary color with randomFactor to allow it to change on regenerate
      const secondary = generateSecondaryColor(primaryColor, randomFactor);
      const semantic = generateSemanticColors(primaryColor, randomFactor);
      
      setSecondaryColor(secondary);
      setSemanticColors(semantic);
      
      // Generate shades for all colors
      setColorShades({
        primary: generateShades(primaryColor),
        secondary: generateShades(secondary),
        success: generateShades(semantic.success),
        error: generateShades(semantic.error),
        warning: generateShades(semantic.warning),
        info: generateShades(semantic.info)
      });
    }
  }, [primaryColor, randomFactor]);

  const handleColorChange = (e) => {
    const value = e.target.value;
    // Ensure value is a valid hex color
    if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      setPrimaryColor(value);
    } else if (value.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // Add # if missing
      setPrimaryColor(`#${value}`);
    } else {
      setPrimaryColor(value);
    }
  };

  const handleRegenerateColors = () => {
    setRandomFactor(Math.random());
  };

  const handleCopyColor = (color) => {
    clipboardCopy(color);
    setCopiedText(color);
    setShowCopied(true);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  const renderColorCategory = (name, color, title) => {
    if (!colorShades[name]) return null;
    
    const shades = colorShades[name];
    const mainColor = color || shades[500];
    const isDarkText = shouldUseDarkText(mainColor);
    
    return (
      <div className="color-category">
        <h3 class="sbdocs-h3">{title}</h3>
        
        <div 
          className="main-color-display"
          style={{ 
            backgroundColor: mainColor,
            color: isDarkText ? '#000' : '#fff'
          }}
          onClick={() => handleCopyColor(mainColor)}
          title={`Click to copy: ${mainColor}`}
        >
          <span className="color-name">{title}</span>
          <span className="color-value">{mainColor}</span>
        </div>
        
        <div className="color-swatch-container">
          {Object.entries(shades).map(([shade, hexColor]) => {
            const isDarkText = shouldUseDarkText(hexColor);
            
            return (
              <div 
                key={shade}
                className="color-swatch"
                style={{ 
                  backgroundColor: hexColor,
                  color: isDarkText ? '#000' : '#fff'
                }}
                onClick={() => handleCopyColor(hexColor)}
                title={`Click to copy: ${hexColor}`}
              >
                <span className="shade-label">{shade}</span>
                <span className="color-value">{hexColor}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="awwd-color-tool">
      <div className="color-input-container">
        <div className="color-input">
          <input 
            type="color" 
            className="color-picker"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
          <input 
            type="text" 
            className="color-text-input"
            value={primaryColor}
            onChange={handleColorChange}
            placeholder="Primary Color"
          />
        </div>
        
        <button className="regenerate-button" onClick={handleRegenerateColors}>
          <MaterialIcon icon="refresh" />
          Regenerate Colors
        </button>
      </div>
      
      {/* Primary and Secondary in the same row */}
      <div className="color-row">
        {renderColorCategory('primary', primaryColor, 'Primary')}
        {renderColorCategory('secondary', secondaryColor, 'Secondary')}
      </div>
      
      {/* Semantic colors in the same row */}
      <div className="color-row">
        {renderColorCategory('success', semanticColors.success, 'Success')}
        {renderColorCategory('error', semanticColors.error, 'Error')}
        {renderColorCategory('warning', semanticColors.warning, 'Warning')}
        {renderColorCategory('info', semanticColors.info, 'Info')}
      </div>
      
      {showCopied && (
        <div className="copied-notification">
          Copied: {copiedText}
        </div>
      )}
    </div>
  );
};

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Color Tool</h1>
    <p>
      Generate a harmonious color palette based on a primary color. This tool automatically creates secondary and semantic colors (success, error, warning, info) with their respective shades.
    </p>
    <h2 className='sbdocs-h2'>How to use</h2>
    <p>
      <li>Enter a primary color using the color picker or by typing a hex value</li>
      <li>The tool will automatically generate secondary and semantic colors</li>
      <li>Click on any color to copy its hex value to the clipboard</li>
      <li>Use the &quot;Regenerate Colors&quot; button to create new variations of the semantic colors</li>
    </p>
    <h2 className='sbdocs-h2'>Color Palette Generator</h2>
    <ColorToolComponent />
  </DocMain>
);

export const Default = Template.bind({});
Default.storyName = 'Color Tool';
