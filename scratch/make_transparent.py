import sys
from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Sample corner to get background color and intensity
    bg_color = img.getpixel((0, 0))
    bg_v = 0.299 * bg_color[0] + 0.587 * bg_color[1] + 0.114 * bg_color[2]
    
    print(f"Background color at corner: {bg_color}, intensity: {bg_v}")
    
    # Establish thresholds based on background intensity
    # Any pixel with intensity close to background gets alpha = 0.
    # Brighter sketch lines get alpha scaled up to 255.
    low_thresh = bg_v + 15
    high_thresh = 160
    
    new_data = []
    for item in data:
        r, g, b, a = item
        v = 0.299 * r + 0.587 * g + 0.114 * b
        
        if v <= low_thresh:
            alpha = 0
        elif v >= high_thresh:
            alpha = 255
        else:
            # Linear interpolation with a slight boost curve
            ratio = (v - low_thresh) / (high_thresh - low_thresh)
            # Apply a power of 1.2 to reduce halo noise in transition areas
            alpha = int(255 * (ratio ** 1.2))
            
        # Output clean white lines with the calculated transparency
        new_data.append((255, 255, 255, alpha))
        
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully processed transparent sketch to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python make_transparent.py <input_img> <output_img>")
        sys.exit(1)
    make_transparent(sys.argv[1], sys.argv[2])
