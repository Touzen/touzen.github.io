---
layout: post
tags: post
title: Fusing images with Pillow
---

Every once in a while I think it's nice to print out some photos, but often the paper sizes available to me are a bit to large and not appropriate for what I want to use the printouts for. A workaround I usually employ is fusing the images together pairwise, printing the fused images on the paper size I have available and then cut the printed images in half. Doing this manually is really frustrating so I managed to create a little script that does this for me, given a directory with images with the same aspect ratios.

```python
from PIL import Image
import sys
import os

def fuse_images(image1, image2):
    if max(image1.size) > max(image2.size):
        larger = image1
        smaller = image2
    else:
        larger = image2
        smaller = image1
    larger.thumbnail((max(smaller.size), max(smaller.size)), Image.ANTIALIAS)
    if larger.size[0] > larger.size[1]:
        larger = larger.rotate(90, expand=True)
    if smaller.size[0] > smaller.size[1]:
        smaller = smaller.rotate(90, expand=True)
    fused = Image.new('RGB', (smaller.size[0] + larger.size[0], larger.size[1]))
    fused.paste(smaller, (0,0))
    fused.paste(larger, (smaller.size[0], 0))
    return fused

def main(directory):
    images = [Image.open(os.path.join(directory, f)) for f in os.listdir(directory)]
    images.sort(key=lambda im: im.size[0] * im.size[1])
    if len(images) % 2 != 0:
        print('Warning - uneven number of images means that the following image will be ignored: {}'.format(images[-1].filename))
    for image1, image2 in zip(images[::2], images[1::2]):
        fused = fuse_images(image1, image2)
        filename = 'fused_{}_{}.jpg'.format(os.path.basename(image1.filename), os.path.basename(image2.filename))
        path = os.path.join(directory, filename)
        fused.save(path)

if __name__ == '__main__':
    directory = '.' if len(sys.argv) < 2 else sys.argv[1]
    if not os.path.exists(directory):
        print('{} is not a valid directory. Provide the location of the images or let the script default to the current working directory.'.format(directory))
        sys.exit(1)
    main(directory)
```

It is fairly easy to add logic to filter for the aspect ratio. A predicate to distinguish between 4:3 and 3:2 could look like this:

```python
three_two = lambda x: abs(3/2 - max(x.size)/min(x.size)) < abs(4/3 - max(x.size)/min(x.size))
```

Thought I'd leave this up here if it's of use to anyone and (mainly) for when I inevitably want to repeat the process having forgotten how I did it the last time.
