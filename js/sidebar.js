export async function viewInit(meshes){
 //Sidabar
    viewer.loadGUI(() => {
        viewer.toggleSidebar();
        $("#menu_simple").next().show();
        
        document.getElementById("visu1").addEventListener('change', () =>{
            if( document.getElementById("visu1").checked) {
                let pc =viewer.scene.pointclouds[0];
                pc.material.activeAttributeName = 'rgba';
                for (let prop in viewer.classifications){
                    viewer.setClassificationVisibility(prop,1);
                }
                // $('#classificationPicker').hide()
            } 
        });
        document.getElementById("visu2").addEventListener('change', () =>{
            if( document.getElementById("visu2").checked) {
                let pc =viewer.scene.pointclouds[0];
                viewer.setClassificationVisibility(1,0);
                pc.material.activeAttributeName = 'classification';
                // $('#classificationPicker').show();
            } 
        });

        document.getElementById("3dmodel_onoff").addEventListener('change', () =>{
            Object.values(meshes).forEach( mesh => {
                mesh.visible = document.getElementById("3dmodel_onoff").checked;
            });
        })


    });

 // Add entries for the meshes to object list in sidebar
    viewer.onGUILoaded(() => {
       
        let tree = $(`#jstree_scene`);
        let parentNode = "vectors";

        Object.entries(meshes).forEach(entry => {
            const [key, mesh] = entry;
            
            viewer.scene.scene.add(mesh);
            let vecID= tree.jstree('create_node', parentNode, { 
                    "text": key, 
                    "icon": `${Potree.resourcePath}/icons/triangle.svg`,
                    "data": mesh
                },  "last", false, false);
            tree.jstree(mesh.visible ? "check_node" : "uncheck_node", vecID);
        });

    });
    
}