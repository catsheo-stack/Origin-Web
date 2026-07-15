import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getKnowledgeItemBySlug } from '@/data/knowledgeCentre';
import { getKnowledgeItemZhBySlug } from '@/data/knowledgeCentreZh';

const SITE_URL = 'https://originpropertyconcierge.com.au';
const SITE_NAME = 'Origin Property Concierge';
const LOGO_URL = `${SITE_URL}/origin-logo.png`;

const PRIVATE_PREFIXES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/admin',
  '/hermes',
  '/thank-you',
  '/zh/thank-you',
];

const PAGE_LABELS = {
  '/': 'Home',
  '/buyer-advisory': 'Buyer Advisory',
  '/property-management': 'Property Management',
  '/mortgage-finance': 'Mortgage Finance',
  '/finance-referral': 'Mortgage Finance',
  '/conveyancing': 'Conveyancing',
  '/contact': 'Contact',
  '/book-consultation': 'Book a Consultation',
  '/about': 'About',
  '/faq': 'Frequently Asked Questions',
  '/articles': 'Property Articles',
  '/guides': 'Property Guides',
  '/knowledge-centre': 'Knowledge Centre',
  '/property-guides': 'Property Guides',
  '/buyer-advisory/resources': 'Buyer Resources',
  '/property-management/resources': 'Property Management Resources',
  '/conveyancing/resources': 'Conveyancing Resources',
  '/mortgage-finance/resources': 'Mortgage Finance Resources',
  '/tools': 'Property Tools',
  '/tools/property-management-readiness-checklist': 'Property Management Readiness Checklist',
  '/tools/investment-yield-calculator': 'Investment Yield Calculator',
  '/tools/buyer-agent-checklist': 'Buyer Agent Checklist',
  '/tools/origin-home-buying-planner': 'Home Buying Planner',
  '/tools/buyer-settlement-tracker': 'Buyer Settlement Tracker',
  '/tools/seller-settlement-tracker': 'Seller Settlement Tracker',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-use': 'Terms of Use',
  '/professional-disclaimer': 'Professional Disclaimer',
  '/zh': '首頁',
  '/zh/buyer-advisory': '買方顧問',
  '/zh/property-management': '物業管理',
  '/zh/mortgage-finance': '房屋貸款',
  '/zh/conveyancing': '房產過戶',
  '/zh/contact': '聯絡我們',
  '/zh/book-consultation': '預約諮詢',
  '/zh/about': '關於我們',
  '/zh/faq': '常見問題',
  '/zh/knowledge-centre': '房產知識中心',
  '/zh/guides': '房產指南',
  '/zh/property-guides': '物業管理指南',
  '/zh/buyer-advisory/resources': '買家資源',
  '/zh/property-management/resources': '物業管理資源',
  '/zh/conveyancing/resources': '房產過戶資源',
  '/zh/mortgage-finance/resources': '房屋貸款資源',
  '/zh/tools': '免費房產工具',
  '/zh/tools/property-management-readiness-checklist': '物業管理準備度檢查清單',
  '/zh/tools/investment-yield-calculator': '投資物業租金回報計算器',
  '/zh/tools/buyer-agent-checklist': '買方顧問置業清單',
  '/zh/tools/origin-home-buying-planner': '買房規劃工具',
  '/zh/tools/buyer-settlement-tracker': '買方交割進度追蹤器',
  '/zh/tools/seller-settlement-tracker': '賣方交割進度追蹤器',
  '/zh/privacy-policy': '隱私政策',
  '/zh/terms-of-use': '使用條款',
  '/zh/professional-disclaimer': '專業服務免責聲明',
};

const SERVICE_DATA = {
  '/buyer-advisory': {
    name: 'Buyer Advisory',
    description: 'Buyer advisory support including buyer brief preparation, property research, due diligence coordination and negotiation guidance.',
    serviceType: 'Buyer advisory',
  },
  '/property-management': {
    name: 'Property Management Guidance',
    description: 'Property management guidance for landlords covering leasing preparation, compliance, tenant selection and ongoing coordination.',
    serviceType: 'Property management guidance',
  },
  '/mortgage-finance': {
    name: 'Mortgage Finance Guidance',
    description: 'Coordinated mortgage finance guidance for property buyers, refinancers and investors.',
    serviceType: 'Mortgage finance guidance',
  },
  '/finance-referral': {
    name: 'Mortgage Finance Guidance',
    description: 'Coordinated mortgage finance guidance for property buyers, refinancers and investors.',
    serviceType: 'Mortgage finance guidance',
  },
  '/conveyancing': {
    name: 'Conveyancing Process Guidance',
    description: 'General conveyancing process guidance and coordinated access to appropriately qualified professionals for Victorian property transactions.',
    serviceType: 'Conveyancing process guidance',
  },
  '/zh/buyer-advisory': {
    name: '買方顧問服務',
    description: '提供置業需求整理、物業研究、盡職調查協調及議價流程指引。',
    serviceType: '買方顧問',
  },
  '/zh/property-management': {
    name: '物業管理服務指引',
    description: '協助業主了解出租準備、合規、租客篩選及持續物業管理流程。',
    serviceType: '物業管理指引',
  },
  '/zh/mortgage-finance': {
    name: '房屋貸款與融資指引',
    description: '協助買家、轉貸客戶及投資者了解貸款能力、融資選項及下一步。',
    serviceType: '房屋貸款指引',
  },
  '/zh/conveyancing': {
    name: '房產過戶流程指引',
    description: '說明維州房產過戶流程，並在需要時協調具備適當資格的專業人士。',
    serviceType: '房產過戶流程指引',
  },
};

const TOOL_DATA = {
  'property-management-readiness-checklist': ['Property Management Readiness Checklist', 'Interactive checklist to assess whether an investment property is prepared for leasing and property management.'],
  'investment-yield-calculator': ['Investment Yield Calculator', 'Interactive calculator for estimating gross and net rental yield, property expenses and investment cash flow.'],
  'buyer-agent-checklist': ['Buyer Agent Checklist', 'Interactive checklist for planning and tracking a property buying journey from search to settlement.'],
  'origin-home-buying-planner': ['Origin Home Buying Planner', 'Interactive planning tool for organising a property budget, purchase costs and finance position.'],
  'buyer-settlement-tracker': ['Buyer Settlement Tracker', 'Interactive tracker for key stages, tasks and deadlines in a property purchase settlement.'],
  'seller-settlement-tracker': ['Seller Settlement Tracker', 'Interactive tracker for key stages, documents and deadlines in a property sale settlement.'],
};

const TOOL_DATA_ZH = {
  'property-management-readiness-checklist': ['物業管理準備度檢查清單', '協助業主檢視投資物業是否已準備好出租及交由專業物業管理。'],
  'investment-yield-calculator': ['投資物業租金回報計算器', '估算物業的毛租金回報、淨租金回報、持有成本及現金流。'],
  'buyer-agent-checklist': ['買方顧問置業清單', '由物業搜尋至交割，逐步規劃並追蹤置業流程。'],
  'origin-home-buying-planner': ['Origin 買房規劃工具', '協助置業人士整理購買預算、相關成本、貸款情況及準備程度。'],
  'buyer-settlement-tracker': ['買方交割進度追蹤器', '追蹤物業購買交割過程中的重要階段、工作及期限。'],
  'seller-settlement-tracker': ['賣方交割進度追蹤器', '追蹤物業出售交割過程中的重要階段、文件及期限。'],
};

function cleanPathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

function absoluteUrl(pathname) {
  return `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
}

function isPrivatePath(pathname) {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function getDescription() {
  return document.head.querySelector('meta[name="description"]')?.getAttribute('content') || '';
}

function getTitle(pathname) {
  return PAGE_LABELS[pathname] || document.title.replace(/\s*[|｜].*$/, '') || SITE_NAME;
}

function createOrganizationNode() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Melbourne, Victoria, Australia',
    },
    knowsLanguage: ['en-AU', 'zh-Hant-AU'],
  };
}

function createWebsiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['en-AU', 'zh-Hant-AU'],
  };
}

function getBreadcrumbs(pathname, pageName, isZh) {
  const homePath = isZh ? '/zh' : '/';
  const items = [{ name: isZh ? '首頁' : 'Home', path: homePath }];

  if (pathname === homePath) return null;

  if (/^\/(zh\/)?(article|property-guides)\//.test(pathname)) {
    items.push({
      name: isZh ? '房產知識中心' : 'Knowledge Centre',
      path: isZh ? '/zh/knowledge-centre' : '/knowledge-centre',
    });
  } else if (pathname.includes('/tools/')) {
    items.push({ name: isZh ? '免費房產工具' : 'Property Tools', path: isZh ? '/zh/tools' : '/tools' });
  } else if (pathname.endsWith('/resources')) {
    const servicePath = pathname.replace(/\/resources$/, '');
    items.push({ name: PAGE_LABELS[servicePath] || (isZh ? '服務' : 'Services'), path: servicePath });
  }

  items.push({ name: pageName, path: pathname });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(pathname)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function createArticleNode(pathname, isZh) {
  const match = pathname.match(/^\/(?:zh\/)?(?:article|property-guides)\/([^/]+)$/);
  if (!match) return null;

  const item = isZh ? getKnowledgeItemZhBySlug(match[1]) : getKnowledgeItemBySlug(match[1]);
  if (!item) return null;

  const url = absoluteUrl(pathname);
  const node = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: item.title,
    description: item.meta_description || item.summary || item.excerpt,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: isZh ? 'zh-Hant-AU' : 'en-AU',
    datePublished: item.publish_date,
    image: item.hero_image_url ? [item.hero_image_url] : [LOGO_URL],
    articleSection: item.category || item.service,
  };

  if (item.updated_at || item.modified_date) {
    node.dateModified = item.updated_at || item.modified_date;
  }

  return node;
}

function createFaqNode(pathname, isZh) {
  const match = pathname.match(/^\/(?:zh\/)?(?:article|property-guides)\/([^/]+)$/);
  if (!match) return null;
  const item = isZh ? getKnowledgeItemZhBySlug(match[1]) : getKnowledgeItemBySlug(match[1]);
  if (!item?.faq_items?.length) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(pathname)}#faq`,
    inLanguage: isZh ? 'zh-Hant-AU' : 'en-AU',
    mainEntity: item.faq_items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function createToolNode(pathname, isZh) {
  const match = pathname.match(/^\/(?:zh\/)?tools\/([^/]+)$/);
  if (!match) return null;
  const data = (isZh ? TOOL_DATA_ZH : TOOL_DATA)[match[1]];
  if (!data) return null;

  return {
    '@type': 'WebApplication',
    '@id': `${absoluteUrl(pathname)}#application`,
    name: data[0],
    description: data[1],
    url: absoluteUrl(pathname),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web browser',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    inLanguage: isZh ? 'zh-Hant-AU' : 'en-AU',
    provider: { '@id': `${SITE_URL}/#organization` },
  };
}

function createServiceNode(pathname, isZh) {
  const data = SERVICE_DATA[pathname];
  if (!data) return null;

  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(pathname)}#service`,
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,
    url: absoluteUrl(pathname),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Melbourne, Victoria, Australia',
    },
    availableLanguage: isZh ? ['zh-Hant-AU', 'en-AU'] : ['en-AU', 'zh-Hant-AU'],
  };
}

function createWebPageNode(pathname, pageName, description, isZh, articleNode) {
  const url = absoluteUrl(pathname);
  const type = pathname.includes('/contact') || pathname.includes('/book-consultation')
    ? 'ContactPage'
    : 'WebPage';

  const node = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: pageName,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: articleNode ? { '@id': articleNode['@id'] } : { '@id': `${SITE_URL}/#organization` },
    inLanguage: isZh ? 'zh-Hant-AU' : 'en-AU',
  };

  if (pathname !== '/' && pathname !== '/zh') {
    node.breadcrumb = { '@id': `${url}#breadcrumb` };
  }

  if (articleNode) {
    node.mainEntity = { '@id': articleNode['@id'] };
  }

  return node;
}

export default function StructuredDataManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = cleanPathname(pathname);
    const existing = document.getElementById('origin-structured-data');

    if (isPrivatePath(cleanPath)) {
      existing?.remove();
      return undefined;
    }

    const isZh = cleanPath === '/zh' || cleanPath.startsWith('/zh/');
    const pageName = getTitle(cleanPath);
    const description = getDescription();
    const articleNode = createArticleNode(cleanPath, isZh);
    const breadcrumbNode = getBreadcrumbs(cleanPath, pageName, isZh);

    const graph = [
      createOrganizationNode(),
      createWebsiteNode(),
      createWebPageNode(cleanPath, pageName, description, isZh, articleNode),
      breadcrumbNode,
      createServiceNode(cleanPath, isZh),
      createToolNode(cleanPath, isZh),
      articleNode,
      createFaqNode(cleanPath, isZh),
    ].filter(Boolean);

    let script = existing;
    if (!script) {
      script = document.createElement('script');
      script.id = 'origin-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });

    return () => {
      document.getElementById('origin-structured-data')?.remove();
    };
  }, [pathname]);

  return null;
}
