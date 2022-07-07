export async function initAnnotations(scene, list_pcl) {
    console.log(list_pcl)
    {
        let xyz = [155138.4,210863.7, 50];
        let cameraXYZ = [155684.7,211530.4, 700];
        let title = _titleTempl(  list_pcl[0].name ,  list_pcl[0].url );
        let description = `Een korte beschrijving van deze opgraving, 
        <a target="_blank" href="${list_pcl[1].url}">hyperlinks</a> 
        en <b>html</b> mogen.`
        let anno_1 = _createAnnotation(xyz, cameraXYZ, title, description );
        scene.annotations.add(anno_1);
    
    }
    {
        let xyz = [149663.1, 210147.2, 50];
        let title = _titleTempl( list_pcl[2].name , list_pcl[2].url );
        let cameraXYZ = [149253.6, 210661.7, 700];
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