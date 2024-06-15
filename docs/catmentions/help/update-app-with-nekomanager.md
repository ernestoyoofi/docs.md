# Update app with Neko Manager

> Pastikan kamu sudah mengunduh aplikasi [Neko Manager](/docs/nekomanager/install.md), untuk iOS dapat menggunakan Neko Manager dengan pengaturan Universal.

## Setup

Open the link [](https://cmts.vercel.app/setapp/developermode) or **Turn on developer mode** on cat mentions and then allow to read and write files, after that select the **Backup As Local** menu, two files will automatically come out in the `/nekomanager/id.catmention/` folder with the names `database.dbs` and `keylocal.base`, both files must already exist in the folder.

## Execute in app

Open Neko Manager, then open the *Costum install app** option, enter the url `https://catmentions-webapi.vercel.app/api/appupdate`, after that enter the options on your platform.

Then launch execute and wait for the process to succeed, otherwise the platform does not support it or the platform is subject to restrictions.

## Using Shizuku / Root Option

If you are in adb mode without root, use shizuku by opening the url tab nekomanager://setting then search for shizuku authorization.

If you are in root mode using sui / kernelsu / magisk, please enable shell and supermode according to the Neko Manager documentation.
