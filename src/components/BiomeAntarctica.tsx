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
  type: 'penguin' | 'snowflake' | 'aurora' | 'iceberg' | 'star' | 'whale' | 'moon';
}

const objects: InteractiveObject[] = [
  { id: '1', position: [-2, -1, 2], message: 'Ты всегда защищала нашу семью, как эти пингвины защищают своих птенцов!', icon: '🐧', type: 'penguin' },
  { id: '2', position: [3, 2, -1], message: 'Каждое твое доброе слово было уникальным, как эта снежинка!', icon: '❄️', type: 'snowflake' },
  { id: '3', position: [0, 3, 0], message: 'Твоя душа сияет так же ярко, как это северное сияние!', icon: '🌌', type: 'aurora' },
  { id: '4', position: [-3, 0, 1], message: 'Твоя мудрость глубока, как подводная часть этого айсберга!', icon: '🧊', type: 'iceberg' },
  { id: '5', position: [1, 2, -3], message: 'Ты всегда была моей путеводной звездой!', icon: '⭐', type: 'star' },
  { id: '6', position: [2, -1, 2], message: 'Твоя любовь безгранична, как океан, в котором плавает этот кит!', icon: '🐋', type: 'whale' },
  { id: '7', position: [-1, 1, -2], message: 'Даже в самые холодные времена твоя забота согревала меня!', icon: '🌙', type: 'moon' },
];

function Penguin({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, 0.05]} scale={[0.8, 0.9, 0.7]}>
        <capsuleGeometry args={[0.12, 0.3, 8, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.12, 0, 0]} rotation={[0, 0, Math.PI * 0.3]}>
        <boxGeometry args={[0.15, 0.05, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.12, 0, 0]} rotation={[0, 0, -Math.PI * 0.3]}>
        <boxGeometry args={[0.15, 0.05, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0.3, 0.08]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
    </group>
  );
}

function Snowflake({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.4 : 1}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 3]}>
          <boxGeometry args={[0.4, 0.05, 0.05]} />
          <meshStandardMaterial color="#e0ffff" emissive="#87ceeb" emissiveIntensity={0.5} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#87ceeb" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function Aurora({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[(i - 1.5) * 0.3, 0, 0]} rotation={[0, 0, Math.sin(i) * 0.3]}>
          <planeGeometry args={[0.2, 1.5]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#00ff7f" : "#00bfff"} 
            emissive={i % 2 === 0 ? "#00ff7f" : "#00bfff"} 
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Iceberg({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.2 : 1}>
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.5, 1, 6]} />
        <meshStandardMaterial color="#b0e0e6" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <coneGeometry args={[0.7, 1.5, 6]} />
        <meshStandardMaterial color="#4682b4" transparent opacity={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Star({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick} scale={hovered ? 1.4 : 1}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={1} />
    </mesh>
  );
}

function Whale({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <mesh>
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial color="#4169e1" />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <coneGeometry args={[0.15, 0.25, 8]} />
        <meshStandardMaterial color="#4169e1" />
      </mesh>
      <mesh position={[-0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.15]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0.2, 0.1, 0]}>
        <coneGeometry args={[0.05, 0.15, 6]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
    </group>
  );
}

function Moon({ position, onClick, hovered }: { position: [number, number, number]; onClick: () => void; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick} scale={hovered ? 1.3 : 1}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#f0e68c" emissive="#f0e68c" emissiveIntensity={0.5} />
    </mesh>
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
      {obj.type === 'penguin' && <Penguin {...props} />}
      {obj.type === 'snowflake' && <Snowflake {...props} />}
      {obj.type === 'aurora' && <Aurora {...props} />}
      {obj.type === 'iceberg' && <Iceberg {...props} />}
      {obj.type === 'star' && <Star {...props} />}
      {obj.type === 'whale' && <Whale {...props} />}
      {obj.type === 'moon' && <Moon {...props} />}
      
      {hovered && (
        <Text position={[obj.position[0], obj.position[1] + 1, obj.position[2]]} fontSize={0.5} color="#87ceeb">
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
      <meshStandardMaterial color="#e0f7ff" roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

function FallingSnow() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.02;
        if (positions[i] < -10) {
          positions[i] = 10;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 300;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = Math.random() * 20;
    positions[i + 2] = (Math.random() - 0.5) * 50;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
}

function Scene({ onObjectClick }: { onObjectClick: (obj: InteractiveObject) => void }) {
  return (
    <>
      <color attach="background" args={['#0a1929']} />
      <fog attach="fog" args={['#0a1929', 10, 25]} />
      
      <ambientLight intensity={0.4} color="#b0e0e6" />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#00bfff" castShadow />
      <pointLight position={[0, 5, 0]} intensity={1} color="#00ff7f" />
      
      <Ground />
      <FallingSnow />
      
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

export default function BiomeAntarctica({ onBack }: { onBack: () => void }) {
  const [selectedObject, setSelectedObject] = useState<InteractiveObject | null>(null);
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());

  const handleObjectClick = (obj: InteractiveObject) => {
    setSelectedObject(obj);
    setFoundObjects(prev => new Set([...prev, obj.id]));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-950 via-cyan-900 to-blue-950">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 px-6 py-3 bg-cyan-600/80 backdrop-blur-md text-white rounded-full hover:bg-cyan-500 transition-all flex items-center gap-2 font-body border border-cyan-400/30"
      >
        <Icon name="ArrowLeft" size={20} />
        Назад
      </button>

      <div className="absolute top-6 right-6 z-20 px-6 py-3 bg-cyan-600/80 backdrop-blur-md text-white rounded-lg font-body border border-cyan-400/30">
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
              className="bg-gradient-to-br from-cyan-600 to-blue-800 p-8 rounded-3xl max-w-lg mx-4 border-2 border-cyan-400/50 shadow-2xl"
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
