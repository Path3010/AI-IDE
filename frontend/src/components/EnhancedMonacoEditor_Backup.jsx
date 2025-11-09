import { useEffect, useRef, useState, useCallback } from 'react';
import monaco from '../monaco-config';
import { useProject } from '../context/ProjectContext';

// Language detection from file extensions
const getLanguageFromExtension = (filename) => {
  const extension = filename?.split('.').pop()?.toLowerCase();
  const languageMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'json': 'json',
    'md': 'markdown',
    'txt': 'plaintext',
    'xml': 'xml',
    'yml': 'yaml',
    'yaml': 'yaml',
    'sh': 'shell',
    'bash': 'shell',
    'sql': 'sql',
    'php': 'php',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'go': 'go',
    'rs': 'rust',
    'rb': 'ruby'
  };
  return languageMap[extension] || 'plaintext';
};

export default function EnhancedMonacoEditor({ 
  height = '100%',
  theme = 'vs-dark',
  fontSize = 14,
  autoSave = true,
  autoSaveDelay = 2000
}) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const modelRef = useRef(null);
  const disposablesRef = useRef([]);
  const isDisposedRef = useRef(false);
  
  const { 
    currentFile, 
    saveFileContent, 
    syncStatus, 
    currentProject,
    setError 
  } = useProject();

  const [editorState, setEditorState] = useState({
    isLoading: false,
    hasUnsavedChanges: false,
    language: 'javascript'
  });

  // Safe disposal helper
  const safeDispose = useCallback((resource, name = 'unknown') => {
    if (!resource) return;
    
    try {
      if (typeof resource.dispose === 'function' && !resource.isDisposed) {
        resource.dispose();
      } else if (typeof resource.dispose === 'function') {
        // Try to dispose even if isDisposed is not available
        resource.dispose();
      }
    } catch (error) {
      // Silently handle disposal errors - these are common in React strict mode
      console.debug(`Safe disposal of ${name}:`, error.message);
    }
  }, []);

  // Clear all disposables
  const clearDisposables = useCallback(() => {
    if (isDisposedRef.current) return;
    
    disposablesRef.current.forEach((disposable, index) => {
      safeDispose(disposable, `disposable-${index}`);
    });
    disposablesRef.current = [];
  }, [safeDispose]);

  // Debounced save function
  const debouncedSave = useCallback((content) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(async () => {
      if (currentFile && autoSave) {
        try {
          await saveFileContent(currentFile.id, content);
          setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
        } catch (error) {
          console.error('Auto-save failed:', error);
          setError('Auto-save failed: ' + error.message);
        }
      }
    }, autoSaveDelay);
  }, [currentFile, autoSave, autoSaveDelay, saveFileContent, setError]);

  // Manual save function
  const handleSave = useCallback(async () => {
    if (!currentFile || !editorRef.current) return;
    
    try {
      const content = editorRef.current.getValue();
      await saveFileContent(currentFile.id, content);
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: false }));
    } catch (error) {
      setError('Save failed: ' + error.message);
    }
  }, [currentFile, saveFileContent, setError]);

  // Initialize Monaco Editor
  useEffect(() => {
    if (!containerRef.current || isDisposedRef.current) return;
    
    // Reset disposal flag when creating new editor
    isDisposedRef.current = false;

    // Configure Monaco environment
    monaco.editor.defineTheme('ai-ide-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#f0f6fc',
        'editorCursor.foreground': '#f0f6fc',
        'editor.lineHighlightBackground': '#161b22',
        'editorLineNumber.foreground': '#7d8590',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41'
      }
    });

    monaco.editor.defineTheme('ai-ide-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'type', foreground: '267F99' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#24292f',
      }
    });

    // Create the editor
    const editor = monaco.editor.create(containerRef.current, {
      value: '',
      language: 'javascript',
      theme: theme === 'light' ? 'ai-ide-light' : 'ai-ide-dark',
      fontSize: fontSize,
      fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, 'Courier New', monospace",
      fontLigatures: true,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      minimap: { enabled: true },
      wordWrap: 'on',
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      glyphMargin: false,
      contextmenu: true,
      mouseWheelZoom: true,
      multiCursorModifier: 'ctrlCmd',
      formatOnPaste: true,
      formatOnType: true,
      autoIndent: 'full',
      codeLens: true,
      colorDecorators: true,
      links: true,
      find: {
        addExtraSpaceOnTop: false,
        autoFindInSelection: 'never',
        seedSearchStringFromSelection: 'always'
      },
      suggest: {
        showIcons: true,
        showSnippets: true,
        showWords: true,
        showColors: true,
        showFiles: true,
        showReferences: true,
        showFolders: true,
        showTypeParameters: true,
        showModules: true,
        showProperties: true,
        showEvents: true,
        showOperators: true,
        showUnits: true,
        showValues: true,
        showConstants: true,
        showEnums: true,
        showEnumMembers: true,
        showKeywords: true,
        showText: true,
        showClasses: true,
        showFunctions: true,
        showConstructors: true,
        showFields: true,
        showVariables: true,
        showInterfaces: true,
        showStructs: true,
        showMethods: true
      }
    });

    // Add content change listener for auto-save
    const disposable = editor.onDidChangeModelContent(() => {
      setEditorState(prev => ({ ...prev, hasUnsavedChanges: true }));
      
      if (autoSave) {
        const content = editor.getValue();
        debouncedSave(content);
      }
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, handleSave);
    
    // Store references
    editorRef.current = editor;
    disposablesRef.current.push(disposable);

    // Cleanup function with strict mode protection
    return () => {
      isDisposedRef.current = true;
      
      // Clear disposables
      clearDisposables();
      
      // Dispose editor safely
      safeDispose(editor, 'monaco-editor');
      
      // Clear timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      
      editorRef.current = null;
    };
  }, [theme, fontSize, handleSave, autoSave, debouncedSave, clearDisposables, safeDispose]);

  // Load file content when currentFile changes
  useEffect(() => {
    if (!editorRef.current || !currentFile || isDisposedRef.current) {
      // Clear editor if no file is selected
      if (editorRef.current && !currentFile) {
        editorRef.current.setValue('');
        setEditorState(prev => ({ ...prev, language: 'javascript' }));
      }
      return;
    }

    setEditorState(prev => ({ ...prev, isLoading: true }));

    try {
      const language = getLanguageFromExtension(currentFile.metadata?.name);
      
      // Dispose previous model if exists
      if (modelRef.current) {
        safeDispose(modelRef.current, 'previous-model');
        modelRef.current = null;
      }

      // Create new model with proper language
      const model = monaco.editor.createModel(
        currentFile.content || '',
        language
      );
      
      modelRef.current = model;
      
      if (editorRef.current && typeof editorRef.current.setModel === 'function' && !isDisposedRef.current) {
        try {
          editorRef.current.setModel(model);
        } catch (error) {
          console.warn('Error setting model:', error);
          return;
        }
      }
      
      setEditorState(prev => ({ 
        ...prev, 
        isLoading: false, 
        language,
        hasUnsavedChanges: false 
      }));

      // Focus the editor
      editorRef.current.focus();
      
    } catch (error) {
      console.error('Failed to load file content:', error);
      setError('Failed to load file: ' + error.message);
      setEditorState(prev => ({ ...prev, isLoading: false }));
    }
  }, [currentFile, setError]);

  // Update theme when it changes
  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setTheme(theme === 'light' ? 'ai-ide-light' : 'ai-ide-dark');
    }
  }, [theme]);

  // Update font size when it changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize });
    }
  }, [fontSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isDisposedRef.current = true;
      clearDisposables();
      safeDispose(modelRef.current, 'final-model');
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      
      modelRef.current = null;
      editorRef.current = null;
    };
  }, [clearDisposables, safeDispose]);

  return (
    <div className="monaco-editor-container" style={{ height }}>
      {/* Loading overlay */}
      {editorState.isLoading && (
        <div className="monaco-loading-overlay">
          Loading file...
        </div>
      )}
      
      {/* Status bar */}
      <div className={`monaco-status-bar ${theme === 'light' ? 'theme-light' : ''}`}>
        <div className="monaco-status-bar-left">
          <span>{editorState.language}</span>
          {currentFile && (
            <span>{currentFile.metadata?.name || 'Untitled'}</span>
          )}
        </div>
        
        <div className="monaco-status-bar-right">
          {editorState.hasUnsavedChanges && (
            <span className="monaco-status-indicator unsaved">●</span>
          )}
          
          {syncStatus === 'syncing' && (
            <span className="monaco-status-indicator syncing">Syncing...</span>
          )}
          
          {syncStatus === 'synced' && (
            <span className="monaco-status-indicator synced">✓ Synced</span>
          )}
          
          {syncStatus === 'error' && (
            <span className="monaco-status-indicator error">✗ Sync Error</span>
          )}
          
          <span>Project: {currentProject?.name || 'No Project'}</span>
        </div>
      </div>
      
      {/* Monaco Editor Container */}
      <div 
        ref={containerRef} 
        style={{ 
          height: 'calc(100% - 22px)', 
          width: '100%' 
        }} 
      />
    </div>
  );
}