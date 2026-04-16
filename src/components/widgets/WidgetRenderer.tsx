import MovieWidget from './MovieWidget';
import type { CustomTextContent, MovieContent, WidgetRendererProps } from '@/types';
import CustomTextWidget from './CustomTextWidget';

export default function WidgetRenderer({ widget, w, h }: WidgetRendererProps) {
  switch (widget.type) {
    case 'MOVIE':
      return <MovieWidget content={widget.content as MovieContent} w={w} h={h} />;

    case 'CUSTOM_TEXT':
      return <CustomTextWidget content={widget.content as unknown as CustomTextContent} w={w} h={h} />;

    default:
      return (
        <div className="mt-auto flex flex-col items-center justify-center h-full text-center">
          <span className="text-3xl mb-2">❓</span>
          <p className="text-neutral-500 text-sm font-medium">Unknown widget</p>
        </div>
      );
  }
}
