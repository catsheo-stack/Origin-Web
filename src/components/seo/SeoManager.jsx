import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Origin Property Concierge';
const SITE_URL = 'https://originpropertyconcierge.com.au';
const DEFAULT_IMAGE = `${SITE_URL}/origin-logo.png`;

const EN = {
  '/': ['Origin Property Concierge | Melbourne Property Guidance', 'Independent property concierge guidance for Melbourne buyers, owners and investors, with coordinated access to buyer advisory, mortgage, conveyancing and property management services.'],
  '/buyer-advisory': ['Buyer Advisory Melbourne | Origin Property Concierge', 'Practical buyer advisory support for Melbourne property buyers, including brief preparation, property research, due diligence coordination and negotiation guidance.'],
  '/property-management': ['Property Management Melbourne | Origin Property Concierge', 'Property management guidance for Melbourne landlords, from readiness and leasing preparation to compliance, tenant selection and ongoing coordination.'],
  '/mortgage-finance': ['Mortgage Finance Guidance Melbourne | Origin Property Concierge', 'Understand your home loan position and next steps with coordinated mortgage finance support for Melbourne buyers, refinancers and investors.'],
  '/finance-referral': ['Mortgage Finance Guidance Melbourne | Origin Property Concierge', 'Understand your home loan position and next steps with coordinated mortgage finance support for Melbourne buyers, refinancers and investors.'],
  '/conveyancing': ['Conveyancing Guidance Melbourne | Origin Property Concierge', 'Clear conveyancing process guidance and coordinated access to appropriately qualified professionals for Victorian property transactions.'],
  '/contact': ['Contact Origin Property Concierge', 'Contact Origin Property Concierge for guidance across buyer advisory, mortgage finance, conveyancing and property management.'],
  '/book-consultation': ['Book a Property Consultation | Origin Property Concierge', 'Book a consultation to discuss your property goals and identify the most suitable next step.'],
  '/about': ['About Origin Property Concierge', 'Learn about Origin Property Concierge and its integrated approach across property sales, finance, conveyancing and property coordination.'],
  '/faq': ['Property FAQs | Origin Property Concierge', 'Answers to common questions about buyer advisory, mortgage finance, conveyancing, property management and the Origin service model.'],
  '/articles': ['Property Articles | Origin Property Concierge', 'Explore practical Melbourne property articles covering buying, finance, conveyancing, investment and property management.'],
  '/guides': ['Property Guides | Origin Property Concierge', 'Browse practical property guides for Melbourne buyers, sellers, investors and landlords.'],
  '/knowledge-centre': ['Property Knowledge Centre | Origin Property Concierge', 'Access practical property information for Melbourne buyers, sellers, investors and landlords.'],
  '/property-guides': ['Property Guides | Origin Property Concierge', 'Browse practical property guides for Melbourne buyers, sellers, investors and landlords.'],
  '/buyer-advisory/resources': ['Buyer Resources | Origin Property Concierge', 'Buyer resources to help you prepare, compare properties, understand risks and make informed purchase decisions.'],
  '/property-management/resources': ['Property Management Resources | Origin Property Concierge', 'Resources for Melbourne landlords covering property readiness, leasing, compliance and ongoing management.'],
  '/conveyancing/resources': ['Conveyancing Resources | Origin Property Concierge', 'Resources explaining the Victorian conveyancing journey, contracts, settlement preparation and common transaction risks.'],
  '/mortgage-finance/resources': ['Mortgage Finance Resources | Origin Property Concierge', 'Home loan and borrowing resources for buyers, refinancers and property investors.'],
  '/tools': ['Free Property Tools | Origin Property Concierge', 'Use practical property calculators, planners, checklists and settlement trackers for Melbourne buyers, sellers and landlords.'],
  '/tools/property-management-readiness-checklist': ['Property Management Readiness Checklist | Origin Property Concierge', 'Assess whether your investment property is ready for leasing and professional property management.'],
  '/tools/investment-yield-calculator': ['Investment Yield Calculator | Origin Property Concierge', 'Estimate gross and net rental yield, property expenses and investment cash flow.'],
  '/tools/buyer-agent-checklist': ['Buyer Agent Checklist | Origin Property Concierge', 'Plan and track each stage of your property buying journey from search to settlement.'],
  '/tools/origin-home-buying-planner': ['Home Buying Planner | Origin Property Concierge', 'Plan your property budget, buying costs and finance position before purchasing a home.'],
  '/tools/buyer-settlement-tracker': ['Buyer Settlement Tracker | Origin Property Concierge', 'Track the key stages, tasks and deadlines in your property purchase settlement journey.'],
  '/tools/seller-settlement-tracker': ['Seller Settlement Tracker | Origin Property Concierge', 'Track the key stages, documents and deadlines in your property sale settlement journey.'],
  '/privacy-policy': ['Privacy Policy | Origin Property Concierge', 'Read how Origin Property Concierge collects, uses, stores and protects personal information.'],
  '/terms-of-use': ['Terms of Use | Origin Property Concierge', 'Read the terms governing use of the Origin Property Concierge website, tools and information.'],
  '/professional-disclaimer': ['Professional Disclaimer | Origin Property Concierge', 'Important information about the scope and limitations of Origin Property Concierge website content and coordinated services.'],
  '/thank-you': ['Thank You | Origin Property Concierge', 'Your enquiry has been received by Origin Property Concierge.'],
};

const ZH = {
  '/zh': ['墨爾本房產禮賓服務｜Origin Property Concierge', '為墨爾本買家、業主及投資者提供獨立房產流程指引，並協調買方顧問、貸款、房產過戶及物業管理服務。'],
  '/zh/buyer-advisory': ['墨爾本買方顧問服務｜Origin Property Concierge', '為墨爾本置業人士提供需求整理、物業研究、盡職調查協調及議價流程指引。'],
  '/zh/property-management': ['墨爾本物業管理服務｜Origin Property Concierge', '協助墨爾本業主了解出租準備、合規、租客篩選及持續物業管理流程。'],
  '/zh/mortgage-finance': ['墨爾本房屋貸款與融資指引｜Origin Property Concierge', '協助買家、轉貸客戶及投資者了解貸款能力、融資選項及下一步。'],
  '/zh/conveyancing': ['墨爾本房產過戶流程指引｜Origin Property Concierge', '以清晰方式說明維州房產過戶流程，並在需要時協調具備適當資格的專業人士。'],
  '/zh/contact': ['聯絡我們｜Origin Property Concierge', '就買方顧問、房屋貸款、房產過戶及物業管理服務聯絡 Origin Property Concierge。'],
  '/zh/book-consultation': ['預約房產諮詢｜Origin Property Concierge', '預約諮詢，讓我們先了解您的房產目標並協助安排合適的下一步。'],
  '/zh/about': ['關於 Catherine｜Origin Property Concierge', '認識 Origin Property Concierge 創辦人 Catherine，了解她在房屋貸款、房地產、買方顧問及房產過戶方面的經驗。'],
  '/zh/faq': ['墨爾本房產常見問題｜Origin Property Concierge', '查看有關買方顧問、貸款、房產過戶、物業管理及 Origin 服務模式的常見問題。'],
  '/zh/knowledge-centre': ['房產知識中心｜Origin Property Concierge', '瀏覽為墨爾本買家、賣家、投資者及業主整理的實用房產資訊。'],
  '/zh/guides': ['房產指南｜Origin Property Concierge', '瀏覽為墨爾本買家、賣家、投資者及業主整理的實用房產指南。'],
  '/zh/property-guides': ['物業管理指南｜Origin Property Concierge', '瀏覽出租準備、租賃、合規及物業管理相關實用指南。'],
  '/zh/buyer-advisory/resources': ['買家資源｜Origin Property Concierge', '協助買家準備預算、比較物業、了解風險並作出更有根據的置業決定。'],
  '/zh/property-management/resources': ['物業管理資源｜Origin Property Concierge', '為墨爾本業主提供出租準備、租賃、合規及持續管理資訊。'],
  '/zh/conveyancing/resources': ['房產過戶資源｜Origin Property Concierge', '了解維州房產過戶流程、合約、交割準備及常見交易風險。'],
  '/zh/mortgage-finance/resources': ['房屋貸款資源｜Origin Property Concierge', '為置業、轉貸及投資人士提供實用房屋貸款與融資資訊。'],
  '/zh/tools': ['免費房產工具｜Origin Property Concierge', '使用房產計算器、買房規劃、檢查清單及交割進度追蹤工具。'],
  '/zh/tools/property-management-readiness-checklist': ['物業管理準備度檢查清單｜Origin Property Concierge', '檢視您的投資物業是否已準備好出租及交由專業物業管理。'],
  '/zh/tools/investment-yield-calculator': ['投資物業租金回報計算器｜Origin Property Concierge', '估算物業的毛租金回報、淨租金回報、持有成本及現金流。'],
  '/zh/tools/buyer-agent-checklist': ['買方顧問置業清單｜Origin Property Concierge', '由物業搜尋、盡職調查及議價，到交割與鑰匙交收，逐步規劃並追蹤置業流程。'],
  '/zh/tools/origin-home-buying-planner': ['Origin 買房規劃工具｜預算、成本及貸款規劃', '在置業前整理購買預算、相關成本、貸款情況及準備程度。'],
  '/zh/tools/buyer-settlement-tracker': ['買方交割進度追蹤器｜Origin Property Concierge', '追蹤物業購買交割過程中的重要階段、工作及期限。'],
  '/zh/tools/seller-settlement-tracker': ['賣方交割進度追蹤器｜Origin Property Concierge', '追蹤物業出售交割過程中的重要階段、文件及期限。'],
  '/zh/privacy-policy': ['隱私政策｜Origin Property Concierge', '了解 Origin Property Concierge 如何收集、使用、儲存及保護個人資料。'],
  '/zh/terms-of-use': ['使用條款｜Origin Property Concierge', '查看使用 Origin Property Concierge 網站、工具及資訊時適用的條款。'],
  '/zh/professional-disclaimer': ['專業服務免責聲明｜Origin Property Concierge', '了解 Origin Property Concierge 網站內容及協調服務的範圍與限制。'],
  '/zh/thank-you': ['感謝您的查詢｜Origin Property Concierge', 'Origin Property Concierge 已收到您的查詢。'],
};

const PRIVATE_PREFIXES = ['/login', '/register', '/forgot-password', '/reset-password', '/admin', '/hermes'];

const LANGUAGE_PAIRS = {
  '/': '/zh',
  '/buyer-advisory': '/zh/buyer-advisory',
  '/property-management': '/zh/property-management',
  '/mortgage-finance': '/zh/mortgage-finance',
  '/finance-referral': '/zh/mortgage-finance',
  '/conveyancing': '/zh/conveyancing',
  '/contact': '/zh/contact',
  '/book-consultation': '/zh/book-consultation',
  '/about': '/zh/about',
  '/faq': '/zh/faq',
  '/articles': '/zh/knowledge-centre',
  '/guides': '/zh/guides',
  '/knowledge-centre': '/zh/knowledge-centre',
  '/property-guides': '/zh/property-guides',
  '/buyer-advisory/resources': '/zh/buyer-advisory/resources',
  '/property-management/resources': '/zh/property-management/resources',
  '/conveyancing/resources': '/zh/conveyancing/resources',
  '/mortgage-finance/resources': '/zh/mortgage-finance/resources',
  '/tools': '/zh/tools',
  '/tools/property-management-readiness-checklist': '/zh/tools/property-management-readiness-checklist',
  '/tools/investment-yield-calculator': '/zh/tools/investment-yield-calculator',
  '/tools/buyer-agent-checklist': '/zh/tools/buyer-agent-checklist',
  '/tools/origin-home-buying-planner': '/zh/tools/origin-home-buying-planner',
  '/tools/buyer-settlement-tracker': '/zh/tools/buyer-settlement-tracker',
  '/tools/seller-settlement-tracker': '/zh/tools/seller-settlement-tracker',
  '/privacy-policy': '/zh/privacy-policy',
  '/terms-of-use': '/zh/terms-of-use',
  '/professional-disclaimer': '/zh/professional-disclaimer',
  '/thank-you': '/zh/thank-you',
};

const REVERSE_LANGUAGE_PAIRS = Object.fromEntries(
  Object.entries(LANGUAGE_PAIRS).map(([enPath, zhPath]) => [zhPath, enPath])
);

function getLanguagePair(pathname) {
  if (LANGUAGE_PAIRS[pathname]) {
    return { enPath: pathname, zhPath: LANGUAGE_PAIRS[pathname] };
  }

  if (REVERSE_LANGUAGE_PAIRS[pathname]) {
    return { enPath: REVERSE_LANGUAGE_PAIRS[pathname], zhPath: pathname };
  }

  const zhArticleMatch = pathname.match(/^\/zh\/(article|property-guides)\/(.+)$/);
  if (zhArticleMatch) {
    return {
      enPath: `/${zhArticleMatch[1]}/${zhArticleMatch[2]}`,
      zhPath: pathname,
    };
  }

  const enArticleMatch = pathname.match(/^\/(article|property-guides)\/(.+)$/);
  if (enArticleMatch) {
    return {
      enPath: pathname,
      zhPath: `/zh/${enArticleMatch[1]}/${enArticleMatch[2]}`,
    };
  }

  return null;
}

function getDynamicSeo(pathname, isZh) {
  if (/^\/zh\/(article|property-guides)\//.test(pathname)) {
    return ['房產文章｜Origin Property Concierge', '瀏覽 Origin Property Concierge 的實用房產文章與指南。'];
  }
  if (/^\/(article|property-guides)\//.test(pathname)) {
    return ['Property Article | Origin Property Concierge', 'Read practical property insights and guidance from Origin Property Concierge.'];
  }
  return isZh
    ? ['Origin Property Concierge｜墨爾本房產禮賓服務', '為墨爾本買家、業主及投資者提供實用房產流程指引與服務協調。']
    : ['Origin Property Concierge | Melbourne Property Guidance', 'Independent property guidance and coordinated support for Melbourne buyers, owners and investors.'];
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const isZh = cleanPath === '/zh' || cleanPath.startsWith('/zh/');
    const [title, description] = (isZh ? ZH[cleanPath] : EN[cleanPath]) || getDynamicSeo(cleanPath, isZh);
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
    const isPrivate = PRIVATE_PREFIXES.some((prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`));

    document.documentElement.lang = isZh ? 'zh-Hant' : 'en-AU';
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: isPrivate ? 'noindex, nofollow' : 'index, follow' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: isZh ? 'zh_Hant_AU' : 'en_AU' });
    upsertMeta('meta[property="og:locale:alternate"]', { property: 'og:locale:alternate', content: isZh ? 'en_AU' : 'zh_Hant_AU' });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const languagePair = getLanguagePair(cleanPath);
    const existingAlternates = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternates.forEach((element) => element.remove());

    if (languagePair && !isPrivate) {
      upsertLink('link[rel="alternate"][hreflang="en-AU"]', {
        rel: 'alternate',
        hreflang: 'en-AU',
        href: `${SITE_URL}${languagePair.enPath === '/' ? '/' : languagePair.enPath}`,
      });
      upsertLink('link[rel="alternate"][hreflang="zh-Hant-AU"]', {
        rel: 'alternate',
        hreflang: 'zh-Hant-AU',
        href: `${SITE_URL}${languagePair.zhPath}`,
      });
      upsertLink('link[rel="alternate"][hreflang="x-default"]', {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${SITE_URL}${languagePair.enPath === '/' ? '/' : languagePair.enPath}`,
      });
    }
  }, [pathname]);

  return null;
}
