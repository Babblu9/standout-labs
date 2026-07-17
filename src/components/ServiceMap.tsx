import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EcosystemNode {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  tagline: string;
  services: string[];
  connections: string[]; // Connected Node IDs
}

export default function ServiceMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: EcosystemNode[] = [
    {
      id: 'brand',
      name: 'Branding',
      x: 160,
      y: 120,
      color: '#3B82F6',
      tagline: 'Build a brand people remember.',
      services: ['Brand Strategy', 'Naming', 'Logo Design', 'Brand Identity', 'Brand Guidelines', 'Packaging', 'Pitch Decks'],
      connections: ['web', 'content', 'core']
    },
    {
      id: 'web',
      name: 'Web',
      x: 440,
      y: 120,
      color: '#3B82F6',
      tagline: 'Make your business impossible to ignore.',
      services: ['Website Design', 'Web Development', 'Landing Pages', 'UI/UX Design', 'E-commerce', 'SEO Optimization'],
      connections: ['brand', 'growth', 'core']
    },
    {
      id: 'content',
      name: 'Content',
      x: 120,
      y: 300,
      color: '#3B82F6',
      tagline: 'Reach the right people.',
      services: ['Social Media', 'Content Marketing', 'Video Production', 'Motion Graphics', 'Reels', 'Influencer Campaigns'],
      connections: ['brand', 'growth', 'core']
    },
    {
      id: 'growth',
      name: 'Growth',
      x: 480,
      y: 300,
      color: '#3B82F6',
      tagline: 'Turn traffic into customers.',
      services: ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'CRO', 'Analytics', 'Marketing Funnels', 'Lead Generation'],
      connections: ['web', 'content', 'ai', 'core']
    },
    {
      id: 'ai',
      name: 'AI Automation',
      x: 300,
      y: 380,
      color: '#3B82F6',
      tagline: 'Scale operations with AI systems.',
      services: ['AI Agents', 'CRM Automation', 'WhatsApp Automation', 'Voice AI Agents', 'Workflow Automation', 'Chatbots'],
      connections: ['growth', 'core']
    },
    {
      id: 'experiences',
      name: 'Experiences',
      x: 300,
      y: 60,
      color: '#3B82F6',
      tagline: 'Premium physical touchpoints.',
      services: ['Event Branding', 'Exhibition Design', 'Experiential Marketing', 'OOH Campaigns', 'Activations'],
      connections: ['brand', 'web', 'core']
    },
    {
      id: 'core',
      name: 'Standout Systems',
      x: 300,
      y: 220,
      color: '#111111',
      tagline: 'One partner. Every touchpoint.',
      services: ['We make brands impossible to ignore.'],
      connections: ['brand', 'web', 'content', 'growth', 'ai', 'experiences']
    }
  ];

  const handleNodeHover = (nodeId: string | null) => {
    setActiveNode(nodeId);
  };

  const getActiveNodeData = () => {
    return nodes.find(n => n.id === activeNode) || null;
  };

  const activeNodeData = getActiveNodeData();

  // Helper to check if a link is connected to the hovered node
  const isLinkActive = (from: string, to: string) => {
    if (!activeNode) return true; // Standard view
    if (activeNode === 'core') return true; // Core connects all
    return (from === activeNode && to === 'core') || (to === activeNode && from === 'core') || 
           (from === activeNode && nodes.find(n => n.id === activeNode)?.connections.includes(to)) ||
           (to === activeNode && nodes.find(n => n.id === to)?.connections.includes(from));
  };

  // Helper to check if a node is connected to the hovered node
  const isNodeActive = (nodeId: string) => {
    if (!activeNode) return true;
    if (nodeId === activeNode) return true;
    if (nodeId === 'core') return true;
    return activeNodeData?.connections.includes(nodeId) || false;
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Left Column: SVG Ecosystem Map */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="relative w-full max-w-[560px] aspect-[5/4] bg-white border border-[#E3E3DF] rounded-2xl shadow-[0_1px_2px_rgba(17,17,17,0.01),0_12px_32px_rgba(17,17,17,0.02)] overflow-hidden">
          
          {/* Dot grid inside map */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

          <svg viewBox="0 0 600 440" className="w-full h-full p-4 overflow-visible relative z-10">
            <defs>
              <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting lines */}
            {nodes.flatMap(fromNode => 
              fromNode.connections.map(toId => {
                const toNode = nodes.find(n => n.id === toId);
                if (!toNode || fromNode.id > toNode.id) return null; // Avoid duplicate lines
                
                const active = isLinkActive(fromNode.id, toNode.id);
                const isAnyHovered = activeNode !== null;

                return (
                  <motion.line
                    key={`${fromNode.id}-${toNode.id}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={active ? '#3B82F6' : '#E3E3DF'}
                    strokeWidth={active ? 3 : 1.5}
                    animate={{
                      opacity: isAnyHovered ? (active ? 0.9 : 0.15) : 0.5,
                      strokeDasharray: active && isAnyHovered ? '4 4' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })
            )}

            {/* Nodes */}
            {nodes.map(node => {
              const isHovered = activeNode === node.id;
              const isConnected = isNodeActive(node.id);
              const isAnyHovered = activeNode !== null;
              
              const isCore = node.id === 'core';

              return (
                <motion.g
                  key={node.id}
                  onMouseEnter={() => handleNodeHover(node.id)}
                  onMouseLeave={() => handleNodeHover(null)}
                  className="cursor-none"
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    opacity: isAnyHovered ? (isConnected ? 1 : 0.3) : 1
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Outer circle */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isCore ? 34 : 26}
                    fill={isHovered ? '#3B82F6' : (isCore ? '#111111' : '#FFFFFF')}
                    stroke={isCore ? '#111111' : '#3B82F6'}
                    strokeWidth={isCore ? 0 : 2}
                    style={{ filter: isHovered ? 'url(#nodeGlow)' : 'none' }}
                  />

                  {/* Inner text */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fontSize={isCore ? '10' : '9'}
                    fontWeight="bold"
                    fill={isHovered ? '#FFFFFF' : (isCore ? '#FFFFFF' : '#111111')}
                    fontFamily="Space Grotesk"
                  >
                    {isCore ? 'SYSTEMS' : node.name.split(' ')[0]}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right Column: Node Details Panel */}
      <div className="lg:col-span-5 min-h-[360px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeNodeData ? (
            <motion.div
              key={activeNodeData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                  Active Ecosystem Segment
                </span>
                <h3 className="font-display font-bold text-4xl text-brand-black tracking-tight leading-[0.95]">
                  {activeNodeData.name}
                </h3>
                <p className="text-brand-gray text-base leading-relaxed mt-1 font-sans">
                  {activeNodeData.tagline}
                </p>
              </div>

              <div className="border-t border-[#E3E3DF] pt-6 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                  Systems Deliverables:
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {activeNodeData.services.map(service => (
                    <div key={service} className="flex items-center gap-2.5 text-brand-gray text-sm font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block flex-shrink-0"></span>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 text-left"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Interactive Map
              </span>
              <h3 className="font-display font-bold text-4xl text-brand-black tracking-tight leading-[0.95] max-w-sm">
                Hover any node to light up links.
              </h3>
              <p className="text-brand-gray text-base leading-relaxed max-w-sm font-sans">
                Each node represents an integrated outcome engine. Move your mouse over the ecosystem to see how strategy, design, content, and automation connect.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
