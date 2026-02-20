export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
};

export type Post = {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    image?: string;
    readTime?: string;
    date?: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type Enquiry = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    status: 'NEW' | 'READ' | 'CONTACTED';
    createdAt: Date;
};

export type State = {
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};
