---
order: 3
---

# 使用iwd连接eduroam

接archlinux安装一文，在使用`NetworkManager` + `iwd`时，NetworkManager无法配置eduroam，需要手动配置。

## 下载CA证书
从[https://eduroam.ustc.edu.cn/ca.pem](https://eduroam.ustc.edu.cn/ca.pem)下载CA证书，然后储存在`/etc/iwd/ustc-eduroam-ca.pem`中：

```sh
install -Dm644 ca.pem /etc/iwd/ustc-eduroam-ca.pem
```
其中，`ca.pem`应为你下载的CA证书的路径。

> 值得注意的是，eduroam.ustc.edu.cn这个网站的证书于2026年10月10日过期了。

## 方案一：通过iwd配置

创建`/var/lib/iwd/eduroam.8021x`，内容为

```ini
[Security]
EAP-Method=PEAP
EAP-Identity=NETID@ustc.edu.cn
EAP-PEAP-CACert=/etc/iwd/ustc-eduroam-ca.pem
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=NETID@ustc.edu.cn
EAP-PEAP-Phase2-Password=NET_PASSWORD
EAP-PEAP-ServerDomainMask=eduroam radius server certificate

[Settings]
AutoConnect=true
```
其中，NETID和NET_PASSWORD应为你的网络通账号、密码。

注意，需要配置NetworkManager，防止我们创建的文件被覆盖。

在archlinux安装一文中，我们创建了`wifi-backend.conf`。现在，我们编辑这一文件：
```ini
[device]
wifi.backend=iwd

# 以下是新增的内容，这可以防止上文创建的配置丢失
[main]
iwd-config-path=

```

## 方案二：通过NetworkManager配置

另一种方案是，不对iwd进行配置，而是在NetworkManager中配置，由NetworkManager生成iwd配置。

可以通过多种途径完成配置，配置的内容参考上一节。需要注意的是，NetworkManager中对domain的配置一般为`domain-suffix-match`，而我们实际希望配置的为`domain-match`。需要手动修改，否则NetworkManager会错误生成`EAP-PEAP-ServerDomainMask=*.eduroam radius server certificate`。
