// app/[locale]/layout.tsx (Server Component)
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import LocaleClientLayout from './LocaleClientLayout';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <LocaleClientLayout locale={locale} messages={messages}>
      {children}
    </LocaleClientLayout>
  );
}
