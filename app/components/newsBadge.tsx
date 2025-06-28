import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';

import { News } from '@/payload-types';

type Props = {
  news: News;
};

export default function NewsBadge(props: Props) {
  const { news } = props;
  const date = new Date(news.publishedAt);
  return (
    <Card className="py-4">
      <CardBody className="flex flex-row overflow-visible justify-between py-0 px-4 min-h-[120px] max-h-[120px]">
        <div className="flex flex-col">
          <p className="italic pb-2">{date.toLocaleDateString('hu-HU')}</p>
          <p className="text-xl md:text-2xl uppercase font-bold">{news.title}</p>
        </div>
        {news.coverImage && (
          <Image
            alt="Card background"
            classNames={{ wrapper: 'z-0 rounded-xl w-[200px]', img: 'w-full h-full object-cover' }}
            src={news.coverImage}
          />
        )}
      </CardBody>
    </Card>
  );
}
