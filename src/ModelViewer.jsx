import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import GLTFLoader
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

function ModelViewer() {
  const containerRef = useRef();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable antialiasing and alpha for transparent background
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load 3D model using GLTFLoader
    const loader = new GLTFLoader();
    loader.load('/scene.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Adjust camera position to fit the loaded model
      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
      camera.position.set(center.x, center.y, center.z + cameraZ);

      // Update camera controls target to center of the model
      camera.lookAt(center);
    });

    // Light setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Orbit controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia) for smoother interaction
    controls.dampingFactor = 0.25; // Adjust damping factor

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls in each frame
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div style={{ backgroundColor: 'transparent' }} ref={containerRef}></div>;
}

export default ModelViewer;