
export async function get360 (){
    let url = "https://s3-ant1.antwerpen.be/prod-wis-360/pano";
    window.images = await Potree.Images360Loader.load(url , viewer, {});
    viewer.scene.add360Images(images);
    viewer.mapView.showSources(false)
}

