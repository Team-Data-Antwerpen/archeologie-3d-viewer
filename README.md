Nota's:
---------

### installatie:
- De toepassing is een fork van [Potree](https://github.com/potree/potree) een opensource webapplicatie 
- Omdat potree geen gebruik maakt van een package managers zoals npm of yann, doen wij dit ook niet, in de plaats gebruiken we de libs folders, waarin een kopie taat van alle dependencies.
- We gebruiken nodejs http-server voor testing: 
    - https://www.npmjs.com/package/http-server 
    - Hiervoor heb je ook nodejs voor nodig: https://nodejs.org/en/ 
    - installatie: `npm install --global http-server` 

### data aanmaken: 

We gebruiken [PotreeConverter](https://github.com/potree/PotreeConverter) om lidata om te zetten naar streambare data in het potree formaat. 
- Download Potree converter= <https://github.com/potree/PotreeConverter/releases> 

```powershell
cd C:/work/lidar/data
$env:PATH += ";C:\bin\Potree"
PotreeConverter ME_MUUR_CLOUD.laz  -o  ./result --generate-page projectnaam

cd ./result
http-server
```
Open: <http://127.0.0.1:8080/potree.html>

Voor eventuele aanpassingen of conversies naar het las-formaat kan de PDAL-software gebruikt worden (<https://pdal.io/>).

## deployment 

De acceptatie is deze server: RAS3255 mer IP:  172.20.35.51 
De informatie kan met een eenvoudige git-pull in de www-root worden toegevoegd. 

## data opladen

De data wordt opslagen op een S3-achtige cloadian server. 
Om deze te uploaden is een python script voorzien in de folder s3: [uploadtoS3.py](s3/uploadtoS3.py)

### Virtual reality

De potree viewer heeft een VR-optie op devices zoals de Oculus Quest. 

See: [potree-vr.mp4](https://teamdata-analyse-dev.antwerpen.be/s/CIfvv2H) 
