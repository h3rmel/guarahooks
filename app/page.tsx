import { CategoryCard } from '@/components/category-card';
import { PageBanner } from '@/components/page-banner';
import { PageGrid } from '@/components/page-grid';

import { categories } from '@/config/hooks';

export default function Home() {
  const sortedCategories = categories.sort((a, b) => {
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return 0;
  });

  // Hi

  return (
    <>
      <PageBanner
        title="Reusable, customizable and type-safe hooks built with and for React."
        subtitle="An open-source collection of copy-and-paste hooks to help you quickly build applications. Open Source and Open Code."
      />
      <PageGrid>
        {sortedCategories.map((category) => (
          <CategoryCard
            key={category.slug}
            slug={category.slug}
            name={category.name}
            description={category.description}
            icon={category.icon}
            hooksCount={category.hooks.length}
            isNew={category.isNew}
          />
        ))}
      </PageGrid>
    </>
  );
}
