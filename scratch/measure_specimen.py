from PIL import Image
import json

img = Image.open('../images/cyber/ankylosaurus.png').convert('RGBA')
width, height = img.size
pixels = img.load()

min_x, max_x, min_y, max_y = width, 0, height, 0
has_pixels = False

for y in range(height):
    for x in range(width):
        if pixels[x, y][3] > 0:
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
