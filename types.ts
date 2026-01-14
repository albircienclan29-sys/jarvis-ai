
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  VISION = 'VISION',
  MAP = 'MAP',
  TACTICAL = 'TACTICAL',
  SETTINGS = 'SETTINGS'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SystemStats {
  cpu: number;
  memory: number;
  network: number;
  threatLevel: 'MINIMAL' | 'CAUTION' | 'CRITICAL';
  anomalyActive: boolean;
  anomalyLocation: string;
  anomalyProgress: number;
}
