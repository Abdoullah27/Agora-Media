import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CMSItem, ContentType } from '../types/cms';
import { config } from '../lib/config';

interface CMSContextType {
  items: CMSItem[];
  addItem: (item: Omit<CMSItem, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, updatedItem: Partial<CMSItem>) => void;
  deleteItem: (id: string) => void;
  getItemsByType: (type: ContentType) => CMSItem[];
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CMSItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    try {
      const stored = localStorage.getItem('agora_cms_items');
      if (stored) {
        setItems(JSON.parse(stored) as CMSItem[]);
      }
    } catch (error) {
      console.error("Local storage corrupted or quota exceeded. Resetting.", error);
      localStorage.removeItem('agora_cms_items');
      setItems([]);
    }

    // Check auth status with session timeout (24 hours)
    const authStatus = localStorage.getItem('agora_cms_auth');
    const authTime = localStorage.getItem('agora_cms_auth_time');

    if (authStatus === 'true' && authTime) {
      const timeElapsed = Date.now() - parseInt(authTime);
      const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours

      if (timeElapsed < sessionTimeout) {
        setIsAuthenticated(true);
      } else {
        // Session expired, clear auth
        localStorage.removeItem('agora_cms_auth');
        localStorage.removeItem('agora_cms_auth_time');
      }
    }
  }, []);

  // Save to local storage whenever items change
  const saveItems = (newItems: CMSItem[]) => {
    setItems(newItems);
    localStorage.setItem('agora_cms_items', JSON.stringify(newItems));
  };

  const addItem = (item: Omit<CMSItem, 'id' | 'createdAt'>) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    } as CMSItem;
    saveItems([newItem, ...items]);
  };

  const updateItem = (id: string, updatedFields: Partial<CMSItem>) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...updatedFields } as CMSItem : item
    );
    saveItems(newItems);
  };

  const deleteItem = (id: string) => {
    saveItems(items.filter(item => item.id !== id));
  };

  const getItemsByType = (type: ContentType) => {
    return items.filter(item => item.type === type);
  };

  const login = (password: string) => {
    if (password === config.adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('agora_cms_auth', 'true');
      localStorage.setItem('agora_cms_auth_time', Date.now().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('agora_cms_auth');
  };

  return (
    <CMSContext.Provider value={{
      items, 
      addItem, 
      updateItem, 
      deleteItem, 
      getItemsByType,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
