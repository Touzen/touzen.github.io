---
layout: post
title: Fixing the Ubuntu Suspend Issue on the Razer Blade Advanced 2021
---
I have been using a _Razer Blade Advanced 2021_ for the last year during my PhD studies. It's really powerful and has a RTX 3070 GPU which means you can do some basic machine learning with CUDA which really speeds up my prototyping work.

Overall, I think it's a great machine. However, for most of my time using it I have been experiencing an infuriating issue: suspend does not work. What happens is that the screen does not light up once the machine wakes up. It _looks_ like the screen is not working. In fact, if you look really closely you'll see that it is actually just the backlight that's not working. By default, the keys controlling the screen brightness don't work either so you can't solve it that way.

This has meant that every time I leave the office to go home, or vice versa, I need to close everything I'm working on. Until now! I managed to find the solution[^1] [^2], after months of (admittedly only occasionally) scouring the internet for solutions to this problem. Here's the annoyingly simple way to fix it:

Open the file `/etc/default/grub` and change the line:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```
To:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nvidia.NVreg_RegistryDwords=EnableBrightnessControl=1"
```

There you go! This little change improved my quality of life to a degree which is frankly a bit embarassing. If any search engine managed to get you here: you're very welcome, you're finally free of this pain.


Oh, and a bonus: you can now change the screen brightness using the fn-keys.

[^1]: [Link that lead me to the solution.](https://forums.developer.nvidia.com/t/partially-solved-rtx-3070-laptop-wont-resume-after-sleep-suspend-on-lenovo-legion-5-15ach6h/200628)
[^2]: [Link containing the solution that I'm paraphrasing.](https://forums.developer.nvidia.com/t/ga106m-geforce-rtx-3060-mobile-misbehaves-on-kubuntu-with-nvidia-driver-version-470-57-01/195746/10)
