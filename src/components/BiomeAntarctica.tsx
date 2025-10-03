import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';

interface InteractiveObject {
  id: string;
  position: [number, number, number];
  message: string;
  icon: string;
  color: string;
}

const objects: InteractiveObject[] = [
  { id: '1', position: [-2, 1, 2], message: 'Ты всегда защищала нашу семью, как эти пингвины защищают своих птенцов!', icon: '🐧', color: '#00BFFF' },
  { id: '2', position: [3, -1, -1], message: 'Каждое твое доброе слово было уникальным, как эта снежинка!', icon: '❄️', color: '#E0FFFF' },
  { id: '3', position: [0, 3, 0], message: 'Твоя душа сияет так же ярко, как это северное сияние!', icon: '🌌', color: '#00FF7F' },
  { id: '4', position: [-3, -2, 1], message: 'Твоя мудрость глубока, как подводная часть этого айсберга!', icon: '🧊', color: '#B0E0E6' },
  { id: '5', position: [1, 2, -3], message: 'Ты всегда была моей путеводной звездой!', icon: '⭐', color: '#FFD700' },
  { id: '6', position: [2, -3, 2], message: 'Твоя любовь безгранична, как океан, в котором плавает этот кит!', icon: '🐋', color: '#4169E1' },
  { id: '7', position: [-1, 0, -2], message: 'Даже в самые холодные времена твоя забота согревала меня!', icon: '🌙', color: '#F0E68C' },
];

function Snowflake({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y -= 0.02;
      if (meshRef.current.position.y < -10) {
        meshRef.current.position.y = 10;
      }
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.1, 8, 8]} position={position}>
      <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} />
    </Sphere>
  );
}

function InteractiveShape({ obj, onClick }: { obj: InteractiveObject; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + obj.position[0]) * 0.003;
    }
  });

  return (
    <group position={obj.position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.4 : 1}
      >
        <meshStandardMaterial 
          color={obj.color} 
          emissive={obj.color} 
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      <Text position={[0, 1, 0]} fontSize={0.8} color="white">
        {obj.icon}
      </Text>
    </group>
  );
}

function Scene({ onObjectClick }: { onObjectClick: (obj: InteractiveObject) => void }) {
  const snowflakes = Array.from({ length: 100 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 40,
      Math.random() * 20,
      (Math.random() - 0.5) * 40,
    ] as [number, number, number],
  }));

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
      <pointLight position={[-10, 10, -10]} intensity={0.8} color="#00FF7F" />
      
      {objects.map((obj) => (
        <InteractiveShape key={obj.id} obj={obj} onClick={() => onObjectClick(obj)} />
      ))}

      {snowflakes.map((sf, i) => (
        <Snowflake key={i} position={sf.position} />
      ))}

      <Sphere args={[50, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a3a52" side={THREE.BackSide} opacity={0.4} transparent />
      </Sphere>

      <OrbitControls enableZoom={true} enablePan={true} maxDistance={20} minDistance={5} />
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

      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
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
