export interface ICourse {
    id: number;
    attributes: {
        name: string;
        title: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        content: string | null;
        image: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    alternativeText: string | null;
                    caption: string | null;
                    width: number;
                    height: number;
                    formats: {
                        small: {
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
                        };
                        thumbnail: {
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
                        };
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
}

// interface Pagination {
//     page: number;
//     pageSize: number;
//     pageCount: number;
//     total: number;
// }

// interface ApiResponse {
//     data: Course[];
//     meta: {
//         pagination: Pagination;
//     };
// }
