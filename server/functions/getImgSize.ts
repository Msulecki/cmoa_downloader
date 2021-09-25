import sizeOf from 'image-size';

async function getImgSize(img: Promise<Buffer>[]): Promise<number> {
  const resolvedImgArray = await Promise.all(img);

  const height = await resolvedImgArray.reduce((acc, curr, i) => {
    return (acc += sizeOf(curr).height || 0);
  }, 0);

  return height;
}

export default getImgSize;
