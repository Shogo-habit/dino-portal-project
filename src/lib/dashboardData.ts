import fs from 'node:fs';
import path from 'node:path';

export interface TaskItem {
  text: string;
  done: boolean;
  category: string;
  sourceFile: string;
}

export interface TaskSection {
  title: string;
  tasks: TaskItem[];
}

export interface TaskFileSummary {
  fileName: string;
  title: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  sections: TaskSection[];
}

export interface ProjectStats {
  speciesCount: number;
  speciesTarget: number;
  speciesCompletionRate: number;
  topicsCount: number;
  lastUpdated: string;
  recentCommits: Array<{ hash: string; message: string }>;
  tasksSummary: {
    total: number;
    completed: number;
    pending: number;
    rate: number;
  };
  fileSummaries: TaskFileSummary[];
}

export function parseMarkdownTasks(filePath: string, defaultCategory: string): TaskFileSummary {
  if (!fs.existsSync(filePath)) {
    return {
      fileName: path.basename(filePath),
      title: defaultCategory,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      completionRate: 0,
      sections: []
    };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let fileTitle = defaultCategory;
  const sections: TaskSection[] = [];
  let currentSection: TaskSection = {
    title: '全般',
    tasks: []
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ') && fileTitle === defaultCategory) {
      fileTitle = trimmed.replace(/^#\s+/, '').replace(/\([^)]*\)/, '').trim();
    } else if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      if (currentSection.tasks.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        title: trimmed.replace(/^#+\s+/, '').trim(),
        tasks: []
      };
    } else if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]')) {
      const isDone = trimmed.startsWith('- [x]');
      const taskText = trimmed.replace(/^- \[[ x]\]\s+/, '').trim();
      currentSection.tasks.push({
        text: taskText,
        done: isDone,
        category: defaultCategory,
        sourceFile: path.basename(filePath)
      });
    }
  }

  if (currentSection.tasks.length > 0) {
    sections.push(currentSection);
  }

  const allTasks = sections.flatMap(s => s.tasks);
  const total = allTasks.length;
  const completed = allTasks.filter(t => t.done).length;
  const pending = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    fileName: path.basename(filePath),
    title: fileTitle,
    totalTasks: total,
    completedTasks: completed,
    pendingTasks: pending,
    completionRate: rate,
    sections
  };
}

export function getProjectDashboardData(): ProjectStats {
  const rootDir = process.cwd();
  
  // 恐竜標本数
  const dinoDir = path.join(rootDir, 'src/content/dinosaurs');
  let speciesCount = 370;
  if (fs.existsSync(dinoDir)) {
    speciesCount = fs.readdirSync(dinoDir).filter(f => f.endsWith('.md')).length;
  }

  // トピック記事数
  const topicsDir = path.join(rootDir, 'src/content/topics');
  let topicsCount = 0;
  if (fs.existsSync(topicsDir)) {
    topicsCount = fs.readdirSync(topicsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx')).length;
  }

  // 各種タスクファイルの解析
  const taskFiles = [
    { path: path.join(rootDir, 'docs/tasks/schedule.md'), title: 'スケジュール・月間目標' },
    { path: path.join(rootDir, 'docs/tasks/articles.md'), title: '恐竜・特集記事タスク' },
    { path: path.join(rootDir, 'docs/tasks/seo.md'), title: 'SEO・パフォーマンス' },
    { path: path.join(rootDir, 'docs/tasks/archive.md'), title: '図鑑・UI・骨格アセット' },
  ];

  const fileSummaries = taskFiles.map(tf => parseMarkdownTasks(tf.path, tf.title));

  const totalTasks = fileSummaries.reduce((acc, curr) => acc + curr.totalTasks, 0);
  const completedTasks = fileSummaries.reduce((acc, curr) => acc + curr.completedTasks, 0);
  const pendingTasks = totalTasks - completedTasks;
  const rate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 最近のコミット（直近5件）
  let recentCommits: Array<{ hash: string; message: string }> = [];
  try {
    const gitHeadPath = path.join(rootDir, '.git/logs/HEAD');
    if (fs.existsSync(gitHeadPath)) {
      const logs = fs.readFileSync(gitHeadPath, 'utf8').trim().split('\n');
      recentCommits = logs.slice(-5).reverse().map(line => {
        const parts = line.split('\t');
        const meta = parts[0]?.split(' ') || [];
        const toHash = (meta[1] || '').substring(0, 7);
        const rawMsg = parts[1] || '';
        const msg = rawMsg.replace(/^commit:\s*/, '').replace(/^commit \(amend\):\s*/, '').trim();
        return { hash: toHash, message: msg || 'commit' };
      });
    }
  } catch {
    recentCommits = [];
  }

  const speciesTarget = 375;
  const speciesCompletionRate = Math.min(100, Math.round((speciesCount / speciesTarget) * 1000) / 10);

  return {
    speciesCount,
    speciesTarget,
    speciesCompletionRate,
    topicsCount,
    lastUpdated: new Date().toISOString(),
    recentCommits,
    tasksSummary: {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      rate
    },
    fileSummaries
  };
}
