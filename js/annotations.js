export async function initAnnotations(scene, list_pcl) {
    {
        let xyz = [154182.5,209123.9, 50];
        let cameraXYZ = [154166.1,209343.0, 700];
        let title = _titleTempl(  list_pcl[0].name ,  list_pcl[0].url );
        let description = `Een korte beschrijving van deze opgraving, 
        <a target="_blank" href="${list_pcl[1].url}">hyperlinks</a> 
        en <b>html</b> mogen.`
        let anno_1 = _createAnnotation(xyz, cameraXYZ, title, description );
        scene.annotations.add(anno_1);
    
    }
    {
        let xyz = [151693.4,211793.2, 50];
        let title = _titleTempl( list_pcl[2].name , list_pcl[2].url );
        let cameraXYZ = [151630.93,211818.31, 700];
        let description = `Een korte beschrijving van deze opgraving, 
        <a target="_blank" href="${list_pcl[2].url}">hyperlinks</a> 
        en <b>html</b> mogen.`
        let anno_2 = _createAnnotation(xyz, cameraXYZ, title, description );
        scene.annotations.add(anno_2);
    }
}

const _titleTempl = (name, url) => `<span>
            ${name}
            <a href="${url}"> 
            <img src="./img/goto.svg" 
                name="action_set_scene"
                class="annotation-action-icon" 
                style="filter: invert(1);" /> </a>
            </span>`

const _createAnnotation = ( labelXYZ, cameraXYZ, title, description  ) => 
     new Potree.Annotation({position: labelXYZ, cameraPosition: cameraXYZ, cameraTarget: labelXYZ, title: title, description: description });