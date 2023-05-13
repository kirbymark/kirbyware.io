# Encoded and Decoder vis sops


1. encoded the files with sops : 
   ```
   cypher tls.crt     
   cypher tls.key
   ```   

2. decode with sops : 
   ```
   sops -d tls.enc.crt     
   sops -d tls.enc.key
   ```   

   
