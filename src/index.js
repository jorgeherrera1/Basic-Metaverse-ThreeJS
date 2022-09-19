import Movements from './movements.js';
import blockchain from './web3.js';
import abi from "./abi/abi.js";


// declaration of new scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbdf1e5);

// camara and rendered configuration
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// setting the scene lights
const ambientLight = new THREE.AmbientLight(0xbda355);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
ambientLight.add(directionalLight);
scene.add(ambientLight);

// setting up flat space
const spaceGeometry = new THREE.BoxGeometry(100, 0.2, 50);
const spaceMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const space = new THREE.Mesh(spaceGeometry, spaceMaterial);
scene.add(space);

/*
// cube
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );

// cone
const coneGeometry = new THREE.ConeGeometry( 5, 20, 32 );
const coneMaterial = new THREE.MeshPhongMaterial( {color: 0xed810a} );
const cone = new THREE.Mesh( coneGeometry, coneMaterial );
cone.position.set(-10, 5, 0);
scene.add( cone );

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 5, 32 );
const cylinderMaterial = new THREE.MeshPhongMaterial( {color: 0x0000ff} );
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.set(20, 5, 0);
scene.add( cylinder );
*/

camera.position.z = 5;
camera.position.set(10, 5, 40);

function animate() {
    /*
    cube.rotation.x += 0.05;
    cube.rotation.z += 0.05;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    cylinder.rotation.x += 0.1;
    cylinder.rotation.y += 0.1;
    */
    //camera.position.x += 0.01;
    requestAnimationFrame(animate);

    // movement to the left
    if (Movements.onKeyPressed(37)) {
        camera.position.x -= 0.5;
    }

    // movement up
    if (Movements.onKeyPressed(38)) {
        camera.position.x += 0.5;

        camera.position.y += 0.5;
    }

    // movement right
    if (Movements.onKeyPressed(39)) {
        camera.position.x += 0.5;
    }

    // movement down
    if (Movements.onKeyPressed(40)) {
        camera.position.x -= 0.5;

        camera.position.y -= 0.5;
    }

    camera.lookAt(space.position);

    renderer.render(scene, camera);
}
animate();

// New NFT
const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', (ev) => {
    const nftName = document.getElementById('nft_name').value;
    const nftWidth = document.getElementById('nft_width').value;
    const nftHeigth = document.getElementById('nft_height').value;
    const nftDepth = document.getElementById('nft_depth').value;
    const nftX = document.getElementById('nft_x').value;
    const nftY = document.getElementById('nft_y').value;
    const nftZ = document.getElementById('nft_z').value;

    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it");
    }

    // Web3 instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0xAC0942cA1848A75B07323755b62DaC529f19E008");

    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.mint(nftName, nftWidth, nftHeigth, nftDepth, nftX, nftY, nftZ).send({ from: accounts[0] }).then((data) => {
            console.log("NFT available in the metaverse");
        });
    });
});

// Web 3 connection to the data generated in the blockchain
blockchain.then(result => {
    // for each building paid in the smart contract
    result.buildings.forEach((building, index) => {
        if (index <= result.supply) {
            // representation of tokens nft
            const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
            const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x33fffc });
            const nft = new THREE.Mesh(boxGeometry, boxMaterial);
            nft.position.set(building.x, building.y, building.z);
            scene.add(nft);
        }
    });
});