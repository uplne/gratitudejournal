import { ImageType } from '../../state/JournalState';
import { ImageWrapper } from '../ImageWrapper';
import { ImagePicker } from '../ImagePicker';

type ComponentProps = {
  image: ImageType | null,
  setImage: (value: ImageType | null) => void,
  onDeleteImage: () => void,
  imageWidth: number,
  imageHeight: number,
};

export const ImageThumbnail = ({
  image,
  setImage,
  onDeleteImage,
  imageWidth,
  imageHeight,
}: ComponentProps) => {
  return (
    <>
    {image &&
      <ImageWrapper
        uri={image.uri}
        width={imageWidth}
        height={imageHeight}
        onDelete={onDeleteImage}
      />
    }
    {!image &&
      <ImagePicker
        image={image}
        setImage={setImage}
      />
    }
    </>
  );
};
