
import * as THREE  from "../libs/three.js/build/three.module.js";
import {drcload} from "./tree_utils.js"
import {initAnnotations} from "./annotations.js"
import {viewInit} from './sidebar.js'

// load meshes
const listData = await fetch('list.json');
const list_pcl = await listData.json(); 
const buildings = new THREE.Group();
const brug = drcload( list_pcl.brug,  0xff00ff, 0,1);

list_pcl.building.forEach( drc => {
    let mesh = drcload(  drc,  0xff0000, 0, 1);
    buildings.add(mesh);
});
const antw_pc= list_pcl.pcs[4];
const muur_pc= list_pcl.pcs[3];

// init viewer
window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
viewer.setEDLEnabled(true);
viewer.setFOV(60);
viewer.setPointBudget(2_000_000);
viewer.loadSettingsFromURL();
viewer.setControls( viewer.earthControls) //viewer.orbitControls);
viewer.compass.setVisible(1)
viewer.setDescription("Draaien met rechtse muis ingdrukt houden, slepen met linkse muis, zoomen met muiswiel.");
viewer.setClassifications( antw_pc.classes );

//init sidebar
viewInit({"Gebouwen": buildings, "Bruggen": brug});

// lights
const dirLight1 = new THREE.DirectionalLight( 0xffffff );
dirLight1.position.set( 1, 1, 1 );
viewer.scene.scene.add( dirLight1 );
const ambientLight = new THREE.AmbientLight( 0x777777 );
viewer.scene.scene.add( ambientLight );

// load antwerpen
Potree.loadPointCloud(antw_pc.meta , antw_pc.name , e => {
    let pointcloud = e.pointcloud;
    let material = pointcloud.material;
    material.size = 1;
    material.pointSizeType = Potree.PointSizeType.FIXED;
    material.shape = Potree.PointShape.CIRCLE;
    material.opacity = 0.5
    material.activeAttributeName = "classification";
    viewer.setClassificationVisibility(1,0);
    viewer.scene.addPointCloud(pointcloud);

    // Annotations of points in local coordinates.
    initAnnotations(viewer.scene, list_pcl.pcs);

    viewer.setTopView();
});

// load loodswezen
Potree.loadPointCloud(muur_pc.meta , muur_pc.name , e => {
    let pointcloud = e.pointcloud;
    let material = pointcloud.material;
    material.size = 1;
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    material.shape = Potree.PointShape.CIRCLE;
    material.activeAttributeName = "rgba";
    viewer.setClassificationVisibility(1,0);
    viewer.scene.addPointCloud(pointcloud);

    // Annotations
    let labelXYZ = [152239,213171, 10];
    let title = "Loodswezen gebouw"
    let cameraXYZ = [152237,213180, 50];
    let description = "Opgraving nabij voormalig loodswezen gebouw, zoom in op om te zien"
    let anno = new Potree.Annotation({position: labelXYZ, cameraPosition: cameraXYZ, cameraTarget: labelXYZ, title: title, description: description });
    viewer.scene.annotations.add(anno);
});


