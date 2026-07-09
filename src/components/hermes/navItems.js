import {
  LayoutDashboard,
  FolderKanban,
  Search,
  Workflow,
  Share2,
  Award,
  Bot,
  UploadCloud,
  Settings,
} from 'lucide-react';

export const navItems = [
  { label: 'Dashboard', path: '/hermes', icon: LayoutDashboard },
  { label: 'Projects', path: '/hermes/projects', icon: FolderKanban },
  { label: 'Research', path: '/hermes/research', icon: Search },
  { label: 'Content Pipeline', path: '/hermes/content-pipeline', icon: Workflow },
  { label: 'Knowledge Graph', path: '/hermes/knowledge-graph', icon: Share2 },
  { label: 'Authority Centre', path: '/hermes/authority', icon: Award },
  { label: 'AI Visibility', path: '/hermes/ai-visibility', icon: Bot },
  { label: 'CMS Export', path: '/hermes/cms-export', icon: UploadCloud },
  { label: 'Settings', path: '/hermes/settings', icon: Settings },
];