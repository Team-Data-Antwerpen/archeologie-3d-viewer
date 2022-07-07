Nota's:
---------

### installatie:

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

### Virtual reality

De potree viewer heeft een VR-optie op devices zoals de Oculus Quest. 

See: [potree-vr.mp4](https://teamdata-analyse-dev.antwerpen.be/s/CIfvv2H) 
