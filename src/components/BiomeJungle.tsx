import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';

interface InteractiveObject {
  id: string;
  position: [number, number, number];
  message: string;
  icon: string;
  type: 'tree' | 'flower' | 'butterfly' | 'parrot' | 'banana' | 'waterfall' | 'monkey';
}

const objects: InteractiveObject[] = [
  { id: '1', position: [-3, 0, 0], message: 'Мама, ты так же заботилась обо мне, как эта обезьянка о своем малыше!', icon: '🐵', type: 'monkey' },
  { id: '2', position: [3, 1, -2], message: 'Спасибо за все вкусные обеды, которые ты готовила с любовью!', icon: '🍌', type: 'banana' },
  { id: '3', position: [0, -1, 3], message: 'Твоя любовь течет вечно, как этот водопад!', icon: '💧', type: 'waterfall' },
  { id: '4', position: [-2, 3, 2], message: 'Ты учила меня видеть красоту в каждом маленьком создании!', icon: '🦋', type: 'butterfly' },
  { id: '5', position: [2, 0, 1], message: 'Твоя забота помогала мне расцветать, как этот цветок!', icon: '🌺', type: 'flower' },
  { id: '6', position: [-1, 2, -3], message: 'Помнишь, как мы вместе учили стихи? Ты была таким терпеливым учителем!', icon: '🦜', type: 'parrot' },
  { id: '7', position: [1, 0, -1], message: 'Как дерево растет благодаря корням, я вырос благодаря тебе!', icon: '🌴', type: 'tree' },
];

function Tree({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.2 : 1}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#4a2511" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color="#0f5e0f" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial color="#1a8a1a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.4, 0]} castShadow>
        <coneGeometry args={[0.4, 1, 8]} />
        <meshStandardMaterial color="#25b525" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Flower({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI * 0.4) * 0.15, 0.6, Math.sin(i * Math.PI * 0.4) * 0.15]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Butterfly({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      groupRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI * 0.3]}>
        <boxGeometry args={[0.25, 0.15, 0.02]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff69b4" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.15, 0, 0]} rotation={[0, 0, -Math.PI * 0.3]}>
        <boxGeometry args={[0.25, 0.15, 0.02]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff69b4" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function Parrot({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI * 0.2]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      <mesh position={[0.25, 0, 0]} rotation={[0, 0, -Math.PI * 0.2]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      <mesh position={[0.05, 0.1, 0.12]}>
        <coneGeometry args={[0.05, 0.15, 8]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
    </group>
  );
}

function Banana({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1} rotation={[0, 0, Math.PI * 0.2]}>
      <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
      <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.2} />
    </mesh>
  );
}

function Waterfall({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 0.5;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <group position={position} onClick={onClick} scale={hovered ? 1.2 : 1}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial color="#00ced1" transparent opacity={0.6} />
      </mesh>
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial size={0.02} color="#87ceeb" transparent opacity={0.8} />
      </points>
    </group>
  );
}

function Monkey({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
      <mesh position={[-0.1, 0.35, 0.08]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.35, 0.08]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function InteractiveObject({ obj, onClick }: { obj: InteractiveObject; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  const props = {
    position: obj.position,
    onClick,
    hovered,
  };

  return (
    <group onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      {obj.type === 'tree' && <Tree {...props} />}
      {obj.type === 'flower' && <Flower {...props} />}
      {obj.type === 'butterfly' && <Butterfly {...props} />}
      {obj.type === 'parrot' && <Parrot {...props} />}
      {obj.type === 'banana' && <Banana {...props} />}
      {obj.type === 'waterfall' && <Waterfall {...props} />}
      {obj.type === 'monkey' && <Monkey {...props} />}
      
      {hovered && (
        <Text position={[obj.position[0], obj.position[1] + 1.5, obj.position[2]]} fontSize={0.5} color="#ffd700">
          {obj.icon}
        </Text>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#1a4d2e" roughness={0.8} />
    </mesh>
  );
}

function BackgroundTrees() {
  const trees = [];
  for (let i = 0; i < 20; i++) {
    const x = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 40;
    if (Math.abs(x) > 5 || Math.abs(z) > 5) {
      trees.push(
        <group key={i} position={[x, -2, z]}>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 2.5, 8]} />
            <meshStandardMaterial color="#3d2817" />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[1, 2, 8]} />
            <meshStandardMaterial color="#0a3d0a" />
          </mesh>
        </group>
      );
    }
  }
  return <>{trees}</>;
}

function Scene({ onObjectClick }: { onObjectClick: (obj: InteractiveObject) => void }) {
  return (
    <>
      <color attach="background" args={['#0d3d1a']} />
      <fog attach="fog" args={['#0d3d1a', 10, 30]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#10B981" />
      
      <Ground />
      <BackgroundTrees />
      
      {objects.map((obj) => (
        <InteractiveObject key={obj.id} obj={obj} onClick={() => onObjectClick(obj)} />
      ))}

      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        maxDistance={15} 
        minDistance={3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function BiomeJungle({ onBack }: { onBack: () => void }) {
  const [selectedObject, setSelectedObject] = useState<InteractiveObject | null>(null);
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());

  const handleObjectClick = (obj: InteractiveObject) => {
    setSelectedObject(obj);
    setFoundObjects(prev => new Set([...prev, obj.id]));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-900">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-6 py-3 bg-green-600/80 backdrop-blur-md text-white rounded-full hover:bg-green-500 transition-all flex items-center gap-2 font-body border border-green-400/30"
      >
        <Icon name="ArrowLeft" size={20} />
        Назад
      </button>

      <div className="absolute top-6 right-6 z-20 px-6 py-3 bg-green-600/80 backdrop-blur-md text-white rounded-lg font-body border border-green-400/30">
        Найдено: {foundObjects.size}/{objects.length}
      </div>

      <Canvas shadows camera={{ position: [0, 2, 8], fov: 75 }}>
        <Scene onObjectClick={handleObjectClick} />
      </Canvas>

      <AnimatePresence>
        {selectedObject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedObject(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-3xl max-w-lg mx-4 border-2 border-green-400/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl text-center mb-4">{selectedObject.icon}</div>
              <p className="text-white text-lg md:text-xl text-center font-body leading-relaxed">
                {selectedObject.message}
              </p>
              <button
                onClick={() => setSelectedObject(null)}
                className="mt-6 w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all font-body"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-center font-body text-sm">
        <p>🖱️ Кликай на объекты • 🔄 Вращай мышкой • 🔍 Приближай колесиком</p>
      </div>
    </div>
  );
}
