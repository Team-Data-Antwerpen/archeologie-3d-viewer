import {geocoder, completer} from './geocoder.js'

export async function viewInit(meshes){
 //Sidabar
    viewer.loadGUI(() => {
        viewer.toggleSidebar();
        $("#menu_simple").next().show();
        $("#search_simple").next().show();
        $("#menu_filters").hide();
    });

 // Add entries for the meshes to object list in sidebar
    viewer.onGUILoaded(() => {
       
        document.getElementById("3dmodel_onoff").addEventListener('change', () =>{
            Object.values(meshes).forEach( mesh => {
                mesh.visible = document.getElementById("3dmodel_onoff").checked;
            });
        })

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

        let a_search = document.getElementById("a_search");
        a_search.addEventListener("keyup", event => {
            if (event.key === "Enter") {
                geocoder(  a_search.value)
            }
            });

        $( "#a_search" ).autocomplete({
            source: ( request, response ) => {
                completer(request.term, response )
            },
            minLength: 2,
            select: (_, i) =>  geocoder(i.item.value)
          });

    });
}