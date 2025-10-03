import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Text, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';

interface InteractiveObject {
  id: string;
  position: [number, number, number];
  message: string;
  icon: string;
  color: string;
  type: 'sphere' | 'box';
}

const objects: InteractiveObject[] = [
  { id: '1', position: [-3, 2, 0], message: 'Мама, ты так же заботилась обо мне, как эта обезьянка о своем малыше!', icon: '🐵', color: '#8B4513', type: 'sphere' },
  { id: '2', position: [3, 1, -2], message: 'Спасибо за все вкусные обеды, которые ты готовила с любовью!', icon: '🍌', color: '#FFD700', type: 'box' },
  { id: '3', position: [0, -1, 3], message: 'Твоя любовь течет вечно, как этот водопад!', icon: '💧', color: '#00CED1', type: 'sphere' },
  { id: '4', position: [-2, 3, 2], message: 'Ты учила меня видеть красоту в каждом маленьком создании!', icon: '🦋', color: '#FF69B4', type: 'sphere' },
  { id: '5', position: [2, -2, 1], message: 'Твоя забота помогала мне расцветать, как этот цветок!', icon: '🌺', color: '#FF1493', type: 'sphere' },
  { id: '6', position: [-1, 1, -3], message: 'Помнишь, как мы вместе учили стихи? Ты была таким терпеливым учителем!', icon: '🦜', color: '#FF4500', type: 'box' },
  { id: '7', position: [1, -3, -1], message: 'Наша семья течет, как эта река - всегда вместе, всегда вперед!', icon: '🏞️', color: '#4682B4', type: 'sphere' },
];

function InteractiveShape({ obj, onClick }: { obj: InteractiveObject; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + obj.position[0]) * 0.002;
    }
  });

  return (
    <group position={obj.position}>
      {obj.type === 'sphere' ? (
        <Sphere
          ref={meshRef}
          args={[0.5, 32, 32]}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <meshStandardMaterial color={obj.color} emissive={obj.color} emissiveIntensity={hovered ? 0.5 : 0.2} />
        </Sphere>
      ) : (
        <Box
          ref={meshRef}
          args={[0.8, 0.8, 0.8]}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <meshStandardMaterial color={obj.color} emissive={obj.color} emissiveIntensity={hovered ? 0.5 : 0.2} />
        </Box>
      )}
      <Text position={[0, 1, 0]} fontSize={0.8} color="white">
        {obj.icon}
      </Text>
    </group>
  );
}

function Scene({ onObjectClick }: { onObjectClick: (obj: InteractiveObject) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10B981" />
      
      {objects.map((obj) => (
        <InteractiveShape key={obj.id} obj={obj} onClick={() => onObjectClick(obj)} />
      ))}

      <Sphere args={[50, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a4d2e" side={THREE.BackSide} opacity={0.3} transparent />
      </Sphere>

      <OrbitControls enableZoom={true} enablePan={true} maxDistance={20} minDistance={5} />
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
