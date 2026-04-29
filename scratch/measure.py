import shutil
from PIL import Image
import json

src = "/Users/kosako/.gemini/antigravity/brain/b4f9fb6a-f4bf-41fc-8d78-5b27c4099a11/argentinosaurus_cyber_1777346150802.png"
dst = "images/cyber/argentinosaurus.png"

shutil.copy(src, dst)

img = Image.open(dst).convert('RGB')
width, height = img.size
pixels = img.load()

min_x, max_x, min_y, max_y = width, 0, height, 0
has_pixels = False

for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y]
        if r + g + b > 30:
            has_pixels = True
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

if not has_pixels:
    print("No pixels found")
else:
    results = {
        "width": width,
        "height": height,
        "minX": min_x,
        "maxX": max_x,
        "minY": min_y,
        "maxY": max_y,
        "contentW": max_x - min_x + 1,
        "contentH": max_y - min_y + 1,
        "bottomGap": height - 1 - max_y
    }
    print(json.dumps(results, indent=2))
