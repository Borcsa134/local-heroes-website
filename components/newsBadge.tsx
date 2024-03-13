import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { OstDocument } from 'outstatic';

type Props = {
  news: OstDocument<{
    [key: string]: unknown;
  }>;
};

export default function NewsBadge(props: Props) {
  const { news } = props;
  const date = new Date(news.publishedAt);
  return (
    <Card className="py-3">
      <CardBody className="flex flex-row overflow-visible justify-between py-0">
        <div className="flex flex-col">
          <p className="italic pb-2">{date.toLocaleDateString('hu-HU')}</p>
          <p className="sm:text-2xl uppercase font-bold">{news.title}</p>
        </div>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 object-cover rounded-xl"
          src={news.coverImage}
          width={100}
        />
      </CardBody>
    </Card>
  );
}
