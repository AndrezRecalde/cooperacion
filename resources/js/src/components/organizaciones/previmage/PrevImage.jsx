import { Image, SimpleGrid } from "@mantine/core";

export const PrevImage = () => {
    return (
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <Image
                src={imageUrl}
                imageProps={{
                    onLoad: () => URL.revokeObjectURL(imageUrl),
                }}
            />
        </SimpleGrid>
    );
};
