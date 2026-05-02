# Specter Desktop for StartOS

⚠️ This repository supports two different StartOS versions:

- StartOS 0.4 (current, actively maintained)
- StartOS 0.3.5.x (legacy)

---

## 🚀 StartOS 0.4 (Beta)

This is the current recommended version.

### Features

- Specter Desktop v2.1.8
- Custom multi-arch Docker image (amd64 + arm64)
- Automatic Bitcoin Core / Knots integration
- Automatic RPC credential provisioning
- Persistent configuration across restarts

---

## 📦 Installation (StartOS 0.4)

Download the latest release-candidate:

https://github.com/Alex71btc/specter-startos/releases

Then sideload the `.s9pk` file in StartOS.

---

## ⚡ Usage

### Setup

1. Open Specter UI
2. Use **"Select Node"**
3. Choose **Bitcoin Core / Knots**
4. Specter will automatically configure RPC

---

## ⚠️ Notes

- Requires StartOS 0.4 beta
- Bitcoin node must be running and reachable

### Technical Note

This package uses a custom multi-arch Specter image to ensure
correct data persistence and compatibility with StartOS.

---

## 🧱 StartOS 0.3.5.x (Legacy)

This version is no longer actively developed.

Use older releases:
https://github.com/Alex71btc/specter-startos/releases

---

## ❤️ Credits

- Specter Desktop by https://github.com/cryptoadvance/specter-desktop
- StartOS by https://start9.com
