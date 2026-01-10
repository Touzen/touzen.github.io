---
layout:        post
title:         "Seamless migration from Google Photos to Immich"
date:          2025-08-11 18:00:00 +0200
---

Hosting your own services is fun! Recently, I have been trying out [Immich](https://immich.app/), which is an open-source and (optionally) self-hosted alternative to Google Photos. However, Google Photos (unsurprisingly) lacks a built-in way to conveniently export all your data to another service. The only way to download _all_ of your content is to export it using [Google Takeout](https://takeout.google.com/). Unfortunately, Google will strip the photos of most of their exif data -- such as geolocation info -- and instead provide this information in JSON files accompanying each photo.

# The solution (?)
A lot of nice functionality -- such as Immich's map function -- need exif data to function. While it's possible to piece together the exif data from the JSON files, this would be quite tedious. Thankfully, the Immich community has a neat solution for this! [Immich-Go](https://github.com/simulot/immich-go) is a tool that let's you upload photos from your Google Takeout files and that takes care of the JSON metadata for you. Using it is as simple as running:
```bash
immich-go upload from-google-photos \
    --server=http://your-ip:2283 \
    --api-key=your-api-key \
    /path/to/your/takeout-*.zip
```

Nice! So you just need to download you takeout files and then you're good to go. Right? Well, actually downloading your takeout files isn't as straightforward as you'd think. First of all, there are space issues. Depending on how many photos you have, the total size of your takeout can easily reach hundreds of gigabytes. Furthermore, Google seems to really dislike when you download large files. I never managed to complete an entire download -- Google would simply kill the connection after a few gigabytes had been downloaded.

# rclone to the rescue
Here, I was ready to give up. For the life of me, I couldn't figure out how to download the takeout files without running into killed connections. I tried scouring the web for solutions, but came up with nothing. Until it hit me: you actually don't need to store the takeout files locally. This approach is probably not the fastest way of solving the problem -- but it works! The trick is to export your takeout to your Google Drive and then _mount your Drive locally_.

[rclone](https://rclone.org/) is a tool that let's you do exactly this. It was a bit [tedious to set up](https://rclone.org/drive/) since it took a lot of plumbing to get the required API key from Google. However, once you get past this step, you can finally run the migration!

```bash
rclone mount drive-remote:drive/path/to/takeout /path/to/mount

immich-go upload from-google-photos \
    --server=http://your-ip:2283 \
    --api-key=your-api-key \
    /path/to/mount/takeout-*.zip
```

Now, Immich-Go will automatically import all the Google Photos -- with metadata -- into your local (or remote) Immich instance. This takes a while, but it works flawlessly and without requiring any extra storage space for the takeout files.