import shutil
import os

src = "/Users/kosako/.gemini/antigravity/brain/2bb32c28-3b36-44f9-9f3b-93a8cc8528d0/leptoceratops_cyber_mesh_1778146011147.png"
dst = "images/cyber/leptoceratops.png"

try:
    shutil.copy(src, dst)
    print(f"Successfully copied {src} to {dst}")
except Exception as e:
    print(f"Error: {e}")
