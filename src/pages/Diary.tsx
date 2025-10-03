import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';

function Mouse({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#9e9e9e" roughness={0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.55, 20, 32]} />
        <meshStandardMaterial color="#b0b0b0" roughness={0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0.16]} scale={[0.85, 0.9, 0.8]}>
        <capsuleGeometry args={[0.16, 0.45, 16, 28]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
      </mesh>
      
      <mesh position={[-0.18, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.4} />
      </mesh>
      <mesh position={[0.18, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.4} />
      </mesh>
      
      <mesh position={[-0.1, 0.44, 0.2]} castShadow>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.44, 0.2]} castShadow>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.38, 0.24]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
      
      <mesh position={[0, -0.38, 0]} rotation={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.025, 0.7, 10, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      <mesh position={[-0.26, 0.05, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.05, 0.3, 10, 16]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      
      <group ref={rightArmRef}>
        <mesh position={[0.26, 0.05, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.05, 0.3, 10, 16]} />
          <meshStandardMaterial color="#b0b0b0" />
        </mesh>
      </group>
      
      <mesh position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[0.09, 0.035, 10, 20]} />
        <meshStandardMaterial color="#ff0000" roughness={0.3} metalness={0.5} />
      </mesh>
      
      <mesh position={[-0.1, -0.55, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.2, 10, 16]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      <mesh position={[0.1, -0.55, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.2, 10, 16]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
    </group>
  );
}

function BabyMonkey({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2.5 + 1) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#8b4513" roughness={0.7} />
      </mesh>
      
      <mesh position={[0, 0.5, 0.16]} scale={[0.82, 0.88, 0.72]}>
        <sphereGeometry args={[0.24, 28, 28]} />
        <meshStandardMaterial color="#d2691e" roughness={0.6} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.65, 20, 32]} />
        <meshStandardMaterial color="#a0522d" roughness={0.7} />
      </mesh>
      
      <mesh position={[-0.15, 0.56, 0.2]} castShadow>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.56, 0.2]} castShadow>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.46, 0.26]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
      
      <group ref={leftArmRef}>
        <mesh position={[-0.3, 0.15, 0]} rotation={[0, 0, 0.4]} castShadow>
          <capsuleGeometry args={[0.065, 0.38, 12, 20]} />
          <meshStandardMaterial color="#a0522d" />
        </mesh>
      </group>
      
      <group ref={rightArmRef}>
        <mesh position={[0.3, 0.15, 0]} rotation={[0, 0, -0.4]} castShadow>
          <capsuleGeometry args={[0.065, 0.38, 12, 20]} />
          <meshStandardMaterial color="#a0522d" />
        </mesh>
      </group>
      
      <mesh position={[0, -0.52, 0.32]} rotation={[Math.PI * 0.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.035, 0.75, 10, 20]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      <mesh position={[-0.12, -0.58, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.25, 12, 18]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
      <mesh position={[0.12, -0.58, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.25, 12, 18]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
      
      <mesh position={[0, 0.64, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

function AdultMonkey({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + 2) * 0.06;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1) * 0.05;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#3d2817" roughness={0.75} />
      </mesh>
      
      <mesh position={[0, 0.6, 0.18]} scale={[0.86, 0.92, 0.76]}>
        <sphereGeometry args={[0.28, 28, 28]} />
        <meshStandardMaterial color="#8b4513" roughness={0.65} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.85, 20, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.75} />
      </mesh>
      
      <mesh position={[-0.17, 0.67, 0.22]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.17, 0.67, 0.22]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.56, 0.3]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      
      <group ref={leftArmRef}>
        <mesh position={[-0.4, 0.2, 0]} rotation={[0, 0, 0.5]} castShadow>
          <capsuleGeometry args={[0.09, 0.55, 12, 20]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
      
      <group ref={rightArmRef}>
        <mesh position={[0.4, 0.2, 0]} rotation={[0, 0, -0.5]} castShadow>
          <capsuleGeometry args={[0.09, 0.55, 12, 20]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
      
      <mesh position={[-0.16, -0.54, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.35, 12, 20]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.16, -0.54, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.35, 12, 20]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      <mesh position={[-0.27, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.025, 12, 24]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Dragon({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.8 + 3) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.25;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.25;
    }
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.35;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.6 + Math.sin(state.clock.elapsedTime * 1.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.5} />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.75, 20, 32]} />
        <meshStandardMaterial color="#43a047" roughness={0.5} />
      </mesh>
      
      <mesh position={[0, 0, 0.17]} scale={[0.82, 0.87, 0.72]}>
        <capsuleGeometry args={[0.21, 0.6, 16, 28]} />
        <meshStandardMaterial color="#00bcd4" roughness={0.4} />
      </mesh>
      
      <mesh position={[-0.15, 0.57, 0.22]} castShadow>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.57, 0.22]} castShadow>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 0.51, 0.28]} castShadow>
        <coneGeometry args={[0.09, 0.2, 10]} />
        <meshStandardMaterial color="#ffd700" roughness={0.4} />
      </mesh>
      
      <mesh position={[-0.13, 0.68, 0]} castShadow>
        <coneGeometry args={[0.065, 0.17, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} />
      </mesh>
      <mesh position={[0.13, 0.68, 0]} castShadow>
        <coneGeometry args={[0.065, 0.17, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} />
      </mesh>
      
      <mesh 
        ref={leftWingRef}
        position={[-0.32, 0.38, -0.12]} 
        rotation={[0, Math.PI * 0.3, Math.PI * 0.5]} 
        castShadow
      >
        <coneGeometry args={[0.28, 0.45, 4]} />
        <meshStandardMaterial 
          color="#2e7d32" 
          emissive="#1b5e20" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>
      
      <mesh 
        ref={rightWingRef}
        position={[0.32, 0.38, -0.12]} 
        rotation={[0, -Math.PI * 0.3, -Math.PI * 0.5]} 
        castShadow
      >
        <coneGeometry args={[0.28, 0.45, 4]} />
        <meshStandardMaterial 
          color="#2e7d32" 
          emissive="#1b5e20" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.92}
        />
      </mesh>
      
      <mesh 
        ref={tailRef}
        position={[0, -0.52, -0.22]} 
        rotation={[Math.PI * 0.4, 0, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.065, 0.65, 10, 20]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      
      <mesh position={[0, -0.85, -0.45]} castShadow>
        <coneGeometry args={[0.11, 0.22, 4]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          position={[0, 0.72 - i * 0.13, -0.16]} 
          rotation={[Math.PI * 0.5, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.055, 0.16, 6]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      ))}
      
      <group ref={leftArmRef}>
        <mesh position={[-0.38, 0.12, 0]} rotation={[0, 0, 0.6]} castShadow>
          <capsuleGeometry args={[0.075, 0.42, 12, 20]} />
          <meshStandardMaterial color="#43a047" />
        </mesh>
      </group>
      
      <mesh position={[-0.16, -0.52, 0]} castShadow>
        <capsuleGeometry args={[0.085, 0.28, 12, 20]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
      <mesh position={[0.16, -0.52, 0]} castShadow>
        <capsuleGeometry args={[0.085, 0.28, 12, 20]} />
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
      <capsuleGeometry args={[0.025, distance - 0.1, 8, 16]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
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
      
      <Mouse position={[-1.9, 0, 0]} />
      <BabyMonkey position={[-0.63, 0, 0]} />
      <AdultMonkey position={[0.63, 0, 0]} />
      <Dragon position={[1.9, 0, 0]} />
      
      <HandConnection start={[-1.64, 0.05, 0]} end={[-0.93, 0.05, 0]} />
      <HandConnection start={[-0.33, 0.05, 0]} end={[0.23, 0.05, 0]} />
      <HandConnection start={[1.03, 0.05, 0]} end={[1.52, 0.05, 0]} />
      
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
                <p className="text-white/60 text-xs font-body mt-1">1980 год</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-amber-600/30">
                <div className="text-3xl mb-2">🦍</div>
                <p className="text-white/90 text-sm font-body font-bold">Обезьяна</p>
                <p className="text-white/60 text-xs font-body mt-1">1980 год</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-green-500/30">
                <div className="text-3xl mb-2">🐉</div>
                <p className="text-white/90 text-sm font-body font-bold">Дракон</p>
                <p className="text-white/60 text-xs font-body mt-1">2012 год</p>
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
