import { BookOpen, MapPin, Ruler, HardHat, Info, CheckCircle2, ChevronRight, BrainCircuit, Droplets, Mountain } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Types for our content
interface Topic {
  id: string;
  title: string;
  titleNep: string;
  mnemonic?: {
    word: string;
    description: string;
    items: { char: string; term: string; desc: string }[];
  };
  content: JSX.Element;
}

interface Chapter {
  id: string;
  title: string;
  icon: any;
  topics: Topic[];
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState('alignment');
  const [activeTopic, setActiveTopic] = useState('factors');
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const toggleComplete = (id: string) => {
    setCompletedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const chapters: Chapter[] = [
    {
      id: 'intro',
      title: 'Introduction',
      icon: <Info className="w-5 h-5" />,
      topics: [
        {
          id: 'def-imp',
          title: 'Definition & Importance',
          titleNep: 'परिभाषा र महत्त्व',
          mnemonic: {
            word: 'NEPAL',
            description: 'Importance of Hill Roads in Nepal',
            items: [
              { char: 'N', term: 'National Security', desc: 'Safety of borders and remote access.' },
              { char: 'E', term: 'Economy & Education', desc: 'Trade and access to schools/health.' },
              { char: 'P', term: 'Power', desc: 'Hydropower development machinery transport.' },
              { char: 'A', term: 'Agriculture & Alternative', desc: 'Cash crops and flight substitute.' },
              { char: 'L', term: 'Linkage & Local Tourism', desc: 'Social connection and tourism.' },
            ]
          },
          content: (
            <div className="space-y-4">
              <p className="text-gray-700">A hill road is defined as a road that passes through terrain with a <strong>cross slope of 25% or more</strong>.</p>
              <h4 className="font-bold text-blue-800">Key Characteristics:</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Steep gradients and sharp curves.</li>
                <li>Heavy earthwork (Cutting & Filling).</li>
                <li>Requirement of Retaining & Breast walls.</li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      id: 'alignment',
      title: 'Road Alignment',
      icon: <MapPin className="w-5 h-5" />,
      topics: [
        {
          id: 'factors',
          title: 'Factors Affecting Alignment',
          titleNep: 'अलाइनमेन्टलाई असर गर्ने तत्वहरु',
          mnemonic: {
            word: 'TARGET',
            description: 'Key factors for route selection',
            items: [
              { char: 'T', term: 'Topography', desc: 'Natural shape of the mountain and saddles.' },
              { char: 'A', term: 'Altitude & Aspect', desc: 'Snow limits and sunny vs shady side.' },
              { char: 'R', term: 'River & Drainage', desc: 'Avoid marshy land, find narrow crossings.' },
              { char: 'G', term: 'Geology', desc: 'Hard stable rocks vs landslide zones.' },
              { char: 'E', term: 'Earthwork Balance', desc: 'Matching cut and fill volumes.' },
              { char: 'T', term: 'Traffic & Economy', desc: 'Connecting towns and shortening distance.' },
            ]
          },
          content: (
            <div className="space-y-4">
              <p className="text-gray-700">Choosing the right route (alignment) is the most critical task in hill road engineering. The goal is to find the most economical and safe path.</p>
              <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 rounded">
                <p className="text-sm font-medium">Exam Tip: For 8 marks, also discuss Obligatory Points (Must Pass vs Must Avoid).</p>
              </div>
            </div>
          )
        },
        {
          id: 'types',
          title: 'Types of Alignment',
          titleNep: 'अलाइनमेन्टका प्रकारहरु',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h5 className="font-bold text-blue-700">1. River Route</h5>
                <p className="text-sm text-gray-600 mt-2">Follows river banks at valley bottom. Gentle gradient but high bridge cost.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h5 className="font-bold text-blue-700">2. Ridge Route</h5>
                <p className="text-sm text-gray-600 mt-2">Follows top of the mountain. Safe from water, zero cross drainage.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h5 className="font-bold text-blue-700">3. Cross Rib</h5>
                <p className="text-sm text-gray-600 mt-2">Goes from one valley to another through mountain passes (Saddles).</p>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'geometric',
      title: 'Geometric Design',
      icon: <Ruler className="w-5 h-5" />,
      topics: [
        {
          id: 'considerations',
          title: 'Special Considerations',
          titleNep: 'विशेष डिजाइन नियमहरु',
          mnemonic: {
            word: 'CHESS GP',
            description: 'Design elements to remember',
            items: [
              { char: 'C', term: 'Camber', desc: 'Cross slope for drainage (High rainfall).' },
              { char: 'H', term: 'Hairpin Bend', desc: '180 degree turning on steep slopes.' },
              { char: 'E', term: 'Extra Widening', desc: 'Required for inner wheel off-tracking.' },
              { char: 'S', term: 'Super-elevation', desc: 'Limit to 10% in hills (NRS).' },
              { char: 'S', term: 'Sight Distance', desc: 'Cutting inner hill for safe SSD.' },
              { char: 'G', term: 'Gradient', desc: 'Ruling, Limiting, and Exceptional.' },
              { char: 'P', term: 'Passing Places', desc: 'Widening for single lane crossing.' },
            ]
          },
          content: (
            <div className="space-y-4">
              <p className="text-gray-700">Hill road geometry is dictated by the steepness of the terrain. Standard values are different from plain roads.</p>
            </div>
          )
        }
      ]
    }
  ];

  const currentChapter = chapters.find(c => c.id === activeChapter);
  const currentTopic = currentChapter?.topics.find(t => t.id === activeTopic);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col h-[50vh] md:h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 bg-blue-900 text-white">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Mountain className="w-6 h-6" />
            HillRoads DCE
          </h1>
          <p className="text-xs text-blue-200 mt-1">6th Sem Civil Nepal Dashboard</p>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-6">
          {chapters.map(chapter => (
            <div key={chapter.id}>
              <div className="flex items-center gap-2 px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {chapter.icon}
                {chapter.title}
              </div>
              <div className="space-y-1">
                {chapter.topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveChapter(chapter.id);
                      setActiveTopic(topic.id);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                      activeTopic === topic.id 
                        ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{topic.title}</span>
                    {completedTopics.includes(topic.id) && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
           <p className="text-xs text-slate-500 italic">"Engineering is the art of organizing and directing men and controlling the forces and materials of nature."</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTopic}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <nav className="flex items-center text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
                  <span>Chapter {chapters.findIndex(c => c.id === activeChapter) + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-blue-600">{currentChapter?.title}</span>
                </nav>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
                  {currentTopic?.title}
                </h2>
                <h3 className="text-xl font-medium text-slate-500">
                  {currentTopic?.titleNep}
                </h3>
              </div>
              
              <button
                onClick={() => toggleComplete(activeTopic)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  completedTopics.includes(activeTopic)
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                {completedTopics.includes(activeTopic) ? (
                  <><CheckCircle2 className="w-4 h-4" /> Finished Revision</>
                ) : (
                  'Mark as Done'
                )}
              </button>
            </header>

            {/* Mnemonic Section */}
            {currentTopic?.mnemonic && (
              <section className="mb-10 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-[-20px] top-[-20px] opacity-10">
                  <BrainCircuit className="w-40 h-40" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <BrainCircuit className="w-4 h-4" />
                    Memory Mnemonic
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                    {currentTopic.mnemonic.word}
                  </h4>
                  <p className="text-blue-100 text-lg mb-8 font-medium">
                    {currentTopic.mnemonic.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentTopic.mnemonic.items.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl font-black text-yellow-400">{item.char}</span>
                          <div>
                            <p className="font-bold text-white text-sm">{item.term}</p>
                            <p className="text-xs text-blue-100/80 leading-relaxed mt-1">{item.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Detailed Content */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
              <div className="prose prose-slate max-w-none prose-h4:text-blue-800 prose-strong:text-slate-900 prose-li:text-slate-600">
                <div className="flex items-center gap-2 mb-6 text-slate-800">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-lg">Detailed Study Notes</span>
                </div>
                {currentTopic?.content}
                
                {/* Next Steps Placeholder */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    Key Concepts to Verify:
                  </h5>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-white transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                      <span className="text-sm text-slate-600">I can explain {currentTopic?.title} in simple English.</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-white transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                      <span className="text-sm text-slate-600">I have memorized the "{currentTopic?.mnemonic?.word || currentTopic?.title}" points.</span>
                    </label>
                    {activeTopic === 'factors' && (
                       <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-white transition-colors">
                       <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                       <span className="text-sm text-slate-600">I know the difference between MUST PASS and MUST AVOID points.</span>
                     </label>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quick Navigation Mini-FAB for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-blue-600 rounded-full text-white shadow-lg flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
