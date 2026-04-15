import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, type Mesh, type Points } from "three";

const PARTICLE_COUNT = 1500;

function Particles() {
  const meshRef = useRef<Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const velocities = useMemo(() => {
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return vel;
  }, []);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    return geo;
  }, []);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix] + Math.sin(Date.now() * 0.0001 + i) * 0.001;
      arr[ix + 1] += velocities[ix + 1] + Math.cos(Date.now() * 0.0001 + i) * 0.001;
      arr[ix + 2] += velocities[ix + 2];

      const dx = mx - arr[ix];
      const dy = my - arr[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.002;
        arr[ix] += dx * force * delta * 10;
        arr[ix + 1] += dy * force * delta * 10;
      }

      if (arr[ix] > 10) arr[ix] = -10;
      if (arr[ix] < -10) arr[ix] = 10;
      if (arr[ix + 1] > 10) arr[ix + 1] = -10;
      if (arr[ix + 1] < -10) arr[ix + 1] = 10;
      if (arr[ix + 2] > 5) arr[ix + 2] = -5;
      if (arr[ix + 2] < -5) arr[ix + 2] = 5;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#2dd4a8"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function WireframeSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <icosahedronGeometry args={[3, 2]} />
      <meshBasicMaterial color="#2dd4a8" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 6] as [number, number, number],
          fov: 60,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <WireframeSphere />
      </Canvas>
    </div>
  );
}
