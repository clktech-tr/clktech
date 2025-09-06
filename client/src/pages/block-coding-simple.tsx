import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    Blockly: any;
  }
}

const BlockCodingPage = () => {
  const navigate = useNavigate();
  const blocklyDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Blockly scripts
    const loadBlocklyScripts = () => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/blockly@10.2.2/blockly_compressed.js',
        'https://cdn.jsdelivr.net/npm/blockly@10.2.2/blocks_compressed.js',
        'https://cdn.jsdelivr.net/npm/blockly@10.2.2/javascript_compressed.js',
        'https://cdn.jsdelivr.net/npm/blockly@10.2.2/msg/tr.js'
      ];

      scripts.forEach(src => {
        if (document.querySelector(`script[src="${src}"]`)) return;
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
      });
    };

    loadBlocklyScripts();

    // Initialize Blockly after scripts are loaded
    const initBlockly = () => {
      if (!window.Blockly || !blocklyDiv.current) return;
      
      const workspace = window.Blockly.inject(blocklyDiv.current, {
        toolbox: {
          kind: 'flyoutToolbox',
          contents: [
            { kind: 'block', type: 'controls_if' },
            { kind: 'block', type: 'controls_repeat_ext' },
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
            { kind: 'block', type: 'text' },
            { kind: 'block', type: 'text_print' },
          ]
        }
      });

      window.Blockly.setLocale('tr');
      
      const onResize = () => {
        window.Blockly.svgResize(workspace);
      };
      
      window.addEventListener('resize', onResize);
      
      // Initial resize
      setTimeout(() => {
        window.Blockly.svgResize(workspace);
      }, 100);

      return () => {
        window.removeEventListener('resize', onResize);
        if (workspace) {
          workspace.dispose();
        }
      };
    };

    // Check if Blockly is loaded every 100ms
    const interval = setInterval(() => {
      if (window.Blockly) {
        clearInterval(interval);
        initBlockly();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">CLK Tech Blok Kodlama</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: 'Bilgi',
                  description: 'Blok kodlama uygulaması yakında eklenecek!',
                });
              }}
            >
              Uygulamayı Aç
            </Button>
            <Button onClick={() => navigate('/')}>Ana Sayfaya Dön</Button>
          </div>
        </div>
        
        <div 
          ref={blocklyDiv} 
          className="w-full h-[calc(100vh-150px)] bg-white rounded-lg shadow"
        ></div>
      </div>
    </div>
  );
};

export default BlockCodingPage;
