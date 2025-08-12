
https://www.reddit.com/r/archlinux/comments/d9j4cn/installing_adobe_digital_editions_wine/
sudo apt install wine winetricks samba

https://forums.linuxmint.com/viewtopic.php?t=221459
sudo apt install gnutls-bin

https://askubuntu.com/questions/1090094/wine-missing-ntlm-auth-3-0-25
sudo apt install --reinstall winbind

wget -nc https://dl.winehq.org/wine-builds/Release.key
    sudo apt-key add Release.key
    sudo apt-add-repository https://dl.winehq.org/wine-builds/ubuntu/
    sudo apt-get update
    sudo apt-get install --install-recommends wine-stable

https://forums.linuxmint.com/viewtopic.php?t=424671
    env WINEARCH=win32 WINEPREFIX=~/.wine32 winetricks --force dotnet45

https://forum.winehq.org/viewtopic.php?t=34800
winetricks -q adobe_diged4