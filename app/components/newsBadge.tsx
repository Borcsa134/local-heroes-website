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
    <Card className="py-3">
      <CardBody className="flex flex-row overflow-visible justify-between py-0 min-h-[120px] max-h-[120px]">
        <div className="flex flex-col">
          <p className="italic pb-2">{date.toLocaleDateString('hu-HU')}</p>
          <p className="text-xl md:text-2xl uppercase font-bold">{news.title}</p>
        </div>
        {news.coverImage && typeof news.coverImage == 'object' && (
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-contain rounded-xl w-[100px]"
            src={news.coverImage?.url}
          />
        )}
      </CardBody>
    </Card>
  );
}
