import shutil
import os

src = "/Users/kosako/.gemini/antigravity/brain/b4f9fb6a-f4bf-41fc-8d78-5b27c4099a11/argentinosaurus_cyber_1777346150802.png"
dst = "images/cyber/argentinosaurus.png"

try:
    shutil.copy(src, dst)
    print(f"Successfully copied {src} to {dst}")
except Exception as e:
    print(f"Error: {e}")
