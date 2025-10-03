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
  size?: number;
}

const objects: InteractiveObject[] = [
  { id: '1', position: [0, 0, 0], message: 'На этой прекрасной планете я встретил самого дорогого человека - тебя, мама!', icon: '🌍', color: '#1E90FF', size: 2 },
  { id: '2', position: [8, 2, -5], message: 'Ты - мое солнце, которое всегда согревает меня своим теплом!', icon: '☀️', color: '#FFD700', size: 1.5 },
  { id: '3', position: [-4, 1, 3], message: 'Как луна отражает свет солнца, я стараюсь отражать твою доброту!', icon: '🌙', color: '#C0C0C0', size: 1 },
  { id: '4', position: [3, -3, 2], message: 'Загадай желание! Я сделаю все, чтобы оно сбылось!', icon: '⭐', color: '#FFFFE0', size: 0.6 },
  { id: '5', position: [-3, 3, -2], message: 'Как спутник следует за планетой, я всегда буду рядом с тобой!', icon: '🛰️', color: '#708090', size: 0.5 },
  { id: '6', position: [5, -2, 4], message: 'Ты дала мне крылья, чтобы лететь к самым смелым мечтам!', icon: '🚀', color: '#FF6347', size: 0.7 },
  { id: '7', position: [-5, -1, -3], message: 'Ты - мой надежный ориентир в жизни, как это созвездие для мореплавателей!', icon: '✨', color: '#E6E6FA', size: 0.5 },
];

function Star({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.05, 8, 8]} position={position}>
      <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={Math.random()} />
    </Sphere>
  );
}

function Planet({ obj, onClick }: { obj: InteractiveObject; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (obj.id !== '1') {
        const angle = state.clock.elapsedTime * 0.1 * parseFloat(obj.id);
        meshRef.current.position.x = obj.position[0] + Math.cos(angle) * 0.5;
        meshRef.current.position.z = obj.position[2] + Math.sin(angle) * 0.5;
      }
    }
  });

  return (
    <group position={obj.position}>
      <Sphere
        ref={meshRef}
        args={[obj.size || 0.5, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <meshStandardMaterial 
          color={obj.color} 
          emissive={obj.color} 
          emissiveIntensity={hovered ? 0.6 : 0.3}
        />
      </Sphere>
      <Text position={[0, (obj.size || 0.5) + 0.8, 0]} fontSize={0.6} color="white">
        {obj.icon}
      </Text>
      {hovered && (
        <pointLight position={[0, 0, 0]} intensity={2} color={obj.color} distance={5} />
      )}
    </group>
  );
}

function Scene({ onObjectClick }: { onObjectClick: (obj: InteractiveObject) => void }) {
  const stars = Array.from({ length: 500 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
    ] as [number, number, number],
  }));

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />
      
      {objects.map((obj) => (
        <Planet key={obj.id} obj={obj} onClick={() => onObjectClick(obj)} />
      ))}

      {stars.map((star, i) => (
        <Star key={i} position={star.position} />
      ))}

      <Sphere args={[80, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#000000" side={THREE.BackSide} opacity={0.9} transparent />
      </Sphere>

      <OrbitControls enableZoom={true} enablePan={true} maxDistance={30} minDistance={5} />
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

      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
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
              className="bg-gradient-to-br from-purple-600 to-indigo-800 p-8 rounded-3xl max-w-lg mx-4 border-2 border-purple-400/50 shadow-2xl"
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
        <p>🖱️ Кликай на планеты • 🔄 Вращай мышкой • 🔍 Приближай колесиком</p>
      </div>
    </div>
  );
}
