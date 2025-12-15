import mongoose, { type InferSchemaType } from "mongoose";
declare const ClickSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
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
        ipHash?: string | null;
        linkId?: mongoose.Types.ObjectId | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        ipHash?: string | null;
        linkId?: mongoose.Types.ObjectId | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type Click = InferSchemaType<typeof ClickSchema>;
declare const _default: mongoose.Model<{
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, mongoose.DefaultSchemaOptions> & {
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, {
    ipHash?: string | null;
    linkId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps>;
export default _default;
//# sourceMappingURL=Click.d.ts.map