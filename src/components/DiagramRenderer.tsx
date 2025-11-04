// components/DiagramRenderer.tsx
import React, { Suspense, lazy } from 'react';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

// Lazy load Excalidraw to reduce initial bundle size
const Excalidraw = lazy(() => import('@excalidraw/excalidraw').then(mod => ({ default: mod.Excalidraw })));

interface DiagramRendererProps {
  elements: readonly ExcalidrawElement[]; // Use readonly for compatibility
  height?: string | number;
  width?: string | number;
  appState?: Partial<AppState>;
}

const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  elements,
  height = '400px',
  width = '100%',
  appState,
}) => {
  const initialState: Partial<AppState> = {
    viewBackgroundColor: '#FFFFFF', // Set your desired background
    zenModeEnabled: true,          // Hides most of the UI
    gridSize: null,                // No grid
    ...appState,                   // Allow overriding
  };

  return (
    <div style={{ height, width, border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
      <Suspense fallback={<div>Loading Diagram...</div>}>
        <Excalidraw
          initialData={{
            elements: elements,
            appState: initialState,
          }}
          viewModeEnabled={true} // IMPORTANT: This makes it non-editable
          zenModeEnabled={true}  // Hides UI chrome
          UIOptions={{
            // Explicitly hide all UI elements for a clean view
            canvasActions: {
              changeViewBackgroundColor: false,
              clearCanvas: false,
              export: false,
              loadScene: false,
              saveToActiveFile: false,
              theme: false,
              saveAsImage: false,
            },
            tools: {
              image: false,
              text: false,
            },
          }}
        />
      </Suspense>
    </div>
  );
};

export default DiagramRenderer;