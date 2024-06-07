import {
    AvatarFormats,
    ICourseDetail,
    IImage,
    ImageFormat,
} from "@/interfaces/course.type";
interface Image {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        small: ImageFormat;
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
    folderPath: string;
    createdAt: string;
    updatedAt: string;
}
interface Avatar {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: AvatarFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
}

interface Teacher {
    id: number;
    name: string;
    sex: boolean;
    telephone: number;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar: Avatar;
}

interface Course {
    id: number;
    name: string;
    title: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string | null;
    startDate: string;
    numberOfSessions: string;
    image: Image;
    teacher: Teacher;
}

export interface IOrderCourse {
    createdAt: string;
    id: number;
    note: string;
    updatedAt: string;
    publishedAt: string | null;
    courses: Course[];
}
