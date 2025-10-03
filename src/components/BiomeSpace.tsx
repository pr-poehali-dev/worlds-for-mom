import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Torus } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';

interface InteractiveObject {
  id: string;
  position: [number, number, number];
  message: string;
  icon: string;
  type: 'earth' | 'sun' | 'moon' | 'star' | 'satellite' | 'rocket' | 'nebula';
}

const objects: InteractiveObject[] = [
  { id: '1', position: [0, 0, 0], message: 'На этой прекрасной планете я встретил самого дорогого человека - тебя, мама!', icon: '🌍', type: 'earth' },
  { id: '2', position: [8, 2, -5], message: 'Ты - мое солнце, которое всегда согревает меня своим теплом!', icon: '☀️', type: 'sun' },
  { id: '3', position: [-4, 1, 3], message: 'Как луна отражает свет солнца, я стараюсь отражать твою доброту!', icon: '🌙', type: 'moon' },
  { id: '4', position: [3, -3, 2], message: 'Загадай желание! Я сделаю все, чтобы оно сбылось!', icon: '⭐', type: 'star' },
  { id: '5', position: [-3, 3, -2], message: 'Как спутник следует за планетой, я всегда буду рядом с тобой!', icon: '🛰️', type: 'satellite' },
  { id: '6', position: [5, -2, 4], message: 'Ты дала мне крылья, чтобы лететь к самым смелым мечтам!', icon: '🚀', type: 'rocket' },
  { id: '7', position: [-5, -1, -3], message: 'Ты - мой надежный ориентир в жизни, как это созвездие для мореплавателей!', icon: '✨', type: 'nebula' },
];

function Earth({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color="#1e90ff" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.21, 64, 64]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 1.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function Sun({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial color="#ff8c00" transparent opacity={0.3} emissive="#ff8c00" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" distance={10} />
    </group>
  );
}

function Moon({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick} scale={hovered ? 1.4 : 1}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial color="#c0c0c0" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function Star({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
      groupRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.5 : 1}>
      <mesh>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#ffffe0" emissive="#ffffe0" emissiveIntensity={2} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, (Math.PI * i) / 2, 0]} position={[0.3, 0, 0]}>
          <coneGeometry args={[0.05, 0.3, 4]} />
          <meshStandardMaterial color="#ffffe0" emissive="#ffffe0" emissiveIntensity={1} />
        </mesh>
      ))}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffffe0" distance={3} />
    </group>
  );
}

function Satellite({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.4 : 1}>
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#708090" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.4, 0, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Rocket({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.4 : 1} rotation={[Math.PI * 0.3, 0, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#ff0000" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.12, -0.1, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0.12, -0.1, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#ff8c00" emissive="#ff8c00" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, -0.4, 0]} intensity={1} color="#ff8c00" distance={2} />
    </group>
  );
}

function Nebula({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[Math.cos(i * 1.26) * 0.5, Math.sin(i * 1.26) * 0.5, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#e6e6fa" : "#dda0dd"} 
            emissive={i % 2 === 0 ? "#e6e6fa" : "#dda0dd"} 
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
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
      {obj.type === 'earth' && <Earth {...props} />}
      {obj.type === 'sun' && <Sun {...props} />}
      {obj.type === 'moon' && <Moon {...props} />}
      {obj.type === 'star' && <Star {...props} />}
      {obj.type === 'satellite' && <Satellite {...props} />}
      {obj.type === 'rocket' && <Rocket {...props} />}
      {obj.type === 'nebula' && <Nebula {...props} />}
      
      {hovered && (
        <Text position={[obj.position[0], obj.position[1] + 2, obj.position[2]]} fontSize={0.6} color="#ffd700">
          {obj.icon}
        </Text>
      )}
    </group>
  );
}

function Stars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(1000 * 3);

  for (let i = 0; i < 1000 * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 100;
    starPositions[i + 1] = (Math.random() - 0.5) * 100;
    starPositions[i + 2] = (Math.random() - 0.5) * 100;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  return (
    <points geometry={starsGeometry}>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
}

function SaturnRings({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#f4a460" roughness={0.6} />
      </mesh>
      <Torus ref={ringRef} args={[1.2, 0.1, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshStandardMaterial color="#daa520" transparent opacity={0.7} />
      </Torus>
    </group>
  );
}

function Scene({ onObjectClick }: { onObjectClick: (obj: InteractiveObject) => void }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 2, -5]} intensity={3} color="#ffd700" />
      
      <Stars />
      <SaturnRings position={[6, -4, -8]} />
      
      {objects.map((obj) => (
        <InteractiveObject key={obj.id} obj={obj} onClick={() => onObjectClick(obj)} />
      ))}

      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        maxDistance={20} 
        minDistance={3}
      />
    </>
  );
}

export default function BiomeSpace({ onBack }: { onBack: () => void }) {
  const [selectedObject, setSelectedObject] = useState<InteractiveObject | null>(null);
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());

  const handleObjectClick = (obj: InteractiveObject) => {
    setSelectedObject(obj);
    setFoundObjects(prev => new Set([...prev, obj.id]));
  };

  return (
    <div className="fixed inset-0 bg-black">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-6 py-3 bg-purple-600/80 backdrop-blur-md text-white rounded-full hover:bg-purple-500 transition-all flex items-center gap-2 font-body border border-purple-400/30"
      >
        <Icon name="ArrowLeft" size={20} />
        Назад
      </button>

      <div className="absolute top-6 right-6 z-20 px-6 py-3 bg-purple-600/80 backdrop-blur-md text-white rounded-lg font-body border border-purple-400/30">
        Найдено: {foundObjects.size}/{objects.length}
      </div>

      <Canvas shadows camera={{ position: [0, 0, 12], fov: 75 }}>
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
              className="bg-gradient-to-br from-purple-600 to-pink-800 p-8 rounded-3xl max-w-lg mx-4 border-2 border-purple-400/50 shadow-2xl"
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
