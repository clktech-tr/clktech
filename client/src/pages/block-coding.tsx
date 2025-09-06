import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BlockCodingPage = () => {
  const navigate = useNavigate();

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
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
      });
    };

    loadBlocklyScripts();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blok Kodlama</h1>
        <Button onClick={() => navigate('/')}>
          Ana Sayfaya Dön
        </Button>
      </div>
      
      <div id="blocklyDiv" style={{ height: '80vh', width: '100%' }}></div>
      
      <div id="codeOutput" className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Kod Çıktısı:</h3>
        <pre id="generatedCode" className="bg-white p-2 rounded"></pre>
      </div>
    </div>
  );
};

export default BlockCodingPage;
