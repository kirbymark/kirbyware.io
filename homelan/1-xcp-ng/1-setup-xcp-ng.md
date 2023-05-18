#  Installing XOA community edition

Following guide from [here](https://protectli.com/kb/how-to-setup-xen-orchestra-community-edition-on-protectli-vault/)

0. Restart XCP-ng server

1. Get a ISO image to create our first VM
   We are going to use Debian so get image from [here](https://www.debian.org/distrib/netinst)

2. SSH to the xcp-ng Server and create a local ISO storage repository
   ```
   ssh 10.255.100.3
   mkdir /var/opt/xen
   mkidr /var/opt/xen/ISO_Store
   xe sr-create name-label=LocalISO type=iso device-config:location=/var/opt/xen/ISO_Store device-config:legacy_mode=true content-type=iso
   ```

3. SFTP the files into this folder.

4. In XCP-ng Center:

   4.1 rescan the local ISO storage repository

   4.2 Create a new VM using this ISO
       - Follow the guided install
       - add guest-tools.iso cdrom
       


