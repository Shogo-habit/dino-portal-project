import os
import sys
from PIL import Image

def crop_specimen(image_path, output_path):
    """
    Crops an image (black or transparent background) to its content bounding box.
    Ensures the 'feet' (bottom-most pixel) are at the bottom edge.
    """
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        pix = img.load()
        
        min_x, min_y = width, height
        max_x, max_y = 0, 0
        found = False
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pix[x, y]
                # Define content: Not black (RGB > 10) OR Not transparent (Alpha > 10)
                if r > 10 or g > 10 or b > 10 or a > 10:
                    if x < min_x: min_x = x
                    if y < min_y: min_y = y
                    if x > max_x: max_x = x
                    if y > max_y: max_y = y
                    found = True
        
        if found:
            # Crop exactly to content (tight bounding box)
            cropped = img.crop((min_x, min_y, max_x + 1, max_y + 1))
            cropped.save(output_path, "PNG")
            print(f"SUCCESS: {os.path.basename(output_path)} created. Size: {cropped.size}")
            return True
        else:
            print(f"FAILED: No content found in {image_path}")
            return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 crop_tool.py <input_path> <output_path>")
    else:
        crop_specimen(sys.argv[1], sys.argv[2])
