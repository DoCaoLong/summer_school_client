export interface ICourse {
    id: number;
    attributes: {
        name: string;
        title: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
        numberOfSessions: number | null;
        startDate: string | null;
        publishedAt: string;
        content: string | null;
        image: IImage;
        teacher: ITeacher;
    };
}

export interface ICourseOrder {
    id: number;
    note: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
}

export interface IImage {
    data: {
        id: number;
        attributes: {
            name: string;
            alternativeText: string | null;
            caption: string | null;
            width: number;
            height: number;
            formats: {
                small?: ImageFormat;
                medium?: ImageFormat;
                large?: ImageFormat;
                thumbnail?: ImageFormat;
            };
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: string | null;
            provider: string;
            provider_metadata: string | null;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export interface ITeacher {
    data: {
        id: number;
        attributes: {
            name: string;
            sex: boolean;
            telephone: number;
            dateOfBirth: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            avatar: {
                data: {
                    id: number;
                    attributes: {
                        name: string;
                        alternativeText: string | null;
                        caption: string | null;
                        width: number;
                        height: number;
                        formats: {
                            large: ImageFormat;
                            small: ImageFormat;
                            medium: ImageFormat;
                            thumbnail: ImageFormat;
                        };
                        hash: string;
                        ext: string;
                        mime: string;
                        size: number;
                        url: string;
                        previewUrl: string | null;
                        provider: string;
                        provider_metadata: string | null;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
            };
        };
    };
}

export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}
