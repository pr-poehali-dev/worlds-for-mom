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
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial color="#9e9e9e" roughness={0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.5, 16, 32]} />
        <meshStandardMaterial color="#b0b0b0" roughness={0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0.14]} scale={[0.85, 0.9, 0.8]}>
        <capsuleGeometry args={[0.15, 0.4, 12, 24]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
      </mesh>
      
      <mesh position={[-0.16, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.4} />
      </mesh>
      <mesh position={[0.16, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.4} />
      </mesh>
      
      <mesh position={[-0.08, 0.42, 0.18]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 0.42, 0.18]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.38, 0.22]} castShadow>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
      
      <mesh position={[0, -0.32, 0]} rotation={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.02, 0.6, 8, 16]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      <mesh position={[0.25, 0.05, 0]} rotation={[0, 0, -Math.PI * 0.15]} castShadow>
        <capsuleGeometry args={[0.05, 0.25, 8, 16]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      
      <mesh position={[0, 0.18, 0]} castShadow>
        <torusGeometry args={[0.08, 0.03, 8, 16]} />
        <meshStandardMaterial color="#ff0000" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

function BabyMonkey({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2.5 + 1) * 0.12;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#8b4513" roughness={0.7} />
      </mesh>
      
      <mesh position={[0, 0.5, 0.15]} scale={[0.8, 0.85, 0.7]}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial color="#d2691e" roughness={0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.6, 16, 32]} />
        <meshStandardMaterial color="#a0522d" roughness={0.7} />
      </mesh>
      
      <mesh position={[-0.14, 0.55, 0.18]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.14, 0.55, 0.18]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.45, 0.24]} castShadow>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
      
      <group ref={armRef}>
        <mesh position={[-0.28, 0.15, 0]} rotation={[0, 0, Math.PI * 0.5]} castShadow>
          <capsuleGeometry args={[0.06, 0.35, 8, 16]} />
          <meshStandardMaterial color="#a0522d" />
        </mesh>
      </group>
      
      <mesh position={[0.28, 0.15, 0]} rotation={[0, 0, -Math.PI * 0.5]} castShadow>
        <capsuleGeometry args={[0.06, 0.35, 8, 16]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
      
      <mesh position={[0, -0.5, 0.3]} rotation={[Math.PI * 0.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.7, 8, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

function AdultMonkey({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + 2) * 0.06;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#3d2817" roughness={0.75} />
      </mesh>
      
      <mesh position={[0, 0.6, 0.17]} scale={[0.85, 0.9, 0.75]}>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshStandardMaterial color="#8b4513" roughness={0.65} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.8, 16, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.75} />
      </mesh>
      
      <mesh position={[-0.16, 0.66, 0.2]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.16, 0.66, 0.2]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.56, 0.28]} castShadow>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      
      <mesh position={[-0.38, 0.2, 0]} rotation={[0, 0, Math.PI * 0.4]} castShadow>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[0.38, 0.2, 0]} rotation={[0, 0, -Math.PI * 0.4]} castShadow>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[-0.15, -0.5, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.15, -0.5, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[-0.25, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.02, 8, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Dragon({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const wingsRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.8 + 3) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
    }
    if (wingsRef.current) {
      wingsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.3;
    }
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.5} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.7, 16, 32]} />
        <meshStandardMaterial color="#43a047" roughness={0.5} />
      </mesh>
      
      <mesh position={[0, 0, 0.16]} scale={[0.8, 0.85, 0.7]}>
        <capsuleGeometry args={[0.2, 0.55, 12, 24]} />
        <meshStandardMaterial color="#00bcd4" roughness={0.4} />
      </mesh>
      
      <mesh position={[-0.14, 0.56, 0.2]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.14, 0.56, 0.2]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.5, 0.26]} castShadow>
        <coneGeometry args={[0.08, 0.18, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.4} />
      </mesh>
      
      <mesh position={[-0.12, 0.65, 0]} castShadow>
        <coneGeometry args={[0.06, 0.15, 6]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.65, 0]} castShadow>
        <coneGeometry args={[0.06, 0.15, 6]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} />
      </mesh>
      
      <group ref={wingsRef}>
        <mesh position={[-0.3, 0.35, -0.1]} rotation={[0, Math.PI * 0.3, Math.PI * 0.5]} castShadow>
          <coneGeometry args={[0.25, 0.4, 4]} />
          <meshStandardMaterial 
            color="#2e7d32" 
            emissive="#1b5e20" 
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
      
      <mesh position={[0.3, 0.35, -0.1]} rotation={[0, -Math.PI * 0.3, -Math.PI * 0.5]} castShadow>
        <coneGeometry args={[0.25, 0.4, 4]} />
        <meshStandardMaterial 
          color="#2e7d32" 
          emissive="#1b5e20" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh 
        ref={tailRef}
        position={[0, -0.5, -0.2]} 
        rotation={[Math.PI * 0.4, 0, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.06, 0.6, 8, 16]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      
      <mesh position={[0, -0.8, -0.4]} castShadow>
        <coneGeometry args={[0.1, 0.2, 4]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          position={[0, 0.7 - i * 0.12, -0.15]} 
          rotation={[Math.PI * 0.5, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.05, 0.15, 4]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      ))}
      
      <mesh position={[-0.35, 0.1, 0]} rotation={[0, 0, Math.PI * 0.5]} castShadow>
        <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
      
      <mesh position={[-0.15, -0.5, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
      <mesh position={[0.15, -0.5, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
    </group>
  );
}

function HandConnection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = (start[1] + end[1]) / 2 + Math.sin(time * 2) * 0.05;
    }
  });

  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];
  
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  );
  
  const angle = Math.atan2(end[2] - start[2], end[0] - start[0]);

  return (
    <mesh 
      ref={meshRef}
      position={midpoint} 
      rotation={[0, 0, angle]}
    >
      <capsuleGeometry args={[0.02, distance - 0.4, 6, 12]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
    </mesh>
  );
}

function CharactersScene() {
  return (
    <>
      <color attach="background" args={['#0f0a1e']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, 3, 3]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[0, -2, 5]} intensity={0.5} color="#00bcd4" />
      <directionalLight 
        position={[3, 8, 4]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      <Mouse position={[-1.8, 0, 0]} />
      <BabyMonkey position={[-0.6, 0, 0]} />
      <AdultMonkey position={[0.6, 0, 0]} />
      <Dragon position={[1.8, 0, 0]} />
      
      <HandConnection start={[-1.8, 0.05, 0]} end={[-0.6, 0.15, 0]} />
      <HandConnection start={[-0.6, 0.15, 0]} end={[0.6, 0.2, 0]} />
      <HandConnection start={[0.6, 0.2, 0]} end={[1.8, 0.1, 0]} />
      
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.6} />
      </mesh>

      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        maxDistance={6} 
        minDistance={2}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
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
              🖱️ Вращай мышкой • 🔍 Приближай колесиком • ✨ Автоповорот включен
            </p>
            <div className="w-full h-96 rounded-xl overflow-hidden bg-gradient-to-b from-deep-purple/50 to-space-black/80">
              <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }}>
                <CharactersScene />
              </Canvas>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/5 rounded-lg p-3 border border-pink-500/30">
                <div className="text-3xl mb-2">🐭</div>
                <p className="text-white/90 text-sm font-body font-bold">Мышка</p>
                <p className="text-white/60 text-xs font-body mt-1">2008 год</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-orange-500/30">
                <div className="text-3xl mb-2">🐵</div>
                <p className="text-white/90 text-sm font-body font-bold">Обезьянка</p>
                <p className="text-white/60 text-xs font-body mt-1">2016 год</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-amber-600/30">
                <div className="text-3xl mb-2">🦍</div>
                <p className="text-white/90 text-sm font-body font-bold">Обезьяна</p>
                <p className="text-white/60 text-xs font-body mt-1">2004 год</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-green-500/30">
                <div className="text-3xl mb-2">🐉</div>
                <p className="text-white/90 text-sm font-body font-bold">Дракон</p>
                <p className="text-white/60 text-xs font-body mt-1">2024 год</p>
              </div>
            </div>
            <p className="text-center text-white/50 text-xs font-body mt-4 italic">
              Четыре года, четыре персонажа - символы нашей семьи 💫
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
