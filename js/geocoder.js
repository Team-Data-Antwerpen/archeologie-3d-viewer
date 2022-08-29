function completer( qry, callback ){
    let q = qry.endsWith(', Antwerpen') ? qry : qry + ', Antwerpen'
    const osm_url = 'https://loc.geopunt.be/geolocation/Suggestion?'
    const params = new URLSearchParams({"q": q, 'c': 12});
    fetch(osm_url + params.toString() ).then( e=> e.json() ).then( resp =>{
        let completerList = resp.SuggestionResult.filter( i=> i.includes('Antwerpen'));
        callback(completerList);
    });
}

async function searchVL( qry, city='Antwerpen', limit=1){
    let VL_url = 'https://loc.geopunt.be/geolocation/Location?';
    let q = qry.endsWith(city) ? qry : qry + ', '+ city;
    let params = new URLSearchParams({"q": q, "c": limit})

    let resp  =  await fetch(VL_url + params.toString());
    let result = await resp.json();

    if(result.LocationResult.length){
        let rec = result.LocationResult[0];
        let name = rec.Thoroughfarename;
        let fullName =  rec.FormattedAddress +" ("+ rec.LocationType.replace('crab_', ' ') +")";
        let xy_lb72 = [ rec.Location.X_Lambert72, rec.Location.Y_Lambert72 ];
        return {'name': name, 'info': fullName, 'xy': xy_lb72};
    }
}

function _make_anno(xyz, title, info){
        let cameraXYZ = [xyz[0] +100, xyz[1], 200];
        let anno = new Potree.Annotation({
            position: xyz, cameraPosition: cameraXYZ, cameraTarget: xyz, title: title, description: info });
        viewer.scene.annotations.add(anno);
        anno.moveHere();
        setTimeout( ()=> viewer.scene.removeAnnotation(anno) , 5000 );
    }

async function geocoder( query ){
    searchVL(query).then(result =>{
        if(result === undefined || result === null){
            console.log(query + " could not be found");
            return;
        }
        let xyz = [...result.xy, 50]
        _make_anno(xyz, query, result.info);
    });
}

export {searchVL, geocoder, completer};