
        // import * as THREE from 'three';
		import { FontLoader } from './examples/jsm/loaders/FontLoader.js'
		import { TextGeometry } from './examples/jsm/geometries/TextGeometry.js';
		// import { GUI } from './examples/jsm/libs/lil-gui.module.min.js';
		let camera, scene, renderer;

		// let scene2, renderer2;

		const frustumSize = 500;
		let font = undefined;
		let targetRotation = 0;
		const height = 20,
			size = 100,
			hover = 30,

			curveSegments = 4,

			bevelThickness = 2,
			bevelSize = 1.5;
		let bevelEnabled = true;
		let text = 'V Boobalan',

			fontName = 'optimer',
			materials, // helvetiker, optimer, gentilis, droid sans, droid serif
			fontWeight = 'bold',
			textMesh1,
			group,
			gui,
			spotLight1,
			spotLight2,
			spotLight3,
			spotLight4,
			spotLight5;
		let textGeo;
		init();
		animate();

		buildGui();
		function init() {



			const aspect = window.innerWidth / window.innerHeight;
			camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);

			camera.position.set(355, 100, 200);



			scene = new THREE.Scene();
			scene.background = new THREE.Color(0x000000);

			// scene2 = new THREE.Scene();

			materials = [
				new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
				new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
			];

			group = new THREE.Group();
			group.position.y = 100;

			scene.add(group);

			spotLight();
			loadFont();


			// left

			//
			renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);




			window.addEventListener('resize', onWindowResize);

		}
		function spotLight() {
			spotLight1 = new THREE.SpotLight(0xffffff);
			spotLight1.position.set(75, 195, 190);
			spotLight1.distance = 200;
			spotLight1.castShadow = true;
			spotLight1.intensity = 2;
			spotLight1.angle = 1;
			spotLight1.focus = 1;
			// spotLight1.shadow.mapSize.width = 1024;
			// spotLight1.shadow.mapSize.height = 1024;

			// spotLight1.shadow.camera.near = 500;
			// spotLight1.shadow.camera.far = 400;
			// spotLight1.shadow.camera.fov = 30;



			spotLight2 = new THREE.SpotLight(0xff0000);

			spotLight2.position.set(280, 170, 110);
			spotLight2.distance = 200;
			spotLight2.castShadow = true;
			spotLight2.intensity = 2;
			spotLight2.angle = 1;
			spotLight2.focus = 1;


			spotLight3 = new THREE.SpotLight(0x0f9ee6);

			spotLight3.position.set(364, 195, 110);
			spotLight3.distance = 200;
			spotLight3.castShadow = true;
			spotLight3.intensity = 2;
			spotLight3.angle = 1;
			spotLight3.focus = 1;
			
			spotLight4 = new THREE.SpotLight(0x2ef57a);

spotLight4.position.set(515, 190, 110);
spotLight4.distance = 200;
spotLight4.castShadow = true;
spotLight4.intensity = 2;
spotLight4.angle = 1;
spotLight4.focus = 1;

spotLight5= new THREE.SpotLight(0xe3cb2b);
spotLight5.position.set(715, 145, 55);
spotLight5.distance = 200;
spotLight5.castShadow = true;
spotLight5.intensity = 2;
spotLight5.angle = 1;
spotLight5.focus = 1;
			scene.add(spotLight1);
			scene.add(spotLight2);
			scene.add(spotLight3);
			scene.add(spotLight4);
			scene.add(spotLight5);
			const spotLightHelper = new THREE.SpotLightHelper(spotLight1);
			const spotLightHelper1 = new THREE.SpotLightHelper(spotLight2);
			const spotLightHelper2 = new THREE.SpotLightHelper(spotLight3);
			const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
			const spotLightHelper5 = new THREE.SpotLightHelper(spotLight5);
			//  scene.add(spotLightHelper);
			//  scene.add(spotLightHelper1);
			//  scene.add(spotLightHelper2);
			//  scene.add(spotLightHelper5);
		}
		function createText() {

			textGeo = new TextGeometry(text, {

				font: font,

				size: size,
				height: height,
				curveSegments: curveSegments,

				bevelThickness: bevelThickness,
				bevelSize: bevelSize,
				bevelEnabled: bevelEnabled

			});

			textGeo.computeBoundingBox();

			const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

			textMesh1 = new THREE.Mesh(textGeo, materials);

			textMesh1.position.x = 0;
			textMesh1.position.y = 0;
			textMesh1.position.z = 0;

			textMesh1.rotation.x = 0;
			textMesh1.rotation.y = Math.PI * 2;

			group.add(textMesh1);


		}

		function refreshText() {

			// updatePermalink();

			group.remove(textMesh1);
			//  group.remove(textMesh2);

			if (!text) return;

			createText();

		}
		function loadFont() {

			const loader = new FontLoader();
			loader.load('./examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function (response) {

				font = response;

				refreshText();

			});

		}
		function onWindowResize() {

			const aspect = window.innerWidth / window.innerHeight;

			camera.left = - frustumSize * aspect / 2;
			camera.right = frustumSize * aspect / 2;
			camera.top = frustumSize / 2;
			camera.bottom = - frustumSize / 2;

			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

			// renderer2.setSize(window.innerWidth, window.innerHeight);

		}

		function animate() {

			requestAnimationFrame(animate);
			// requestAnimationFrame( animate );

			 group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
// console.log(" group ",group);
			//  camera.lookAt( cameraTarget );

			renderer.clear();
			renderer.render(scene, camera);
			// renderer2.render(scene2, camera);

		}
		function onPointerDown( event ) {

if ( event.isPrimary === false ) return;

pointerXOnPointerDown = event.clientX - windowHalfX;
targetRotationOnPointerDown = targetRotation;

document.addEventListener( 'pointermove', onPointerMove );
document.addEventListener( 'pointerup', onPointerUp );

}

function onPointerMove( event ) {

if ( event.isPrimary === false ) return;

pointerX = event.clientX - windowHalfX;

targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02;

}
		function buildGui() {
			gui = new GUI();

			const params = {

				'x': camera.position.x,
				'y': camera.position.y,
				'z': camera.position.z,
				'x1': spotLight1.position.x,
				'y1': spotLight1.position.y,
				'z1': spotLight1.position.z,
				'x2': spotLight2.position.x,
				'y2': spotLight2.position.y,
				'z2': spotLight2.position.z,
				'light color': spotLight1.color.getHex(),
				intensity: spotLight1.intensity,
				distance: spotLight1.distance,
				angle: spotLight1.angle,
				penumbra: spotLight1.penumbra,
				decay: spotLight1.decay,
				focus: spotLight1.shadow.focus,
				'Light Color 2': spotLight2.color.getHex(),
				intensity1: spotLight2.intensity,
				distance1: spotLight2.distance,
				angle1: spotLight2.angle,
				penumbra1: spotLight2.penumbra,
				decay1: spotLight2.decay,
				focus1: spotLight2.shadow.focus,
				'Light Color 3': spotLight3.color.getHex(),
				intensity3: spotLight3.intensity,
				distance3: spotLight3.distance,
				angle3: spotLight3.angle,
				penumbra3: spotLight3.penumbra,
				decay3: spotLight3.decay,
				focus3: spotLight3.shadow.focus,
				'Light Color 4': spotLight4.color.getHex(),
				intensity4: spotLight4.intensity,
				distance4: spotLight4.distance,
				angle4: spotLight4.angle,
				penumbra4: spotLight4.penumbra,
				decay4: spotLight4.decay,
				focus4: spotLight4.shadow.focus,
				'Light Color 5': spotLight5.color.getHex(),
				intensity5: spotLight5.intensity,
				distance5: spotLight5.distance,
				angle5: spotLight5.angle,
				penumbra5: spotLight5.penumbra,
				decay5: spotLight5.decay,
				focus5: spotLight5.shadow.focus

			}


			gui.add(params, 'x').onChange(function (val) {

				camera.position.x = val
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'y').onChange(function (val) {

				camera.position.y = val
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.add(params, 'z').onChange(function (val) {

				camera.position.z = val
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.add(params, 'x1').onChange(function (val) {

				spotLight1.position.x = val
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'y1').onChange(function (val) {

				spotLight1.position.y = val
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.add(params, 'z1').onChange(function (val) {

				spotLight1.position.z = val
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.add(params, 'x2').onChange(function (val) {

				spotLight2.position.x = val
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'y2').onChange(function (val) {

				spotLight2.position.y = val
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.add(params, 'z2').onChange(function (val) {

				spotLight2.position.z = val
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.addColor(params, 'light color').onChange(function (val) {

				spotLight1.color.setHex(val);
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'intensity', 0, 2).onChange(function (val) {

				spotLight1.intensity = val;
				renderer.clear();
				renderer.render(scene, camera);

			});


			gui.add(params, 'distance', 50, 200).onChange(function (val) {

				spotLight1.distance = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'angle', 0, Math.PI / 3).onChange(function (val) {

				spotLight1.angle = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'penumbra', 0, 1).onChange(function (val) {

				spotLight1.penumbra = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'decay', 1, 2).onChange(function (val) {

				spotLight1.decay = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'focus', 0, 1).onChange(function (val) {

				spotLight1.shadow.focus = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.addColor(params, 'Light Color 2').onChange(function (val) {

				spotLight2.color.setHex(val);
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'intensity1', 0, 2).onChange(function (val) {

				spotLight2.intensity = val;
				renderer.clear();
				renderer.render(scene, camera);

			});


			gui.add(params, 'distance1', 50, 200).onChange(function (val) {

				spotLight2.distance = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'angle1', 0, Math.PI / 3).onChange(function (val) {

				spotLight2.angle = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'penumbra1', 0, 1).onChange(function (val) {

				spotLight2.penumbra = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'decay1', 1, 2).onChange(function (val) {

				spotLight2.decay = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'focus1', 0, 1).onChange(function (val) {

				spotLight2.shadow.focus = val;
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.addColor(params, 'Light Color 3').onChange(function (val) {

				spotLight3.color.setHex(val);
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'intensity3', 0, 2).onChange(function (val) {

				spotLight3.intensity = val;
				renderer.clear();
				renderer.render(scene, camera);

			});


			gui.add(params, 'distance3', 50, 200).onChange(function (val) {

				spotLight3.distance = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'angle3', 0, Math.PI / 3).onChange(function (val) {

				spotLight3.angle = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'penumbra3', 0, 1).onChange(function (val) {

				spotLight3.penumbra = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'decay3', 1, 2).onChange(function (val) {

				spotLight3.decay = val;
				renderer.clear();
				renderer.render(scene, camera);

			});

			gui.add(params, 'focus3', 0, 1).onChange(function (val) {

				spotLight3.shadow.focus = val;
				renderer.clear();
				renderer.render(scene, camera);

			});
			gui.addColor(params, 'Light Color 3').onChange(function (val) {

spotLight3.color.setHex(val);
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'intensity4', 0, 2).onChange(function (val) {

spotLight4.intensity = val;
renderer.clear();
renderer.render(scene, camera);

});


gui.add(params, 'distance4', 50, 200).onChange(function (val) {

spotLight4.distance = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'angle4', 0, Math.PI / 3).onChange(function (val) {

spotLight4.angle = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'penumbra4', 0, 1).onChange(function (val) {

spotLight4.penumbra = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'decay4', 1, 2).onChange(function (val) {

spotLight4.decay = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'focus4', 0, 1).onChange(function (val) {

spotLight4.shadow.focus = val;
renderer.clear();
renderer.render(scene, camera);

});
gui.addColor(params, 'Light Color 5').onChange(function (val) {

spotLight5.color.setHex(val);
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'intensity5', 0, 2).onChange(function (val) {

spotLight5.intensity = val;
renderer.clear();
renderer.render(scene, camera);

});


gui.add(params, 'distance5', 50, 200).onChange(function (val) {

spotLight5.distance = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'angle5', 0, Math.PI / 3).onChange(function (val) {

spotLight5.angle = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'penumbra5', 0, 1).onChange(function (val) {

spotLight5.penumbra = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'decay5', 1, 2).onChange(function (val) {

spotLight5.decay = val;
renderer.clear();
renderer.render(scene, camera);

});

gui.add(params, 'focus5', 0, 1).onChange(function (val) {

spotLight5.shadow.focus = val;
renderer.clear();
renderer.render(scene, camera);

});
			// gui.open();
		}