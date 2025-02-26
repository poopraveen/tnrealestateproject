// /lib/utils.ts
import clsx from 'clsx';

export const cn = (...classes: (string | undefined | false)[]) => clsx(classes);
