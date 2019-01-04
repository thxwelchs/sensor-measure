# sensor-measure
센서 값 계측 프로젝트입니다.

## 계측할 센서의 종류는 다음과 같습니다.
+ 온도
+ 습도
+ 미세먼지(예정)



### 온습도센서(SHT10) 연결도
| 핀 타입 | 연결
| --------- | -------------------------
| GND       | Ground (Pin 6)
| DATA      | 3V3 Power (Pin 1) via 10k pullup resistor (저항 굳이 필요 없음) AND GPIO 18 (Pin 12)
| SCK       | GPIO 23 (Pin 16)
| VCC       | 3V3 Power (Pin 1)

![sensor_img](https://user-images.githubusercontent.com/38197077/50626509-0b319d00-0f72-11e9-9d2f-059b43326aab.jpeg)

## 사용된 raspberry pi GPIO 라이브러리
*pi-sht1x*
[github](https://github.com/keito/pi-sht1x)

### gpio-admin
```bash
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
sudo vim gpio-admin.c
```

**gpio-admin.c**에서 gpio 경로를 다음과 같이 변경

```c
// int size = snprintf(path, PATH_MAX, "/sys/devices/virtual/gpio/gpio%u/%s", pin, filename);
int size = snprintf(path, PATH_MAX, "/sys/class/gpio/gpio%u/%s", pin, filename);
```

경로변경 후 
```bash
make
sudo make install
sudo adduser $USER gpio
``` 
