# Confenni: A Plugin for Donating Ethereum on Open Journal System (OJS) Platform [Beta Version]

This plugin allows users to donate Ethereum cryptocurrency within the OJS system. It facilitates splitting the donated amount from the sender among three recipients **(publisher, reviewer, and author)**. Follow the steps below to install this plugin in your OJS system.

**PS: This plugin is currently under development.**


## Installation

1. Download or Clone this repository.
2. Copy the folder **DonateButtonPlugin** and move it to your OJS folder.

## Examples

For users of **XAMPP/MAMP**, navigate to the htdocs/[ojs-folder-name] folder.

```bash
.
├── htdocs
│   ├── [ojs-folder-name]
│   │   ├── plugins
│   │   │   ├── generic
│   │   │   │   ├── Paste the "DonateButtonPlugin" folder here.
│   │   │   │   │   
│   │   │   │   │   
│   │   │   │   │   
│   │   │   │   └── Other Folder for Generic Plugins
│   │   │   └── Other Folder for Plugins
│   │   └── Other Folder System OJS
│   └── Other Folder Project
└── Other Folder System XAMPP/MAMP
```

## Enable the Plugin

After installing the plugin, don't forget to enable it by following these steps:

- Log in to the OJS system with administrator privileges.

![App Screenshot](https://github.com/dannyjiustian/DonateCryptoPlugin/assets/26474898/6a5e651d-b4b4-453e-b154-056f0a7678eb)

- Once logged in, go to your profile and click on the **Dashboard** menu.

![App Screenshot](https://github.com/dannyjiustian/DonateCryptoPlugin/assets/26474898/c5b84267-155d-4b39-9436-7f3c11a74673)

- Then, navigate to **Website > Plugins**.

![App Screenshot](https://github.com/dannyjiustian/DonateCryptoPlugin/assets/26474898/01d95d23-c2aa-44d0-84e9-b88704df854c)

- In the Installed Plugins section, search for the plugin named **"Donation Button Plugin"** and check the checkbox to activate it.

![App Screenshot](https://github.com/dannyjiustian/DonateCryptoPlugin/assets/26474898/f3f3961a-4871-49bd-9688-b32e7312ce43)

- Once the plugin is enabled, you will see the Donate Button on the Journal Page.

![App Screenshot](https://github.com/dannyjiustian/DonateCryptoPlugin/assets/26474898/315f629c-2cc8-479b-91bf-a9eb9128f391)
  
![App Screenshot](https://github.com/dannyjiustian/DonateCryptoPlugin/assets/26474898/d4e992ac-5013-4103-a219-9aaee409d327)

## Tech Stack

**System:** ReactJS, TailwindCSS, JavaScript, Smarty File (.tpl), PHP

## Build using Docker Compose

After downloading the project, change directory into the `DonateCryptoPlugin` directory by executing the following command on your console.
```
cd DonateCryptoPlugin
```

####  download and build the (required) containers
```
sudo docker-compose build
```

####  run the containers
```
sudo docker-compose up
```

####  stop the containers
```
sudo docker-compose stop
```

#### Remove permanently the containers
```
sudo docker-compose rm
```

## End to End Test Video

[![Watch the video](https://i.imgur.com/W6KY1AC.jpg)](https://bit.ly/OJS-End-to-End-Test-Video)


## How to run the unit tests

1. Change directory into test directory inside `DonateButtonPlugin` directory
```
cd test
```

2. Install node_modules first by executing `npm install`
```
npm install
```

3. Run the test by executing `npm run test`
```
npm run test
```


