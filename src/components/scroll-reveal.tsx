"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';

type ScrollRevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

export function ScrollReveal<T extends ElementType = 'div'>(props: ScrollRevealProps<T>) {
  const { as, delay = 0, className = '', children, style, ...rest } = props;
  const Component = (as ?? 'div') as ElementType;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={ref as any}
      data-visible={isVisible ? 'true' : 'false'}
      style={{
        ['--reveal-delay' as const]: `${delay}ms`,
        ...style
      }}
      className={[
        'scroll-reveal',
        isVisible ? 'scroll-reveal-visible' : '',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      {children}
    </Component>
  );
}
