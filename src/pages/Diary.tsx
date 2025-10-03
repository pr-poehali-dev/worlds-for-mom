import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';

function Mouse({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#8b8b8b" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
        <meshStandardMaterial color="#a0a0a0" />
      </mesh>
      <mesh position={[-0.08, 0.3, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      <mesh position={[0.08, 0.3, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      <mesh position={[0, 0.28, 0.08]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <coneGeometry args={[0.08, 0.15, 16]} />
        <meshStandardMaterial color="#a0a0a0" />
      </mesh>
    </group>
  );
}

function Monkey({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + 1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <capsuleGeometry args={[0.12, 0.35, 8, 16]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
      <mesh position={[-0.1, 0.4, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.4, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.15, 0.1, 0]} rotation={[0, 0, Math.PI * 0.3]}>
        <capsuleGeometry args={[0.04, 0.2, 6, 12]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
      <mesh position={[0.15, 0.1, 0]} rotation={[0, 0, -Math.PI * 0.3]}>
        <capsuleGeometry args={[0.04, 0.2, 6, 12]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
    </group>
  );
}

function Dragon({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#dc143c" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      <mesh position={[0, 0.3, 0.1]}>
        <coneGeometry args={[0.05, 0.12, 8]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      <mesh position={[-0.18, 0.25, 0]} rotation={[0, 0, Math.PI * 0.5]}>
        <coneGeometry args={[0.12, 0.2, 4]} />
        <meshStandardMaterial color="#dc143c" emissive="#dc143c" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.18, 0.25, 0]} rotation={[0, 0, -Math.PI * 0.5]}>
        <coneGeometry args={[0.12, 0.2, 4]} />
        <meshStandardMaterial color="#dc143c" emissive="#dc143c" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <coneGeometry args={[0.06, 0.25, 8]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0.35 - i * 0.08, -0.1]} rotation={[Math.PI * 0.5, 0, 0]}>
          <coneGeometry args={[0.03, 0.08, 4]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      ))}
    </group>
  );
}

function Tiger({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + 3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.35, 8, 16]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
      <mesh position={[-0.1, 0.28, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.28, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.12, 0.35, 0]}>
        <coneGeometry args={[0.04, 0.08, 4]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>
      <mesh position={[0.12, 0.35, 0]}>
        <coneGeometry args={[0.04, 0.08, 4]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>
      <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, Math.PI * 0.3]}>
        <capsuleGeometry args={[0.04, 0.15, 6, 12]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
      <mesh position={[0.15, 0.05, 0]} rotation={[0, 0, -Math.PI * 0.3]}>
        <capsuleGeometry args={[0.04, 0.15, 6, 12]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
    </group>
  );
}

function CharactersScene() {
  return (
    <>
      <color attach="background" args={['#1a1a2e']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -3]} intensity={0.5} color="#8B5CF6" />
      
      <Mouse position={[-1.2, 0, 0]} />
      <Monkey position={[-0.4, 0, 0]} />
      <Tiger position={[0.4, 0, 0]} />
      <Dragon position={[1.2, 0, 0]} />
      
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0f0f1e" transparent opacity={0.5} />
      </mesh>

      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        maxDistance={4} 
        minDistance={1.5}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function Diary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-purple via-space-black to-neon-purple py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 px-6 py-3 bg-neon-purple/80 backdrop-blur-md text-white rounded-full hover:bg-neon-purple transition-all flex items-center gap-2 font-body border border-neon-purple/30"
        >
          <Icon name="ArrowLeft" size={20} />
          На главную
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-deep-purple/80 to-neon-purple/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-cyan-blue/30 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading text-glow">
              📖 Космический Дневник 📖
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border border-cyan-blue/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-cyan-blue rounded-full flex items-center justify-center text-3xl">
                👩‍🚀
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
                  Оксана
                </h2>
                <p className="text-cyan-blue font-body text-lg">
                  Покорительница Миров
                </p>
              </div>
            </div>

            <div className="mb-6 text-white/80 font-body">
              <p className="text-lg">Возраст: 45 лет</p>
            </div>

            <div className="space-y-6 text-white font-body leading-relaxed">
              <h3 className="text-2xl font-bold text-golden-orange mb-4 font-heading">
                О самом дорогом человеке
              </h3>
              
              <p className="text-lg">
                Мама - это не просто слово. Это целая вселенная любви, заботы и бесконечного тепла. 
                Как космонавт исследует далекие миры, так и ты всю жизнь исследуешь способы сделать 
                мою жизнь лучше, ярче и счастливее.
              </p>

              <p className="text-lg">
                Твоя любовь безгранична, как космос. Твоя мудрость глубока, как океан. 
                Твоя забота нежна, как северное сияние. Ты - мое солнце, которое освещает 
                каждый мой день, моя путеводная звезда, которая всегда указывает правильный путь.
              </p>

              <p className="text-lg">
                Спасибо тебе за каждый момент, за каждую улыбку, за каждое теплое слово. 
                Спасибо за то, что ты есть. Спасибо за то, что ты - моя мама.
              </p>

              <p className="text-2xl font-bold text-center text-golden-orange mt-8">
                С Днем Рождения, мама! 💜
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-cyan-blue/20">
            <p className="text-center text-cyan-blue font-body mb-4 text-sm">
              🖱️ Вращай мышкой • 🔍 Приближай колесиком
            </p>
            <div className="w-full h-64 rounded-xl overflow-hidden">
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <CharactersScene />
              </Canvas>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-center">
              <div className="flex-1">
                <div className="text-2xl mb-1">🐭</div>
                <p className="text-white/70 text-xs font-body">Мышка</p>
              </div>
              <div className="flex-1">
                <div className="text-2xl mb-1">🐵</div>
                <p className="text-white/70 text-xs font-body">Обезьянка</p>
              </div>
              <div className="flex-1">
                <div className="text-2xl mb-1">🐯</div>
                <p className="text-white/70 text-xs font-body">Тигр</p>
              </div>
              <div className="flex-1">
                <div className="text-2xl mb-1">🐉</div>
                <p className="text-white/70 text-xs font-body">Дракон</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
