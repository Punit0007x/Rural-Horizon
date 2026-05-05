import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  targetPosition?: [number, number, number] | null;
  villageView?: {
    buildings: Array<{ position: [number, number, number] }>;
    npcPosition?: [number, number, number];
  } | null;
  onArrived?: () => void;
  enabled?: boolean;
}

const CameraController = ({ targetPosition, villageView, onArrived, enabled = true }: CameraControllerProps) => {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTouch = useRef({ x: 0, y: 0 });
  const touchStartDistance = useRef(0);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const dragThreshold = 10; // pixels
  const spherical = useRef(new THREE.Spherical(80, Math.PI / 3, 0));
  const targetSpherical = useRef(new THREE.Spherical(80, Math.PI / 3, 0));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const velocity = useRef({ x: 0, y: 0 });
  const panSpeed = 0.08;
  const rotateSpeed = 0.008;
  const zoomSpeed = 2;
  const transitioning = useRef(false);
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const pos = new THREE.Vector3().setFromSpherical(spherical.current).add(lookTarget.current);
    camera.position.copy(pos);
    camera.lookAt(lookTarget.current);
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      if (e.buttons === 1) {
        // Left click: orbit around look target (more immersive)
        velocity.current.x = dx * rotateSpeed;
        velocity.current.y = dy * rotateSpeed;
        targetSpherical.current.theta -= velocity.current.x;
        targetSpherical.current.phi -= velocity.current.y;
        targetSpherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.current.phi));
      } else if (e.buttons === 2) {
        // Right click: pan view
        const right = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0);
        camera.getWorldDirection(right);
        right.cross(up).normalize();
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        targetLookTarget.current.add(right.multiplyScalar(-dx * panSpeed));
        targetLookTarget.current.add(forward.multiplyScalar(dy * panSpeed));
        targetLookTarget.current.x = Math.max(-150, Math.min(150, targetLookTarget.current.x));
        targetLookTarget.current.z = Math.max(-150, Math.min(150, targetLookTarget.current.z));
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetSpherical.current.radius += e.deltaY * 0.05;
      targetSpherical.current.radius = Math.max(20, Math.min(250, targetSpherical.current.radius));
    };

    const handleContext = (e: MouseEvent) => e.preventDefault();

    // Touch event handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Single touch: record start position
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        hasMoved.current = false;
        isDragging.current = false;
      } else if (e.touches.length === 2) {
        // Two touches: start pinch for zoom - prevent default for pinch
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        touchStartDistance.current = distance;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartPos.current.x;
        const dy = touch.clientY - touchStartPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > dragThreshold) {
          // User is dragging, prevent default and start camera control
          e.preventDefault();
          hasMoved.current = true;
          isDragging.current = true;
        }

        if (isDragging.current) {
          const touchDx = touch.clientX - lastTouch.current.x;
          const touchDy = touch.clientY - lastTouch.current.y;
          lastTouch.current = { x: touch.clientX, y: touch.clientY };

          velocity.current.x = touchDx * rotateSpeed;
          velocity.current.y = touchDy * rotateSpeed;
          targetSpherical.current.theta -= velocity.current.x;
          targetSpherical.current.phi -= velocity.current.y;
          targetSpherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.current.phi));
        }
      } else if (e.touches.length === 2) {
        // Two touches: pinch to zoom
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        const deltaDistance = distance - touchStartDistance.current;
        targetSpherical.current.radius -= deltaDistance * 0.1;
        targetSpherical.current.radius = Math.max(20, Math.min(250, targetSpherical.current.radius));
        touchStartDistance.current = distance;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isDragging.current = false;
        hasMoved.current = false;
      }
      // Don't prevent default on touchend to allow click events
    };

    const el = gl.domElement;
    el.addEventListener("keydown", handleKeyDown);
    el.addEventListener("keyup", handleKeyUp);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mouseleave", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("contextmenu", handleContext);

    // Touch events for mobile
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true }); // Allow default behavior on touchend

    // Prevent default touch behaviors that interfere with 3D controls
    el.addEventListener("gesturestart", (e) => e.preventDefault(), { passive: false });
    el.addEventListener("gesturechange", (e) => e.preventDefault(), { passive: false });
    el.addEventListener("gestureend", (e) => e.preventDefault(), { passive: false });

    return () => {
      el.removeEventListener("keydown", handleKeyDown);
      el.removeEventListener("keyup", handleKeyUp);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mouseleave", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("contextmenu", handleContext);

      // Touch events cleanup
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);

      // Gesture cleanup
      el.removeEventListener("gesturestart", (e) => e.preventDefault());
      el.removeEventListener("gesturechange", (e) => e.preventDefault());
      el.removeEventListener("gestureend", (e) => e.preventDefault());
    };
  }, [gl, camera, enabled]);

  useEffect(() => {
    if (villageView) {
      transitioning.current = true;

      // Calculate bounding box of all buildings and NPC
      const positions: THREE.Vector3[] = [];
      villageView.buildings.forEach(building => {
        positions.push(new THREE.Vector3(...building.position));
      });
      if (villageView.npcPosition) {
        positions.push(new THREE.Vector3(...villageView.npcPosition));
      }

      if (positions.length > 0) {
        // Calculate center
        const center = new THREE.Vector3();
        positions.forEach(pos => center.add(pos));
        center.divideScalar(positions.length);

        // Calculate max distance from center
        let maxDistance = 0;
        positions.forEach(pos => {
          const distance = pos.distanceTo(center);
          maxDistance = Math.max(maxDistance, distance);
        });

        // Set camera to view the entire village
        targetLookTarget.current.copy(center);
        targetSpherical.current.radius = Math.max(maxDistance * 2.5, 40); // Ensure minimum distance
        targetSpherical.current.theta = 0; // Face the village
        targetSpherical.current.phi = Math.PI / 4; // 45 degree angle
      }
    }
  }, [villageView]);

  // Cache vectors to reduce allocations
  const tmpPos = useRef(new THREE.Vector3());
  const tmpLookTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!enabled) return;

    // Handle keyboard movement
    const moveSpeed = 0.15;
    if (keys.current['w']) targetLookTarget.current.z -= moveSpeed;
    if (keys.current['s']) targetLookTarget.current.z += moveSpeed;
    if (keys.current['a']) targetLookTarget.current.x -= moveSpeed;
    if (keys.current['d']) targetLookTarget.current.x += moveSpeed;

    targetLookTarget.current.x = Math.max(-150, Math.min(150, targetLookTarget.current.x));
    targetLookTarget.current.z = Math.max(-150, Math.min(150, targetLookTarget.current.z));

    // Apply inertial damping to velocity
    velocity.current.x *= 0.88;
    velocity.current.y *= 0.88;

    // Smooth transitions with easing (faster when dragging / interacting)
    const interactionLerp = isDragging.current ? 0.22 : 0.12;
    spherical.current.theta += (targetSpherical.current.theta - spherical.current.theta) * interactionLerp;
    spherical.current.phi += (targetSpherical.current.phi - spherical.current.phi) * interactionLerp;
    spherical.current.radius += (targetSpherical.current.radius - spherical.current.radius) * (interactionLerp * 0.9);

    lookTarget.current.lerp(targetLookTarget.current, interactionLerp * 0.9);

    if (transitioning.current && targetPosition) {
      const target = tmpPos.current.set(targetPosition[0], 0, targetPosition[2]);
      if (lookTarget.current.distanceTo(target) < 1 && spherical.current.radius < 40) {
        transitioning.current = false;
        onArrived?.();
      }
    }

    tmpPos.current.setFromSpherical(spherical.current).add(lookTarget.current);
    camera.position.lerp(tmpPos.current, interactionLerp);

    tmpLookTarget.current.copy(lookTarget.current);
    tmpLookTarget.current.y = 3;
    camera.lookAt(tmpLookTarget.current);
  });

  return null;
};

export default CameraController;
