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
  return (
    <Card className="py-4">
      <CardBody className="flex flex-row overflow-visible py-2">
        <div>
          <p className="text-large uppercase font-bold">{news.title}</p>
          <p>{news.content}</p>
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
