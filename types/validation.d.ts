declare type ShapeOf<T, S = Yup.AnySchema> = Record<keyof T, S>;
