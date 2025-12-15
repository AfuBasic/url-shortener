import mongoose, { type InferSchemaType } from "mongoose";
declare const LinkSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        targetUrl: string;
        clickCount: number;
        code?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        targetUrl: string;
        clickCount: number;
        code?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    targetUrl: string;
    clickCount: number;
    code?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type Link = InferSchemaType<typeof LinkSchema>;
declare const _default: mongoose.Model<{
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps, {}, mongoose.DefaultSchemaOptions> & {
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, {
    targetUrl: string;
    clickCount: number;
    code?: string | null;
} & mongoose.DefaultTimestampProps>;
export default _default;
//# sourceMappingURL=Link.d.ts.map