# MagicMirror - Viðmótsforritun

MagicMirror er Raspberry Pi sem er tengt við skjá sem er á bak við double sided mirror.
Það er hægt að nota það sem spegil og svo getur maður bætt við auka upplýsingum á skjáinn svo sem hvað klukkan er, veður, fréttir og fleira. Það er einnig hægt að bæta við leiðum til að get skipt á milli blaðsíða, falið eða sýnt upplýsingar með t.d motion control.

## Tæknileg atriði

### Raspberry pi
Til að gera MagicMirror þarf maður að nota einhverja tölvu, Við fengum Raspbery Pi og því það er keyrt á Linux þá settum við Illuga á það. 

#### Stýrikerfi
Við byrjuðum að setja stýrikerfi á Pi'inn og það var valið Rasbian með Desktopi  [Raspbian Downloads] [1] svo þurfum við að flasha .iso á micro sd kortið, við notuðum [Balena Etcher][2] til að gera það, Þræl virkaði alltaf. Etcher virkar á Windows,Mac OS og Linux.

#### Installa MagicMirror2
MagicMirror2 er open source og verður héðan kallað **MagicMirror** eða ~~**mm**~~ 

Þegar þú ert kominn í Rasbian & Búinn að tengjast netinu þá þarftu að fara í Raspberry settings og enablea SSH með 2 skrefum [SSH step 1][4] og [SSH step 2][5] 

Núna skaltu ýta á  **"CTRL + ALT + T"** Þetta shortcut opnar Terminal window. Áður en þú byrjar eitthvað að fikta í þessu skaltu skrifa í terminalið **ifconfig**  og ef þú ert á opna tskola netinu, leitaðu af iptölu úr Ifconfig sem er 10.201.x.x og skráðu hana niður.

Næst á dagskrá er að fara í Browser/Vafra og fara inná þetta [github][3] og copya bash skipunina og pastea hana í Terminal gluggan. Hún er líka hér :
```
bash -c "$(curl -sL https://raw.githubusercontent.com/MichMich/MagicMirror/master/installers/raspberry.sh)"
```

Þegar þessi súpa er að malla skaltu ýta á *y* þegar það biður um eitthvað. (Þessi scripta installar Node.Js, updatear systemið, og installar npm og pm2)

Þetta var ekki svo erfitt er það nokkuð ?

#### Configura MagicMirror
Staðsetning config.js. /home/pi/MagicMirror/config/config.js
Þegar þú ert að Configura MagicMirrorið þá er best að nota aðra tölvu og nota ssh ef þú ert á windows notaðu þá [PuTTY][6]. Ef þú ert að nota MAC eða Linux (Meina þú ættir að vita hvernig þú notar ssh ef þú notar Linux) þá í terminal geriru :
```
ssh pi@10.201.x.x
```
Þú mátt skoða okkar [config][7]

Núna er hægt að customizea þetta mjög mikið.
Það er mjög mikið af modules sem þú getur installað í magic mirror, við förum yfir hvernig skal installa camera module.

#### Hlutir sem hindruðu okkur

1. Þegar við vorum búnir að installa MagicMirror með self installer script og rebootoðum þá kom enginn mynd á skjáinn.
2. MagicMirror Camera Module var bara ekki vinur okkar.
3. MagicMirror átti erfitt að installa
4. Logi C960 Myndavélin okkar átti erfiðleika að initilizea

Númer 1 Við þurftum við að opna  `vim /boot/config.txt` og uncommenta `#hdmi_force_hotplug=1` og `#hdmi_drive=2`. Þetta forcear Pi'inn að gefa output í hdmi hvort sem það finnur skjá eða ekki.

Númer 2 var aðeins meiri dólgur en ef þú skoðar [configið][7] okkar og skoðar hvernig moduleið er bætt í ættirðu að geta kóperað það.

Númer 3 kemur í ljós að þú þarft að vera með fully updated system getur notað `sudo apt-get update` og síðan `sudo apt-get upgrade` 

Númer 4 þurftum að installa `v4l-utils` og `guvcview`


[1]: https://www.raspberrypi.org/downloads/raspbian/
[2]: https://www.balena.io/etcher/
[3]:https://github.com/MichMich/MagicMirror#automatic-installation-raspberry-pi-only
[4]:https://www.raspberrypistarterkits.com/wp-content/uploads/2017/11/Using-the-Graphical-User-Interface.png
[5]: https://www.raspberrypistarterkits.com/wp-content/uploads/2017/11/Interfaces%E2%80%99-and-%E2%80%98SSH.png
[6]: https://www.chiark.greenend.org.uk/~sgtatham/putty/
[7]: illugi.com/fixthis

### Myndavél
Myndavéla module-ið sem var notað `https://github.com/alexyak/camera`<br>
Til að setja upp myndavélina þarf að clone myndavéla module inní modules folderinn í MagicMirror's code location með því að nota:
```
git clone https://github.com/alexyak/camera.git
```
Til að install-a node.js dependencies það að fara í camera sub folder: ```cd camera``` og gera `npm install`

Þegar þetta er búið þarf að fara í config og bæta við þessu í MagicMirror configið
```
{
    module: "camera",
    position: "top_center",
    config: {
        selfieInterval: 3,
        emailConfig: {
            service: "Gmail",
            auth: {
                user: "<>",
                pass: "<>"
            },
        },
    }
},
```
### The Frame

