import * as THREE  from "../libs/three.js/build/three.module.js";
import { DRACOLoader } from '../libs/three.js/examples/jsm/loaders/DRACOLoader.js';

const drcloader = new DRACOLoader();
drcloader.setDecoderPath( '../libs/three.js/examples/js/libs/draco/' );
drcloader.preload();

export function drcload(drc, clr, wireframe, opacity) {
    if (clr == null) clr = 0xffffff;

    let mesh = new THREE.Mesh();

    let onload = geom => {
        geom.name = drc;
        const phong = new THREE.MeshPhongMaterial(  
            {   flatShading: true,  color: clr, opacity: 1, opacity: opacity,
                side: THREE.DoubleSide ,  transparent: true, wireframe: wireframe
            } );
        mesh.geometry = geom;
        mesh.material = phong;

    }
    drcloader.load( drc, onload, null, console.error);
    return mesh;
}