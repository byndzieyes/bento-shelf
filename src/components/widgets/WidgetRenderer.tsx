import MovieWidget from './MovieWidget';
import type { MovieContent, WidgetRendererProps } from '@/types';

export default function WidgetRenderer({ widget, w, h }: WidgetRendererProps) {
  switch (widget.type) {
    case 'MOVIE':
      return <MovieWidget content={widget.content as MovieContent} w={w} h={h} />;

    case 'MUSIC':
      // return <MusicWidget content={widget.content} />;
      return <div className="mt-auto text-neutral-500 font-medium">🎵 Music Widget</div>;

    case 'CUSTOM_TEXT':
      // return <CustomTextWidget content={widget.content} />;
      return <div className="mt-auto text-neutral-500 font-medium">📝 Custom Text</div>;

    default:
      return (
        <div className="mt-auto flex flex-col items-center justify-center h-full text-center">
          <span className="text-3xl mb-2">❓</span>
          <p className="text-neutral-500 text-sm font-medium">Unknown widget</p>
        </div>
      );
  }
}
