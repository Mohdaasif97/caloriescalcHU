import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';
import styles from './Breadcrumb.module.css';

interface CrumbItem {
  name: string;
  href: string;
}

interface Props {
  items: CrumbItem[]; // First item is always home, last is current page
}

export default function Breadcrumb({ items }: Props) {
  const allItems = [{ name: 'Főoldal', href: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.kaloriakalkulator9.hu${item.href}`,
    })),
  };

  return (
    <>
      <StructuredData data={schema} />
      <nav className={styles.breadcrumb} aria-label="Navigáció">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <span key={item.href} className={styles.item}>
              {index > 0 && <span className={styles.sep} aria-hidden="true">/</span>}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className={styles.link}>
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
