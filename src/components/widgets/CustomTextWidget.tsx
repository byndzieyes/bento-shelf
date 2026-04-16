import type { CustomTextWidgetProps } from '@/types';

export default function CustomTextWidget({ content }: CustomTextWidgetProps) {
  if (!content || !content.text) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="mb-2 text-4xl">📝</span>
        <p className="text-sm font-medium text-neutral-500">Add a note...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <p className="wrap-break-word text-center text-xl font-bold text-white md:text-2xl line-clamp-4">
        {content.text}
      </p>
    </div>
  );
}
