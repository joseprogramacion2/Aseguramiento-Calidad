
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Platillo
 * 
 */
export type Platillo = $Result.DefaultSelection<Prisma.$PlatilloPayload>
/**
 * Model Rol
 * 
 */
export type Rol = $Result.DefaultSelection<Prisma.$RolPayload>
/**
 * Model HistorialModificacion
 * 
 */
export type HistorialModificacion = $Result.DefaultSelection<Prisma.$HistorialModificacionPayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platillo`: Exposes CRUD operations for the **Platillo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Platillos
    * const platillos = await prisma.platillo.findMany()
    * ```
    */
  get platillo(): Prisma.PlatilloDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rol`: Exposes CRUD operations for the **Rol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rols
    * const rols = await prisma.rol.findMany()
    * ```
    */
  get rol(): Prisma.RolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.historialModificacion`: Exposes CRUD operations for the **HistorialModificacion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HistorialModificacions
    * const historialModificacions = await prisma.historialModificacion.findMany()
    * ```
    */
  get historialModificacion(): Prisma.HistorialModificacionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Platillo: 'Platillo',
    Rol: 'Rol',
    HistorialModificacion: 'HistorialModificacion',
    Categoria: 'Categoria'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "platillo" | "rol" | "historialModificacion" | "categoria"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Platillo: {
        payload: Prisma.$PlatilloPayload<ExtArgs>
        fields: Prisma.PlatilloFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatilloFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatilloFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>
          }
          findFirst: {
            args: Prisma.PlatilloFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatilloFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>
          }
          findMany: {
            args: Prisma.PlatilloFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>[]
          }
          create: {
            args: Prisma.PlatilloCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>
          }
          createMany: {
            args: Prisma.PlatilloCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatilloCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>[]
          }
          delete: {
            args: Prisma.PlatilloDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>
          }
          update: {
            args: Prisma.PlatilloUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>
          }
          deleteMany: {
            args: Prisma.PlatilloDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatilloUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlatilloUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>[]
          }
          upsert: {
            args: Prisma.PlatilloUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatilloPayload>
          }
          aggregate: {
            args: Prisma.PlatilloAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatillo>
          }
          groupBy: {
            args: Prisma.PlatilloGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatilloGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatilloCountArgs<ExtArgs>
            result: $Utils.Optional<PlatilloCountAggregateOutputType> | number
          }
        }
      }
      Rol: {
        payload: Prisma.$RolPayload<ExtArgs>
        fields: Prisma.RolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          findFirst: {
            args: Prisma.RolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          findMany: {
            args: Prisma.RolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>[]
          }
          create: {
            args: Prisma.RolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          createMany: {
            args: Prisma.RolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>[]
          }
          delete: {
            args: Prisma.RolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          update: {
            args: Prisma.RolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          deleteMany: {
            args: Prisma.RolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>[]
          }
          upsert: {
            args: Prisma.RolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolPayload>
          }
          aggregate: {
            args: Prisma.RolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRol>
          }
          groupBy: {
            args: Prisma.RolGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolCountArgs<ExtArgs>
            result: $Utils.Optional<RolCountAggregateOutputType> | number
          }
        }
      }
      HistorialModificacion: {
        payload: Prisma.$HistorialModificacionPayload<ExtArgs>
        fields: Prisma.HistorialModificacionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HistorialModificacionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HistorialModificacionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>
          }
          findFirst: {
            args: Prisma.HistorialModificacionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HistorialModificacionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>
          }
          findMany: {
            args: Prisma.HistorialModificacionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>[]
          }
          create: {
            args: Prisma.HistorialModificacionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>
          }
          createMany: {
            args: Prisma.HistorialModificacionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HistorialModificacionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>[]
          }
          delete: {
            args: Prisma.HistorialModificacionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>
          }
          update: {
            args: Prisma.HistorialModificacionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>
          }
          deleteMany: {
            args: Prisma.HistorialModificacionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HistorialModificacionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HistorialModificacionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>[]
          }
          upsert: {
            args: Prisma.HistorialModificacionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialModificacionPayload>
          }
          aggregate: {
            args: Prisma.HistorialModificacionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistorialModificacion>
          }
          groupBy: {
            args: Prisma.HistorialModificacionGroupByArgs<ExtArgs>
            result: $Utils.Optional<HistorialModificacionGroupByOutputType>[]
          }
          count: {
            args: Prisma.HistorialModificacionCountArgs<ExtArgs>
            result: $Utils.Optional<HistorialModificacionCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    platillo?: PlatilloOmit
    rol?: RolOmit
    historialModificacion?: HistorialModificacionOmit
    categoria?: CategoriaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    historialModificaciones: number
    historialResponsable: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historialModificaciones?: boolean | UsuarioCountOutputTypeCountHistorialModificacionesArgs
    historialResponsable?: boolean | UsuarioCountOutputTypeCountHistorialResponsableArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountHistorialModificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialModificacionWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountHistorialResponsableArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialModificacionWhereInput
  }


  /**
   * Count Type PlatilloCountOutputType
   */

  export type PlatilloCountOutputType = {
    historialModificaciones: number
  }

  export type PlatilloCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historialModificaciones?: boolean | PlatilloCountOutputTypeCountHistorialModificacionesArgs
  }

  // Custom InputTypes
  /**
   * PlatilloCountOutputType without action
   */
  export type PlatilloCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatilloCountOutputType
     */
    select?: PlatilloCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatilloCountOutputType without action
   */
  export type PlatilloCountOutputTypeCountHistorialModificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialModificacionWhereInput
  }


  /**
   * Count Type RolCountOutputType
   */

  export type RolCountOutputType = {
    usuarios: number
  }

  export type RolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | RolCountOutputTypeCountUsuariosArgs
  }

  // Custom InputTypes
  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolCountOutputType
     */
    select?: RolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    platillos: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platillos?: boolean | CategoriaCountOutputTypeCountPlatillosArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountPlatillosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatilloWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
    rolId: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
    rolId: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    usuario: string | null
    correo: string | null
    contrasena: string | null
    estado: boolean | null
    creadoEn: Date | null
    actualizadoEn: Date | null
    rolId: number | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    usuario: string | null
    correo: string | null
    contrasena: string | null
    estado: boolean | null
    creadoEn: Date | null
    actualizadoEn: Date | null
    rolId: number | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    usuario: number
    correo: number
    contrasena: number
    estado: number
    creadoEn: number
    actualizadoEn: number
    rolId: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
    rolId?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
    rolId?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    usuario?: true
    correo?: true
    contrasena?: true
    estado?: true
    creadoEn?: true
    actualizadoEn?: true
    rolId?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    usuario?: true
    correo?: true
    contrasena?: true
    estado?: true
    creadoEn?: true
    actualizadoEn?: true
    rolId?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    usuario?: true
    correo?: true
    contrasena?: true
    estado?: true
    creadoEn?: true
    actualizadoEn?: true
    rolId?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado: boolean
    creadoEn: Date
    actualizadoEn: Date
    rolId: number
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    usuario?: boolean
    correo?: boolean
    contrasena?: boolean
    estado?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    rolId?: boolean
    rol?: boolean | RolDefaultArgs<ExtArgs>
    historialModificaciones?: boolean | Usuario$historialModificacionesArgs<ExtArgs>
    historialResponsable?: boolean | Usuario$historialResponsableArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    usuario?: boolean
    correo?: boolean
    contrasena?: boolean
    estado?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    rolId?: boolean
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    usuario?: boolean
    correo?: boolean
    contrasena?: boolean
    estado?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    rolId?: boolean
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    usuario?: boolean
    correo?: boolean
    contrasena?: boolean
    estado?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    rolId?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "usuario" | "correo" | "contrasena" | "estado" | "creadoEn" | "actualizadoEn" | "rolId", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rol?: boolean | RolDefaultArgs<ExtArgs>
    historialModificaciones?: boolean | Usuario$historialModificacionesArgs<ExtArgs>
    historialResponsable?: boolean | Usuario$historialResponsableArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rol?: boolean | RolDefaultArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      rol: Prisma.$RolPayload<ExtArgs>
      historialModificaciones: Prisma.$HistorialModificacionPayload<ExtArgs>[]
      historialResponsable: Prisma.$HistorialModificacionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      usuario: string
      correo: string
      contrasena: string
      estado: boolean
      creadoEn: Date
      actualizadoEn: Date
      rolId: number
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rol<T extends RolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolDefaultArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    historialModificaciones<T extends Usuario$historialModificacionesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$historialModificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historialResponsable<T extends Usuario$historialResponsableArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$historialResponsableArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly usuario: FieldRef<"Usuario", 'String'>
    readonly correo: FieldRef<"Usuario", 'String'>
    readonly contrasena: FieldRef<"Usuario", 'String'>
    readonly estado: FieldRef<"Usuario", 'Boolean'>
    readonly creadoEn: FieldRef<"Usuario", 'DateTime'>
    readonly actualizadoEn: FieldRef<"Usuario", 'DateTime'>
    readonly rolId: FieldRef<"Usuario", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.historialModificaciones
   */
  export type Usuario$historialModificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    where?: HistorialModificacionWhereInput
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    cursor?: HistorialModificacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistorialModificacionScalarFieldEnum | HistorialModificacionScalarFieldEnum[]
  }

  /**
   * Usuario.historialResponsable
   */
  export type Usuario$historialResponsableArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    where?: HistorialModificacionWhereInput
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    cursor?: HistorialModificacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistorialModificacionScalarFieldEnum | HistorialModificacionScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Platillo
   */

  export type AggregatePlatillo = {
    _count: PlatilloCountAggregateOutputType | null
    _avg: PlatilloAvgAggregateOutputType | null
    _sum: PlatilloSumAggregateOutputType | null
    _min: PlatilloMinAggregateOutputType | null
    _max: PlatilloMaxAggregateOutputType | null
  }

  export type PlatilloAvgAggregateOutputType = {
    id: number | null
    precio: number | null
    categoriaId: number | null
  }

  export type PlatilloSumAggregateOutputType = {
    id: number | null
    precio: number | null
    categoriaId: number | null
  }

  export type PlatilloMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    precio: number | null
    creadoEn: Date | null
    disponible: boolean | null
    categoriaId: number | null
  }

  export type PlatilloMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    precio: number | null
    creadoEn: Date | null
    disponible: boolean | null
    categoriaId: number | null
  }

  export type PlatilloCountAggregateOutputType = {
    id: number
    nombre: number
    precio: number
    creadoEn: number
    disponible: number
    categoriaId: number
    _all: number
  }


  export type PlatilloAvgAggregateInputType = {
    id?: true
    precio?: true
    categoriaId?: true
  }

  export type PlatilloSumAggregateInputType = {
    id?: true
    precio?: true
    categoriaId?: true
  }

  export type PlatilloMinAggregateInputType = {
    id?: true
    nombre?: true
    precio?: true
    creadoEn?: true
    disponible?: true
    categoriaId?: true
  }

  export type PlatilloMaxAggregateInputType = {
    id?: true
    nombre?: true
    precio?: true
    creadoEn?: true
    disponible?: true
    categoriaId?: true
  }

  export type PlatilloCountAggregateInputType = {
    id?: true
    nombre?: true
    precio?: true
    creadoEn?: true
    disponible?: true
    categoriaId?: true
    _all?: true
  }

  export type PlatilloAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Platillo to aggregate.
     */
    where?: PlatilloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platillos to fetch.
     */
    orderBy?: PlatilloOrderByWithRelationInput | PlatilloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatilloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platillos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platillos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Platillos
    **/
    _count?: true | PlatilloCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatilloAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatilloSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatilloMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatilloMaxAggregateInputType
  }

  export type GetPlatilloAggregateType<T extends PlatilloAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatillo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatillo[P]>
      : GetScalarType<T[P], AggregatePlatillo[P]>
  }




  export type PlatilloGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatilloWhereInput
    orderBy?: PlatilloOrderByWithAggregationInput | PlatilloOrderByWithAggregationInput[]
    by: PlatilloScalarFieldEnum[] | PlatilloScalarFieldEnum
    having?: PlatilloScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatilloCountAggregateInputType | true
    _avg?: PlatilloAvgAggregateInputType
    _sum?: PlatilloSumAggregateInputType
    _min?: PlatilloMinAggregateInputType
    _max?: PlatilloMaxAggregateInputType
  }

  export type PlatilloGroupByOutputType = {
    id: number
    nombre: string
    precio: number
    creadoEn: Date
    disponible: boolean
    categoriaId: number
    _count: PlatilloCountAggregateOutputType | null
    _avg: PlatilloAvgAggregateOutputType | null
    _sum: PlatilloSumAggregateOutputType | null
    _min: PlatilloMinAggregateOutputType | null
    _max: PlatilloMaxAggregateOutputType | null
  }

  type GetPlatilloGroupByPayload<T extends PlatilloGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatilloGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatilloGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatilloGroupByOutputType[P]>
            : GetScalarType<T[P], PlatilloGroupByOutputType[P]>
        }
      >
    >


  export type PlatilloSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    precio?: boolean
    creadoEn?: boolean
    disponible?: boolean
    categoriaId?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    historialModificaciones?: boolean | Platillo$historialModificacionesArgs<ExtArgs>
    _count?: boolean | PlatilloCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platillo"]>

  export type PlatilloSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    precio?: boolean
    creadoEn?: boolean
    disponible?: boolean
    categoriaId?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platillo"]>

  export type PlatilloSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    precio?: boolean
    creadoEn?: boolean
    disponible?: boolean
    categoriaId?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platillo"]>

  export type PlatilloSelectScalar = {
    id?: boolean
    nombre?: boolean
    precio?: boolean
    creadoEn?: boolean
    disponible?: boolean
    categoriaId?: boolean
  }

  export type PlatilloOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "precio" | "creadoEn" | "disponible" | "categoriaId", ExtArgs["result"]["platillo"]>
  export type PlatilloInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    historialModificaciones?: boolean | Platillo$historialModificacionesArgs<ExtArgs>
    _count?: boolean | PlatilloCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlatilloIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }
  export type PlatilloIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }

  export type $PlatilloPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Platillo"
    objects: {
      categoria: Prisma.$CategoriaPayload<ExtArgs>
      historialModificaciones: Prisma.$HistorialModificacionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      precio: number
      creadoEn: Date
      disponible: boolean
      categoriaId: number
    }, ExtArgs["result"]["platillo"]>
    composites: {}
  }

  type PlatilloGetPayload<S extends boolean | null | undefined | PlatilloDefaultArgs> = $Result.GetResult<Prisma.$PlatilloPayload, S>

  type PlatilloCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatilloFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatilloCountAggregateInputType | true
    }

  export interface PlatilloDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Platillo'], meta: { name: 'Platillo' } }
    /**
     * Find zero or one Platillo that matches the filter.
     * @param {PlatilloFindUniqueArgs} args - Arguments to find a Platillo
     * @example
     * // Get one Platillo
     * const platillo = await prisma.platillo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatilloFindUniqueArgs>(args: SelectSubset<T, PlatilloFindUniqueArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Platillo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatilloFindUniqueOrThrowArgs} args - Arguments to find a Platillo
     * @example
     * // Get one Platillo
     * const platillo = await prisma.platillo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatilloFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatilloFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Platillo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloFindFirstArgs} args - Arguments to find a Platillo
     * @example
     * // Get one Platillo
     * const platillo = await prisma.platillo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatilloFindFirstArgs>(args?: SelectSubset<T, PlatilloFindFirstArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Platillo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloFindFirstOrThrowArgs} args - Arguments to find a Platillo
     * @example
     * // Get one Platillo
     * const platillo = await prisma.platillo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatilloFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatilloFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Platillos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Platillos
     * const platillos = await prisma.platillo.findMany()
     * 
     * // Get first 10 Platillos
     * const platillos = await prisma.platillo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platilloWithIdOnly = await prisma.platillo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatilloFindManyArgs>(args?: SelectSubset<T, PlatilloFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Platillo.
     * @param {PlatilloCreateArgs} args - Arguments to create a Platillo.
     * @example
     * // Create one Platillo
     * const Platillo = await prisma.platillo.create({
     *   data: {
     *     // ... data to create a Platillo
     *   }
     * })
     * 
     */
    create<T extends PlatilloCreateArgs>(args: SelectSubset<T, PlatilloCreateArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Platillos.
     * @param {PlatilloCreateManyArgs} args - Arguments to create many Platillos.
     * @example
     * // Create many Platillos
     * const platillo = await prisma.platillo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatilloCreateManyArgs>(args?: SelectSubset<T, PlatilloCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Platillos and returns the data saved in the database.
     * @param {PlatilloCreateManyAndReturnArgs} args - Arguments to create many Platillos.
     * @example
     * // Create many Platillos
     * const platillo = await prisma.platillo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Platillos and only return the `id`
     * const platilloWithIdOnly = await prisma.platillo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatilloCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatilloCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Platillo.
     * @param {PlatilloDeleteArgs} args - Arguments to delete one Platillo.
     * @example
     * // Delete one Platillo
     * const Platillo = await prisma.platillo.delete({
     *   where: {
     *     // ... filter to delete one Platillo
     *   }
     * })
     * 
     */
    delete<T extends PlatilloDeleteArgs>(args: SelectSubset<T, PlatilloDeleteArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Platillo.
     * @param {PlatilloUpdateArgs} args - Arguments to update one Platillo.
     * @example
     * // Update one Platillo
     * const platillo = await prisma.platillo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatilloUpdateArgs>(args: SelectSubset<T, PlatilloUpdateArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Platillos.
     * @param {PlatilloDeleteManyArgs} args - Arguments to filter Platillos to delete.
     * @example
     * // Delete a few Platillos
     * const { count } = await prisma.platillo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatilloDeleteManyArgs>(args?: SelectSubset<T, PlatilloDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platillos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Platillos
     * const platillo = await prisma.platillo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatilloUpdateManyArgs>(args: SelectSubset<T, PlatilloUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platillos and returns the data updated in the database.
     * @param {PlatilloUpdateManyAndReturnArgs} args - Arguments to update many Platillos.
     * @example
     * // Update many Platillos
     * const platillo = await prisma.platillo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Platillos and only return the `id`
     * const platilloWithIdOnly = await prisma.platillo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlatilloUpdateManyAndReturnArgs>(args: SelectSubset<T, PlatilloUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Platillo.
     * @param {PlatilloUpsertArgs} args - Arguments to update or create a Platillo.
     * @example
     * // Update or create a Platillo
     * const platillo = await prisma.platillo.upsert({
     *   create: {
     *     // ... data to create a Platillo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Platillo we want to update
     *   }
     * })
     */
    upsert<T extends PlatilloUpsertArgs>(args: SelectSubset<T, PlatilloUpsertArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Platillos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloCountArgs} args - Arguments to filter Platillos to count.
     * @example
     * // Count the number of Platillos
     * const count = await prisma.platillo.count({
     *   where: {
     *     // ... the filter for the Platillos we want to count
     *   }
     * })
    **/
    count<T extends PlatilloCountArgs>(
      args?: Subset<T, PlatilloCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatilloCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Platillo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatilloAggregateArgs>(args: Subset<T, PlatilloAggregateArgs>): Prisma.PrismaPromise<GetPlatilloAggregateType<T>>

    /**
     * Group by Platillo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatilloGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatilloGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatilloGroupByArgs['orderBy'] }
        : { orderBy?: PlatilloGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatilloGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatilloGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Platillo model
   */
  readonly fields: PlatilloFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Platillo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatilloClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    historialModificaciones<T extends Platillo$historialModificacionesArgs<ExtArgs> = {}>(args?: Subset<T, Platillo$historialModificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Platillo model
   */
  interface PlatilloFieldRefs {
    readonly id: FieldRef<"Platillo", 'Int'>
    readonly nombre: FieldRef<"Platillo", 'String'>
    readonly precio: FieldRef<"Platillo", 'Float'>
    readonly creadoEn: FieldRef<"Platillo", 'DateTime'>
    readonly disponible: FieldRef<"Platillo", 'Boolean'>
    readonly categoriaId: FieldRef<"Platillo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Platillo findUnique
   */
  export type PlatilloFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * Filter, which Platillo to fetch.
     */
    where: PlatilloWhereUniqueInput
  }

  /**
   * Platillo findUniqueOrThrow
   */
  export type PlatilloFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * Filter, which Platillo to fetch.
     */
    where: PlatilloWhereUniqueInput
  }

  /**
   * Platillo findFirst
   */
  export type PlatilloFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * Filter, which Platillo to fetch.
     */
    where?: PlatilloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platillos to fetch.
     */
    orderBy?: PlatilloOrderByWithRelationInput | PlatilloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platillos.
     */
    cursor?: PlatilloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platillos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platillos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platillos.
     */
    distinct?: PlatilloScalarFieldEnum | PlatilloScalarFieldEnum[]
  }

  /**
   * Platillo findFirstOrThrow
   */
  export type PlatilloFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * Filter, which Platillo to fetch.
     */
    where?: PlatilloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platillos to fetch.
     */
    orderBy?: PlatilloOrderByWithRelationInput | PlatilloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platillos.
     */
    cursor?: PlatilloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platillos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platillos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platillos.
     */
    distinct?: PlatilloScalarFieldEnum | PlatilloScalarFieldEnum[]
  }

  /**
   * Platillo findMany
   */
  export type PlatilloFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * Filter, which Platillos to fetch.
     */
    where?: PlatilloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platillos to fetch.
     */
    orderBy?: PlatilloOrderByWithRelationInput | PlatilloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Platillos.
     */
    cursor?: PlatilloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platillos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platillos.
     */
    skip?: number
    distinct?: PlatilloScalarFieldEnum | PlatilloScalarFieldEnum[]
  }

  /**
   * Platillo create
   */
  export type PlatilloCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * The data needed to create a Platillo.
     */
    data: XOR<PlatilloCreateInput, PlatilloUncheckedCreateInput>
  }

  /**
   * Platillo createMany
   */
  export type PlatilloCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Platillos.
     */
    data: PlatilloCreateManyInput | PlatilloCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Platillo createManyAndReturn
   */
  export type PlatilloCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * The data used to create many Platillos.
     */
    data: PlatilloCreateManyInput | PlatilloCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Platillo update
   */
  export type PlatilloUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * The data needed to update a Platillo.
     */
    data: XOR<PlatilloUpdateInput, PlatilloUncheckedUpdateInput>
    /**
     * Choose, which Platillo to update.
     */
    where: PlatilloWhereUniqueInput
  }

  /**
   * Platillo updateMany
   */
  export type PlatilloUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Platillos.
     */
    data: XOR<PlatilloUpdateManyMutationInput, PlatilloUncheckedUpdateManyInput>
    /**
     * Filter which Platillos to update
     */
    where?: PlatilloWhereInput
    /**
     * Limit how many Platillos to update.
     */
    limit?: number
  }

  /**
   * Platillo updateManyAndReturn
   */
  export type PlatilloUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * The data used to update Platillos.
     */
    data: XOR<PlatilloUpdateManyMutationInput, PlatilloUncheckedUpdateManyInput>
    /**
     * Filter which Platillos to update
     */
    where?: PlatilloWhereInput
    /**
     * Limit how many Platillos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Platillo upsert
   */
  export type PlatilloUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * The filter to search for the Platillo to update in case it exists.
     */
    where: PlatilloWhereUniqueInput
    /**
     * In case the Platillo found by the `where` argument doesn't exist, create a new Platillo with this data.
     */
    create: XOR<PlatilloCreateInput, PlatilloUncheckedCreateInput>
    /**
     * In case the Platillo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatilloUpdateInput, PlatilloUncheckedUpdateInput>
  }

  /**
   * Platillo delete
   */
  export type PlatilloDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    /**
     * Filter which Platillo to delete.
     */
    where: PlatilloWhereUniqueInput
  }

  /**
   * Platillo deleteMany
   */
  export type PlatilloDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Platillos to delete
     */
    where?: PlatilloWhereInput
    /**
     * Limit how many Platillos to delete.
     */
    limit?: number
  }

  /**
   * Platillo.historialModificaciones
   */
  export type Platillo$historialModificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    where?: HistorialModificacionWhereInput
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    cursor?: HistorialModificacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistorialModificacionScalarFieldEnum | HistorialModificacionScalarFieldEnum[]
  }

  /**
   * Platillo without action
   */
  export type PlatilloDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
  }


  /**
   * Model Rol
   */

  export type AggregateRol = {
    _count: RolCountAggregateOutputType | null
    _avg: RolAvgAggregateOutputType | null
    _sum: RolSumAggregateOutputType | null
    _min: RolMinAggregateOutputType | null
    _max: RolMaxAggregateOutputType | null
  }

  export type RolAvgAggregateOutputType = {
    id: number | null
  }

  export type RolSumAggregateOutputType = {
    id: number | null
  }

  export type RolMinAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type RolMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type RolCountAggregateOutputType = {
    id: number
    nombre: number
    _all: number
  }


  export type RolAvgAggregateInputType = {
    id?: true
  }

  export type RolSumAggregateInputType = {
    id?: true
  }

  export type RolMinAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type RolMaxAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type RolCountAggregateInputType = {
    id?: true
    nombre?: true
    _all?: true
  }

  export type RolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rol to aggregate.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rols
    **/
    _count?: true | RolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolMaxAggregateInputType
  }

  export type GetRolAggregateType<T extends RolAggregateArgs> = {
        [P in keyof T & keyof AggregateRol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRol[P]>
      : GetScalarType<T[P], AggregateRol[P]>
  }




  export type RolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolWhereInput
    orderBy?: RolOrderByWithAggregationInput | RolOrderByWithAggregationInput[]
    by: RolScalarFieldEnum[] | RolScalarFieldEnum
    having?: RolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolCountAggregateInputType | true
    _avg?: RolAvgAggregateInputType
    _sum?: RolSumAggregateInputType
    _min?: RolMinAggregateInputType
    _max?: RolMaxAggregateInputType
  }

  export type RolGroupByOutputType = {
    id: number
    nombre: string
    _count: RolCountAggregateOutputType | null
    _avg: RolAvgAggregateOutputType | null
    _sum: RolSumAggregateOutputType | null
    _min: RolMinAggregateOutputType | null
    _max: RolMaxAggregateOutputType | null
  }

  type GetRolGroupByPayload<T extends RolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolGroupByOutputType[P]>
            : GetScalarType<T[P], RolGroupByOutputType[P]>
        }
      >
    >


  export type RolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    usuarios?: boolean | Rol$usuariosArgs<ExtArgs>
    _count?: boolean | RolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rol"]>

  export type RolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["rol"]>

  export type RolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["rol"]>

  export type RolSelectScalar = {
    id?: boolean
    nombre?: boolean
  }

  export type RolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["rol"]>
  export type RolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | Rol$usuariosArgs<ExtArgs>
    _count?: boolean | RolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rol"
    objects: {
      usuarios: Prisma.$UsuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
    }, ExtArgs["result"]["rol"]>
    composites: {}
  }

  type RolGetPayload<S extends boolean | null | undefined | RolDefaultArgs> = $Result.GetResult<Prisma.$RolPayload, S>

  type RolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolCountAggregateInputType | true
    }

  export interface RolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rol'], meta: { name: 'Rol' } }
    /**
     * Find zero or one Rol that matches the filter.
     * @param {RolFindUniqueArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolFindUniqueArgs>(args: SelectSubset<T, RolFindUniqueArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rol that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolFindUniqueOrThrowArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolFindUniqueOrThrowArgs>(args: SelectSubset<T, RolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindFirstArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolFindFirstArgs>(args?: SelectSubset<T, RolFindFirstArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rol that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindFirstOrThrowArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolFindFirstOrThrowArgs>(args?: SelectSubset<T, RolFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rols
     * const rols = await prisma.rol.findMany()
     * 
     * // Get first 10 Rols
     * const rols = await prisma.rol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolWithIdOnly = await prisma.rol.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolFindManyArgs>(args?: SelectSubset<T, RolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rol.
     * @param {RolCreateArgs} args - Arguments to create a Rol.
     * @example
     * // Create one Rol
     * const Rol = await prisma.rol.create({
     *   data: {
     *     // ... data to create a Rol
     *   }
     * })
     * 
     */
    create<T extends RolCreateArgs>(args: SelectSubset<T, RolCreateArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rols.
     * @param {RolCreateManyArgs} args - Arguments to create many Rols.
     * @example
     * // Create many Rols
     * const rol = await prisma.rol.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolCreateManyArgs>(args?: SelectSubset<T, RolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rols and returns the data saved in the database.
     * @param {RolCreateManyAndReturnArgs} args - Arguments to create many Rols.
     * @example
     * // Create many Rols
     * const rol = await prisma.rol.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rols and only return the `id`
     * const rolWithIdOnly = await prisma.rol.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolCreateManyAndReturnArgs>(args?: SelectSubset<T, RolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rol.
     * @param {RolDeleteArgs} args - Arguments to delete one Rol.
     * @example
     * // Delete one Rol
     * const Rol = await prisma.rol.delete({
     *   where: {
     *     // ... filter to delete one Rol
     *   }
     * })
     * 
     */
    delete<T extends RolDeleteArgs>(args: SelectSubset<T, RolDeleteArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rol.
     * @param {RolUpdateArgs} args - Arguments to update one Rol.
     * @example
     * // Update one Rol
     * const rol = await prisma.rol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolUpdateArgs>(args: SelectSubset<T, RolUpdateArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rols.
     * @param {RolDeleteManyArgs} args - Arguments to filter Rols to delete.
     * @example
     * // Delete a few Rols
     * const { count } = await prisma.rol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolDeleteManyArgs>(args?: SelectSubset<T, RolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rols
     * const rol = await prisma.rol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolUpdateManyArgs>(args: SelectSubset<T, RolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rols and returns the data updated in the database.
     * @param {RolUpdateManyAndReturnArgs} args - Arguments to update many Rols.
     * @example
     * // Update many Rols
     * const rol = await prisma.rol.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rols and only return the `id`
     * const rolWithIdOnly = await prisma.rol.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolUpdateManyAndReturnArgs>(args: SelectSubset<T, RolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rol.
     * @param {RolUpsertArgs} args - Arguments to update or create a Rol.
     * @example
     * // Update or create a Rol
     * const rol = await prisma.rol.upsert({
     *   create: {
     *     // ... data to create a Rol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rol we want to update
     *   }
     * })
     */
    upsert<T extends RolUpsertArgs>(args: SelectSubset<T, RolUpsertArgs<ExtArgs>>): Prisma__RolClient<$Result.GetResult<Prisma.$RolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolCountArgs} args - Arguments to filter Rols to count.
     * @example
     * // Count the number of Rols
     * const count = await prisma.rol.count({
     *   where: {
     *     // ... the filter for the Rols we want to count
     *   }
     * })
    **/
    count<T extends RolCountArgs>(
      args?: Subset<T, RolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolAggregateArgs>(args: Subset<T, RolAggregateArgs>): Prisma.PrismaPromise<GetRolAggregateType<T>>

    /**
     * Group by Rol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolGroupByArgs['orderBy'] }
        : { orderBy?: RolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rol model
   */
  readonly fields: RolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends Rol$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Rol$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rol model
   */
  interface RolFieldRefs {
    readonly id: FieldRef<"Rol", 'Int'>
    readonly nombre: FieldRef<"Rol", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Rol findUnique
   */
  export type RolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol findUniqueOrThrow
   */
  export type RolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol findFirst
   */
  export type RolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rols.
     */
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }

  /**
   * Rol findFirstOrThrow
   */
  export type RolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rols.
     */
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }

  /**
   * Rol findMany
   */
  export type RolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rols to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }

  /**
   * Rol create
   */
  export type RolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The data needed to create a Rol.
     */
    data: XOR<RolCreateInput, RolUncheckedCreateInput>
  }

  /**
   * Rol createMany
   */
  export type RolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rols.
     */
    data: RolCreateManyInput | RolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rol createManyAndReturn
   */
  export type RolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * The data used to create many Rols.
     */
    data: RolCreateManyInput | RolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rol update
   */
  export type RolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The data needed to update a Rol.
     */
    data: XOR<RolUpdateInput, RolUncheckedUpdateInput>
    /**
     * Choose, which Rol to update.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol updateMany
   */
  export type RolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rols.
     */
    data: XOR<RolUpdateManyMutationInput, RolUncheckedUpdateManyInput>
    /**
     * Filter which Rols to update
     */
    where?: RolWhereInput
    /**
     * Limit how many Rols to update.
     */
    limit?: number
  }

  /**
   * Rol updateManyAndReturn
   */
  export type RolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * The data used to update Rols.
     */
    data: XOR<RolUpdateManyMutationInput, RolUncheckedUpdateManyInput>
    /**
     * Filter which Rols to update
     */
    where?: RolWhereInput
    /**
     * Limit how many Rols to update.
     */
    limit?: number
  }

  /**
   * Rol upsert
   */
  export type RolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The filter to search for the Rol to update in case it exists.
     */
    where: RolWhereUniqueInput
    /**
     * In case the Rol found by the `where` argument doesn't exist, create a new Rol with this data.
     */
    create: XOR<RolCreateInput, RolUncheckedCreateInput>
    /**
     * In case the Rol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolUpdateInput, RolUncheckedUpdateInput>
  }

  /**
   * Rol delete
   */
  export type RolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter which Rol to delete.
     */
    where: RolWhereUniqueInput
  }

  /**
   * Rol deleteMany
   */
  export type RolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rols to delete
     */
    where?: RolWhereInput
    /**
     * Limit how many Rols to delete.
     */
    limit?: number
  }

  /**
   * Rol.usuarios
   */
  export type Rol$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Rol without action
   */
  export type RolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rol
     */
    omit?: RolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolInclude<ExtArgs> | null
  }


  /**
   * Model HistorialModificacion
   */

  export type AggregateHistorialModificacion = {
    _count: HistorialModificacionCountAggregateOutputType | null
    _avg: HistorialModificacionAvgAggregateOutputType | null
    _sum: HistorialModificacionSumAggregateOutputType | null
    _min: HistorialModificacionMinAggregateOutputType | null
    _max: HistorialModificacionMaxAggregateOutputType | null
  }

  export type HistorialModificacionAvgAggregateOutputType = {
    id: number | null
    responsableId: number | null
    usuarioId: number | null
    platilloId: number | null
  }

  export type HistorialModificacionSumAggregateOutputType = {
    id: number | null
    responsableId: number | null
    usuarioId: number | null
    platilloId: number | null
  }

  export type HistorialModificacionMinAggregateOutputType = {
    id: number | null
    campo: string | null
    valorAnterior: string | null
    valorNuevo: string | null
    fecha: Date | null
    accion: string | null
    responsableId: number | null
    usuarioId: number | null
    platilloId: number | null
  }

  export type HistorialModificacionMaxAggregateOutputType = {
    id: number | null
    campo: string | null
    valorAnterior: string | null
    valorNuevo: string | null
    fecha: Date | null
    accion: string | null
    responsableId: number | null
    usuarioId: number | null
    platilloId: number | null
  }

  export type HistorialModificacionCountAggregateOutputType = {
    id: number
    campo: number
    valorAnterior: number
    valorNuevo: number
    fecha: number
    accion: number
    responsableId: number
    usuarioId: number
    platilloId: number
    _all: number
  }


  export type HistorialModificacionAvgAggregateInputType = {
    id?: true
    responsableId?: true
    usuarioId?: true
    platilloId?: true
  }

  export type HistorialModificacionSumAggregateInputType = {
    id?: true
    responsableId?: true
    usuarioId?: true
    platilloId?: true
  }

  export type HistorialModificacionMinAggregateInputType = {
    id?: true
    campo?: true
    valorAnterior?: true
    valorNuevo?: true
    fecha?: true
    accion?: true
    responsableId?: true
    usuarioId?: true
    platilloId?: true
  }

  export type HistorialModificacionMaxAggregateInputType = {
    id?: true
    campo?: true
    valorAnterior?: true
    valorNuevo?: true
    fecha?: true
    accion?: true
    responsableId?: true
    usuarioId?: true
    platilloId?: true
  }

  export type HistorialModificacionCountAggregateInputType = {
    id?: true
    campo?: true
    valorAnterior?: true
    valorNuevo?: true
    fecha?: true
    accion?: true
    responsableId?: true
    usuarioId?: true
    platilloId?: true
    _all?: true
  }

  export type HistorialModificacionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistorialModificacion to aggregate.
     */
    where?: HistorialModificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialModificacions to fetch.
     */
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistorialModificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialModificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialModificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HistorialModificacions
    **/
    _count?: true | HistorialModificacionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HistorialModificacionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HistorialModificacionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistorialModificacionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistorialModificacionMaxAggregateInputType
  }

  export type GetHistorialModificacionAggregateType<T extends HistorialModificacionAggregateArgs> = {
        [P in keyof T & keyof AggregateHistorialModificacion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistorialModificacion[P]>
      : GetScalarType<T[P], AggregateHistorialModificacion[P]>
  }




  export type HistorialModificacionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialModificacionWhereInput
    orderBy?: HistorialModificacionOrderByWithAggregationInput | HistorialModificacionOrderByWithAggregationInput[]
    by: HistorialModificacionScalarFieldEnum[] | HistorialModificacionScalarFieldEnum
    having?: HistorialModificacionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistorialModificacionCountAggregateInputType | true
    _avg?: HistorialModificacionAvgAggregateInputType
    _sum?: HistorialModificacionSumAggregateInputType
    _min?: HistorialModificacionMinAggregateInputType
    _max?: HistorialModificacionMaxAggregateInputType
  }

  export type HistorialModificacionGroupByOutputType = {
    id: number
    campo: string
    valorAnterior: string | null
    valorNuevo: string | null
    fecha: Date
    accion: string
    responsableId: number
    usuarioId: number | null
    platilloId: number | null
    _count: HistorialModificacionCountAggregateOutputType | null
    _avg: HistorialModificacionAvgAggregateOutputType | null
    _sum: HistorialModificacionSumAggregateOutputType | null
    _min: HistorialModificacionMinAggregateOutputType | null
    _max: HistorialModificacionMaxAggregateOutputType | null
  }

  type GetHistorialModificacionGroupByPayload<T extends HistorialModificacionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HistorialModificacionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistorialModificacionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistorialModificacionGroupByOutputType[P]>
            : GetScalarType<T[P], HistorialModificacionGroupByOutputType[P]>
        }
      >
    >


  export type HistorialModificacionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campo?: boolean
    valorAnterior?: boolean
    valorNuevo?: boolean
    fecha?: boolean
    accion?: boolean
    responsableId?: boolean
    usuarioId?: boolean
    platilloId?: boolean
    responsable?: boolean | UsuarioDefaultArgs<ExtArgs>
    usuario?: boolean | HistorialModificacion$usuarioArgs<ExtArgs>
    platillo?: boolean | HistorialModificacion$platilloArgs<ExtArgs>
  }, ExtArgs["result"]["historialModificacion"]>

  export type HistorialModificacionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campo?: boolean
    valorAnterior?: boolean
    valorNuevo?: boolean
    fecha?: boolean
    accion?: boolean
    responsableId?: boolean
    usuarioId?: boolean
    platilloId?: boolean
    responsable?: boolean | UsuarioDefaultArgs<ExtArgs>
    usuario?: boolean | HistorialModificacion$usuarioArgs<ExtArgs>
    platillo?: boolean | HistorialModificacion$platilloArgs<ExtArgs>
  }, ExtArgs["result"]["historialModificacion"]>

  export type HistorialModificacionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campo?: boolean
    valorAnterior?: boolean
    valorNuevo?: boolean
    fecha?: boolean
    accion?: boolean
    responsableId?: boolean
    usuarioId?: boolean
    platilloId?: boolean
    responsable?: boolean | UsuarioDefaultArgs<ExtArgs>
    usuario?: boolean | HistorialModificacion$usuarioArgs<ExtArgs>
    platillo?: boolean | HistorialModificacion$platilloArgs<ExtArgs>
  }, ExtArgs["result"]["historialModificacion"]>

  export type HistorialModificacionSelectScalar = {
    id?: boolean
    campo?: boolean
    valorAnterior?: boolean
    valorNuevo?: boolean
    fecha?: boolean
    accion?: boolean
    responsableId?: boolean
    usuarioId?: boolean
    platilloId?: boolean
  }

  export type HistorialModificacionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campo" | "valorAnterior" | "valorNuevo" | "fecha" | "accion" | "responsableId" | "usuarioId" | "platilloId", ExtArgs["result"]["historialModificacion"]>
  export type HistorialModificacionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responsable?: boolean | UsuarioDefaultArgs<ExtArgs>
    usuario?: boolean | HistorialModificacion$usuarioArgs<ExtArgs>
    platillo?: boolean | HistorialModificacion$platilloArgs<ExtArgs>
  }
  export type HistorialModificacionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responsable?: boolean | UsuarioDefaultArgs<ExtArgs>
    usuario?: boolean | HistorialModificacion$usuarioArgs<ExtArgs>
    platillo?: boolean | HistorialModificacion$platilloArgs<ExtArgs>
  }
  export type HistorialModificacionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responsable?: boolean | UsuarioDefaultArgs<ExtArgs>
    usuario?: boolean | HistorialModificacion$usuarioArgs<ExtArgs>
    platillo?: boolean | HistorialModificacion$platilloArgs<ExtArgs>
  }

  export type $HistorialModificacionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HistorialModificacion"
    objects: {
      responsable: Prisma.$UsuarioPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs> | null
      platillo: Prisma.$PlatilloPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      campo: string
      valorAnterior: string | null
      valorNuevo: string | null
      fecha: Date
      accion: string
      responsableId: number
      usuarioId: number | null
      platilloId: number | null
    }, ExtArgs["result"]["historialModificacion"]>
    composites: {}
  }

  type HistorialModificacionGetPayload<S extends boolean | null | undefined | HistorialModificacionDefaultArgs> = $Result.GetResult<Prisma.$HistorialModificacionPayload, S>

  type HistorialModificacionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HistorialModificacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HistorialModificacionCountAggregateInputType | true
    }

  export interface HistorialModificacionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HistorialModificacion'], meta: { name: 'HistorialModificacion' } }
    /**
     * Find zero or one HistorialModificacion that matches the filter.
     * @param {HistorialModificacionFindUniqueArgs} args - Arguments to find a HistorialModificacion
     * @example
     * // Get one HistorialModificacion
     * const historialModificacion = await prisma.historialModificacion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HistorialModificacionFindUniqueArgs>(args: SelectSubset<T, HistorialModificacionFindUniqueArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HistorialModificacion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HistorialModificacionFindUniqueOrThrowArgs} args - Arguments to find a HistorialModificacion
     * @example
     * // Get one HistorialModificacion
     * const historialModificacion = await prisma.historialModificacion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HistorialModificacionFindUniqueOrThrowArgs>(args: SelectSubset<T, HistorialModificacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistorialModificacion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionFindFirstArgs} args - Arguments to find a HistorialModificacion
     * @example
     * // Get one HistorialModificacion
     * const historialModificacion = await prisma.historialModificacion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HistorialModificacionFindFirstArgs>(args?: SelectSubset<T, HistorialModificacionFindFirstArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistorialModificacion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionFindFirstOrThrowArgs} args - Arguments to find a HistorialModificacion
     * @example
     * // Get one HistorialModificacion
     * const historialModificacion = await prisma.historialModificacion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HistorialModificacionFindFirstOrThrowArgs>(args?: SelectSubset<T, HistorialModificacionFindFirstOrThrowArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HistorialModificacions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HistorialModificacions
     * const historialModificacions = await prisma.historialModificacion.findMany()
     * 
     * // Get first 10 HistorialModificacions
     * const historialModificacions = await prisma.historialModificacion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const historialModificacionWithIdOnly = await prisma.historialModificacion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HistorialModificacionFindManyArgs>(args?: SelectSubset<T, HistorialModificacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HistorialModificacion.
     * @param {HistorialModificacionCreateArgs} args - Arguments to create a HistorialModificacion.
     * @example
     * // Create one HistorialModificacion
     * const HistorialModificacion = await prisma.historialModificacion.create({
     *   data: {
     *     // ... data to create a HistorialModificacion
     *   }
     * })
     * 
     */
    create<T extends HistorialModificacionCreateArgs>(args: SelectSubset<T, HistorialModificacionCreateArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HistorialModificacions.
     * @param {HistorialModificacionCreateManyArgs} args - Arguments to create many HistorialModificacions.
     * @example
     * // Create many HistorialModificacions
     * const historialModificacion = await prisma.historialModificacion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HistorialModificacionCreateManyArgs>(args?: SelectSubset<T, HistorialModificacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HistorialModificacions and returns the data saved in the database.
     * @param {HistorialModificacionCreateManyAndReturnArgs} args - Arguments to create many HistorialModificacions.
     * @example
     * // Create many HistorialModificacions
     * const historialModificacion = await prisma.historialModificacion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HistorialModificacions and only return the `id`
     * const historialModificacionWithIdOnly = await prisma.historialModificacion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HistorialModificacionCreateManyAndReturnArgs>(args?: SelectSubset<T, HistorialModificacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HistorialModificacion.
     * @param {HistorialModificacionDeleteArgs} args - Arguments to delete one HistorialModificacion.
     * @example
     * // Delete one HistorialModificacion
     * const HistorialModificacion = await prisma.historialModificacion.delete({
     *   where: {
     *     // ... filter to delete one HistorialModificacion
     *   }
     * })
     * 
     */
    delete<T extends HistorialModificacionDeleteArgs>(args: SelectSubset<T, HistorialModificacionDeleteArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HistorialModificacion.
     * @param {HistorialModificacionUpdateArgs} args - Arguments to update one HistorialModificacion.
     * @example
     * // Update one HistorialModificacion
     * const historialModificacion = await prisma.historialModificacion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HistorialModificacionUpdateArgs>(args: SelectSubset<T, HistorialModificacionUpdateArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HistorialModificacions.
     * @param {HistorialModificacionDeleteManyArgs} args - Arguments to filter HistorialModificacions to delete.
     * @example
     * // Delete a few HistorialModificacions
     * const { count } = await prisma.historialModificacion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HistorialModificacionDeleteManyArgs>(args?: SelectSubset<T, HistorialModificacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistorialModificacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HistorialModificacions
     * const historialModificacion = await prisma.historialModificacion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HistorialModificacionUpdateManyArgs>(args: SelectSubset<T, HistorialModificacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistorialModificacions and returns the data updated in the database.
     * @param {HistorialModificacionUpdateManyAndReturnArgs} args - Arguments to update many HistorialModificacions.
     * @example
     * // Update many HistorialModificacions
     * const historialModificacion = await prisma.historialModificacion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HistorialModificacions and only return the `id`
     * const historialModificacionWithIdOnly = await prisma.historialModificacion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HistorialModificacionUpdateManyAndReturnArgs>(args: SelectSubset<T, HistorialModificacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HistorialModificacion.
     * @param {HistorialModificacionUpsertArgs} args - Arguments to update or create a HistorialModificacion.
     * @example
     * // Update or create a HistorialModificacion
     * const historialModificacion = await prisma.historialModificacion.upsert({
     *   create: {
     *     // ... data to create a HistorialModificacion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HistorialModificacion we want to update
     *   }
     * })
     */
    upsert<T extends HistorialModificacionUpsertArgs>(args: SelectSubset<T, HistorialModificacionUpsertArgs<ExtArgs>>): Prisma__HistorialModificacionClient<$Result.GetResult<Prisma.$HistorialModificacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HistorialModificacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionCountArgs} args - Arguments to filter HistorialModificacions to count.
     * @example
     * // Count the number of HistorialModificacions
     * const count = await prisma.historialModificacion.count({
     *   where: {
     *     // ... the filter for the HistorialModificacions we want to count
     *   }
     * })
    **/
    count<T extends HistorialModificacionCountArgs>(
      args?: Subset<T, HistorialModificacionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistorialModificacionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HistorialModificacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HistorialModificacionAggregateArgs>(args: Subset<T, HistorialModificacionAggregateArgs>): Prisma.PrismaPromise<GetHistorialModificacionAggregateType<T>>

    /**
     * Group by HistorialModificacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialModificacionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HistorialModificacionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistorialModificacionGroupByArgs['orderBy'] }
        : { orderBy?: HistorialModificacionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HistorialModificacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistorialModificacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HistorialModificacion model
   */
  readonly fields: HistorialModificacionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HistorialModificacion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HistorialModificacionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    responsable<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends HistorialModificacion$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, HistorialModificacion$usuarioArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    platillo<T extends HistorialModificacion$platilloArgs<ExtArgs> = {}>(args?: Subset<T, HistorialModificacion$platilloArgs<ExtArgs>>): Prisma__PlatilloClient<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HistorialModificacion model
   */
  interface HistorialModificacionFieldRefs {
    readonly id: FieldRef<"HistorialModificacion", 'Int'>
    readonly campo: FieldRef<"HistorialModificacion", 'String'>
    readonly valorAnterior: FieldRef<"HistorialModificacion", 'String'>
    readonly valorNuevo: FieldRef<"HistorialModificacion", 'String'>
    readonly fecha: FieldRef<"HistorialModificacion", 'DateTime'>
    readonly accion: FieldRef<"HistorialModificacion", 'String'>
    readonly responsableId: FieldRef<"HistorialModificacion", 'Int'>
    readonly usuarioId: FieldRef<"HistorialModificacion", 'Int'>
    readonly platilloId: FieldRef<"HistorialModificacion", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * HistorialModificacion findUnique
   */
  export type HistorialModificacionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * Filter, which HistorialModificacion to fetch.
     */
    where: HistorialModificacionWhereUniqueInput
  }

  /**
   * HistorialModificacion findUniqueOrThrow
   */
  export type HistorialModificacionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * Filter, which HistorialModificacion to fetch.
     */
    where: HistorialModificacionWhereUniqueInput
  }

  /**
   * HistorialModificacion findFirst
   */
  export type HistorialModificacionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * Filter, which HistorialModificacion to fetch.
     */
    where?: HistorialModificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialModificacions to fetch.
     */
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistorialModificacions.
     */
    cursor?: HistorialModificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialModificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialModificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistorialModificacions.
     */
    distinct?: HistorialModificacionScalarFieldEnum | HistorialModificacionScalarFieldEnum[]
  }

  /**
   * HistorialModificacion findFirstOrThrow
   */
  export type HistorialModificacionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * Filter, which HistorialModificacion to fetch.
     */
    where?: HistorialModificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialModificacions to fetch.
     */
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistorialModificacions.
     */
    cursor?: HistorialModificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialModificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialModificacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistorialModificacions.
     */
    distinct?: HistorialModificacionScalarFieldEnum | HistorialModificacionScalarFieldEnum[]
  }

  /**
   * HistorialModificacion findMany
   */
  export type HistorialModificacionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * Filter, which HistorialModificacions to fetch.
     */
    where?: HistorialModificacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialModificacions to fetch.
     */
    orderBy?: HistorialModificacionOrderByWithRelationInput | HistorialModificacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HistorialModificacions.
     */
    cursor?: HistorialModificacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialModificacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialModificacions.
     */
    skip?: number
    distinct?: HistorialModificacionScalarFieldEnum | HistorialModificacionScalarFieldEnum[]
  }

  /**
   * HistorialModificacion create
   */
  export type HistorialModificacionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * The data needed to create a HistorialModificacion.
     */
    data: XOR<HistorialModificacionCreateInput, HistorialModificacionUncheckedCreateInput>
  }

  /**
   * HistorialModificacion createMany
   */
  export type HistorialModificacionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HistorialModificacions.
     */
    data: HistorialModificacionCreateManyInput | HistorialModificacionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HistorialModificacion createManyAndReturn
   */
  export type HistorialModificacionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * The data used to create many HistorialModificacions.
     */
    data: HistorialModificacionCreateManyInput | HistorialModificacionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistorialModificacion update
   */
  export type HistorialModificacionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * The data needed to update a HistorialModificacion.
     */
    data: XOR<HistorialModificacionUpdateInput, HistorialModificacionUncheckedUpdateInput>
    /**
     * Choose, which HistorialModificacion to update.
     */
    where: HistorialModificacionWhereUniqueInput
  }

  /**
   * HistorialModificacion updateMany
   */
  export type HistorialModificacionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HistorialModificacions.
     */
    data: XOR<HistorialModificacionUpdateManyMutationInput, HistorialModificacionUncheckedUpdateManyInput>
    /**
     * Filter which HistorialModificacions to update
     */
    where?: HistorialModificacionWhereInput
    /**
     * Limit how many HistorialModificacions to update.
     */
    limit?: number
  }

  /**
   * HistorialModificacion updateManyAndReturn
   */
  export type HistorialModificacionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * The data used to update HistorialModificacions.
     */
    data: XOR<HistorialModificacionUpdateManyMutationInput, HistorialModificacionUncheckedUpdateManyInput>
    /**
     * Filter which HistorialModificacions to update
     */
    where?: HistorialModificacionWhereInput
    /**
     * Limit how many HistorialModificacions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistorialModificacion upsert
   */
  export type HistorialModificacionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * The filter to search for the HistorialModificacion to update in case it exists.
     */
    where: HistorialModificacionWhereUniqueInput
    /**
     * In case the HistorialModificacion found by the `where` argument doesn't exist, create a new HistorialModificacion with this data.
     */
    create: XOR<HistorialModificacionCreateInput, HistorialModificacionUncheckedCreateInput>
    /**
     * In case the HistorialModificacion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistorialModificacionUpdateInput, HistorialModificacionUncheckedUpdateInput>
  }

  /**
   * HistorialModificacion delete
   */
  export type HistorialModificacionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
    /**
     * Filter which HistorialModificacion to delete.
     */
    where: HistorialModificacionWhereUniqueInput
  }

  /**
   * HistorialModificacion deleteMany
   */
  export type HistorialModificacionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistorialModificacions to delete
     */
    where?: HistorialModificacionWhereInput
    /**
     * Limit how many HistorialModificacions to delete.
     */
    limit?: number
  }

  /**
   * HistorialModificacion.usuario
   */
  export type HistorialModificacion$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * HistorialModificacion.platillo
   */
  export type HistorialModificacion$platilloArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    where?: PlatilloWhereInput
  }

  /**
   * HistorialModificacion without action
   */
  export type HistorialModificacionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialModificacion
     */
    select?: HistorialModificacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialModificacion
     */
    omit?: HistorialModificacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialModificacionInclude<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaAvgAggregateOutputType = {
    id: number | null
  }

  export type CategoriaSumAggregateOutputType = {
    id: number | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    creadoEn: Date | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    creadoEn: Date | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    nombre: number
    creadoEn: number
    _all: number
  }


  export type CategoriaAvgAggregateInputType = {
    id?: true
  }

  export type CategoriaSumAggregateInputType = {
    id?: true
  }

  export type CategoriaMinAggregateInputType = {
    id?: true
    nombre?: true
    creadoEn?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    nombre?: true
    creadoEn?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    nombre?: true
    creadoEn?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _avg?: CategoriaAvgAggregateInputType
    _sum?: CategoriaSumAggregateInputType
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: number
    nombre: string
    creadoEn: Date
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    creadoEn?: boolean
    platillos?: boolean | Categoria$platillosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    nombre?: boolean
    creadoEn?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "creadoEn", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platillos?: boolean | Categoria$platillosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      platillos: Prisma.$PlatilloPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      creadoEn: Date
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platillos<T extends Categoria$platillosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$platillosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatilloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'Int'>
    readonly nombre: FieldRef<"Categoria", 'String'>
    readonly creadoEn: FieldRef<"Categoria", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria.platillos
   */
  export type Categoria$platillosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Platillo
     */
    select?: PlatilloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Platillo
     */
    omit?: PlatilloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatilloInclude<ExtArgs> | null
    where?: PlatilloWhereInput
    orderBy?: PlatilloOrderByWithRelationInput | PlatilloOrderByWithRelationInput[]
    cursor?: PlatilloWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlatilloScalarFieldEnum | PlatilloScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    usuario: 'usuario',
    correo: 'correo',
    contrasena: 'contrasena',
    estado: 'estado',
    creadoEn: 'creadoEn',
    actualizadoEn: 'actualizadoEn',
    rolId: 'rolId'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const PlatilloScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    precio: 'precio',
    creadoEn: 'creadoEn',
    disponible: 'disponible',
    categoriaId: 'categoriaId'
  };

  export type PlatilloScalarFieldEnum = (typeof PlatilloScalarFieldEnum)[keyof typeof PlatilloScalarFieldEnum]


  export const RolScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type RolScalarFieldEnum = (typeof RolScalarFieldEnum)[keyof typeof RolScalarFieldEnum]


  export const HistorialModificacionScalarFieldEnum: {
    id: 'id',
    campo: 'campo',
    valorAnterior: 'valorAnterior',
    valorNuevo: 'valorNuevo',
    fecha: 'fecha',
    accion: 'accion',
    responsableId: 'responsableId',
    usuarioId: 'usuarioId',
    platilloId: 'platilloId'
  };

  export type HistorialModificacionScalarFieldEnum = (typeof HistorialModificacionScalarFieldEnum)[keyof typeof HistorialModificacionScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    creadoEn: 'creadoEn'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    usuario?: StringFilter<"Usuario"> | string
    correo?: StringFilter<"Usuario"> | string
    contrasena?: StringFilter<"Usuario"> | string
    estado?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    actualizadoEn?: DateTimeFilter<"Usuario"> | Date | string
    rolId?: IntFilter<"Usuario"> | number
    rol?: XOR<RolScalarRelationFilter, RolWhereInput>
    historialModificaciones?: HistorialModificacionListRelationFilter
    historialResponsable?: HistorialModificacionListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuario?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    rolId?: SortOrder
    rol?: RolOrderByWithRelationInput
    historialModificaciones?: HistorialModificacionOrderByRelationAggregateInput
    historialResponsable?: HistorialModificacionOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    usuario?: string
    correo?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    contrasena?: StringFilter<"Usuario"> | string
    estado?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    actualizadoEn?: DateTimeFilter<"Usuario"> | Date | string
    rolId?: IntFilter<"Usuario"> | number
    rol?: XOR<RolScalarRelationFilter, RolWhereInput>
    historialModificaciones?: HistorialModificacionListRelationFilter
    historialResponsable?: HistorialModificacionListRelationFilter
  }, "id" | "usuario" | "correo">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuario?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    rolId?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    usuario?: StringWithAggregatesFilter<"Usuario"> | string
    correo?: StringWithAggregatesFilter<"Usuario"> | string
    contrasena?: StringWithAggregatesFilter<"Usuario"> | string
    estado?: BoolWithAggregatesFilter<"Usuario"> | boolean
    creadoEn?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    actualizadoEn?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    rolId?: IntWithAggregatesFilter<"Usuario"> | number
  }

  export type PlatilloWhereInput = {
    AND?: PlatilloWhereInput | PlatilloWhereInput[]
    OR?: PlatilloWhereInput[]
    NOT?: PlatilloWhereInput | PlatilloWhereInput[]
    id?: IntFilter<"Platillo"> | number
    nombre?: StringFilter<"Platillo"> | string
    precio?: FloatFilter<"Platillo"> | number
    creadoEn?: DateTimeFilter<"Platillo"> | Date | string
    disponible?: BoolFilter<"Platillo"> | boolean
    categoriaId?: IntFilter<"Platillo"> | number
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    historialModificaciones?: HistorialModificacionListRelationFilter
  }

  export type PlatilloOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    creadoEn?: SortOrder
    disponible?: SortOrder
    categoriaId?: SortOrder
    categoria?: CategoriaOrderByWithRelationInput
    historialModificaciones?: HistorialModificacionOrderByRelationAggregateInput
  }

  export type PlatilloWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: PlatilloWhereInput | PlatilloWhereInput[]
    OR?: PlatilloWhereInput[]
    NOT?: PlatilloWhereInput | PlatilloWhereInput[]
    precio?: FloatFilter<"Platillo"> | number
    creadoEn?: DateTimeFilter<"Platillo"> | Date | string
    disponible?: BoolFilter<"Platillo"> | boolean
    categoriaId?: IntFilter<"Platillo"> | number
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    historialModificaciones?: HistorialModificacionListRelationFilter
  }, "id" | "nombre">

  export type PlatilloOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    creadoEn?: SortOrder
    disponible?: SortOrder
    categoriaId?: SortOrder
    _count?: PlatilloCountOrderByAggregateInput
    _avg?: PlatilloAvgOrderByAggregateInput
    _max?: PlatilloMaxOrderByAggregateInput
    _min?: PlatilloMinOrderByAggregateInput
    _sum?: PlatilloSumOrderByAggregateInput
  }

  export type PlatilloScalarWhereWithAggregatesInput = {
    AND?: PlatilloScalarWhereWithAggregatesInput | PlatilloScalarWhereWithAggregatesInput[]
    OR?: PlatilloScalarWhereWithAggregatesInput[]
    NOT?: PlatilloScalarWhereWithAggregatesInput | PlatilloScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Platillo"> | number
    nombre?: StringWithAggregatesFilter<"Platillo"> | string
    precio?: FloatWithAggregatesFilter<"Platillo"> | number
    creadoEn?: DateTimeWithAggregatesFilter<"Platillo"> | Date | string
    disponible?: BoolWithAggregatesFilter<"Platillo"> | boolean
    categoriaId?: IntWithAggregatesFilter<"Platillo"> | number
  }

  export type RolWhereInput = {
    AND?: RolWhereInput | RolWhereInput[]
    OR?: RolWhereInput[]
    NOT?: RolWhereInput | RolWhereInput[]
    id?: IntFilter<"Rol"> | number
    nombre?: StringFilter<"Rol"> | string
    usuarios?: UsuarioListRelationFilter
  }

  export type RolOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuarios?: UsuarioOrderByRelationAggregateInput
  }

  export type RolWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: RolWhereInput | RolWhereInput[]
    OR?: RolWhereInput[]
    NOT?: RolWhereInput | RolWhereInput[]
    usuarios?: UsuarioListRelationFilter
  }, "id" | "nombre">

  export type RolOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    _count?: RolCountOrderByAggregateInput
    _avg?: RolAvgOrderByAggregateInput
    _max?: RolMaxOrderByAggregateInput
    _min?: RolMinOrderByAggregateInput
    _sum?: RolSumOrderByAggregateInput
  }

  export type RolScalarWhereWithAggregatesInput = {
    AND?: RolScalarWhereWithAggregatesInput | RolScalarWhereWithAggregatesInput[]
    OR?: RolScalarWhereWithAggregatesInput[]
    NOT?: RolScalarWhereWithAggregatesInput | RolScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Rol"> | number
    nombre?: StringWithAggregatesFilter<"Rol"> | string
  }

  export type HistorialModificacionWhereInput = {
    AND?: HistorialModificacionWhereInput | HistorialModificacionWhereInput[]
    OR?: HistorialModificacionWhereInput[]
    NOT?: HistorialModificacionWhereInput | HistorialModificacionWhereInput[]
    id?: IntFilter<"HistorialModificacion"> | number
    campo?: StringFilter<"HistorialModificacion"> | string
    valorAnterior?: StringNullableFilter<"HistorialModificacion"> | string | null
    valorNuevo?: StringNullableFilter<"HistorialModificacion"> | string | null
    fecha?: DateTimeFilter<"HistorialModificacion"> | Date | string
    accion?: StringFilter<"HistorialModificacion"> | string
    responsableId?: IntFilter<"HistorialModificacion"> | number
    usuarioId?: IntNullableFilter<"HistorialModificacion"> | number | null
    platilloId?: IntNullableFilter<"HistorialModificacion"> | number | null
    responsable?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
    platillo?: XOR<PlatilloNullableScalarRelationFilter, PlatilloWhereInput> | null
  }

  export type HistorialModificacionOrderByWithRelationInput = {
    id?: SortOrder
    campo?: SortOrder
    valorAnterior?: SortOrderInput | SortOrder
    valorNuevo?: SortOrderInput | SortOrder
    fecha?: SortOrder
    accion?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrderInput | SortOrder
    platilloId?: SortOrderInput | SortOrder
    responsable?: UsuarioOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
    platillo?: PlatilloOrderByWithRelationInput
  }

  export type HistorialModificacionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HistorialModificacionWhereInput | HistorialModificacionWhereInput[]
    OR?: HistorialModificacionWhereInput[]
    NOT?: HistorialModificacionWhereInput | HistorialModificacionWhereInput[]
    campo?: StringFilter<"HistorialModificacion"> | string
    valorAnterior?: StringNullableFilter<"HistorialModificacion"> | string | null
    valorNuevo?: StringNullableFilter<"HistorialModificacion"> | string | null
    fecha?: DateTimeFilter<"HistorialModificacion"> | Date | string
    accion?: StringFilter<"HistorialModificacion"> | string
    responsableId?: IntFilter<"HistorialModificacion"> | number
    usuarioId?: IntNullableFilter<"HistorialModificacion"> | number | null
    platilloId?: IntNullableFilter<"HistorialModificacion"> | number | null
    responsable?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
    platillo?: XOR<PlatilloNullableScalarRelationFilter, PlatilloWhereInput> | null
  }, "id">

  export type HistorialModificacionOrderByWithAggregationInput = {
    id?: SortOrder
    campo?: SortOrder
    valorAnterior?: SortOrderInput | SortOrder
    valorNuevo?: SortOrderInput | SortOrder
    fecha?: SortOrder
    accion?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrderInput | SortOrder
    platilloId?: SortOrderInput | SortOrder
    _count?: HistorialModificacionCountOrderByAggregateInput
    _avg?: HistorialModificacionAvgOrderByAggregateInput
    _max?: HistorialModificacionMaxOrderByAggregateInput
    _min?: HistorialModificacionMinOrderByAggregateInput
    _sum?: HistorialModificacionSumOrderByAggregateInput
  }

  export type HistorialModificacionScalarWhereWithAggregatesInput = {
    AND?: HistorialModificacionScalarWhereWithAggregatesInput | HistorialModificacionScalarWhereWithAggregatesInput[]
    OR?: HistorialModificacionScalarWhereWithAggregatesInput[]
    NOT?: HistorialModificacionScalarWhereWithAggregatesInput | HistorialModificacionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HistorialModificacion"> | number
    campo?: StringWithAggregatesFilter<"HistorialModificacion"> | string
    valorAnterior?: StringNullableWithAggregatesFilter<"HistorialModificacion"> | string | null
    valorNuevo?: StringNullableWithAggregatesFilter<"HistorialModificacion"> | string | null
    fecha?: DateTimeWithAggregatesFilter<"HistorialModificacion"> | Date | string
    accion?: StringWithAggregatesFilter<"HistorialModificacion"> | string
    responsableId?: IntWithAggregatesFilter<"HistorialModificacion"> | number
    usuarioId?: IntNullableWithAggregatesFilter<"HistorialModificacion"> | number | null
    platilloId?: IntNullableWithAggregatesFilter<"HistorialModificacion"> | number | null
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: IntFilter<"Categoria"> | number
    nombre?: StringFilter<"Categoria"> | string
    creadoEn?: DateTimeFilter<"Categoria"> | Date | string
    platillos?: PlatilloListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    creadoEn?: SortOrder
    platillos?: PlatilloOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    creadoEn?: DateTimeFilter<"Categoria"> | Date | string
    platillos?: PlatilloListRelationFilter
  }, "id" | "nombre">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    creadoEn?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _avg?: CategoriaAvgOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
    _sum?: CategoriaSumOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Categoria"> | number
    nombre?: StringWithAggregatesFilter<"Categoria"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
  }

  export type UsuarioCreateInput = {
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rol: RolCreateNestedOneWithoutUsuariosInput
    historialModificaciones?: HistorialModificacionCreateNestedManyWithoutUsuarioInput
    historialResponsable?: HistorialModificacionCreateNestedManyWithoutResponsableInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rolId: number
    historialModificaciones?: HistorialModificacionUncheckedCreateNestedManyWithoutUsuarioInput
    historialResponsable?: HistorialModificacionUncheckedCreateNestedManyWithoutResponsableInput
  }

  export type UsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rol?: RolUpdateOneRequiredWithoutUsuariosNestedInput
    historialModificaciones?: HistorialModificacionUpdateManyWithoutUsuarioNestedInput
    historialResponsable?: HistorialModificacionUpdateManyWithoutResponsableNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rolId?: IntFieldUpdateOperationsInput | number
    historialModificaciones?: HistorialModificacionUncheckedUpdateManyWithoutUsuarioNestedInput
    historialResponsable?: HistorialModificacionUncheckedUpdateManyWithoutResponsableNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rolId: number
  }

  export type UsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rolId?: IntFieldUpdateOperationsInput | number
  }

  export type PlatilloCreateInput = {
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    categoria: CategoriaCreateNestedOneWithoutPlatillosInput
    historialModificaciones?: HistorialModificacionCreateNestedManyWithoutPlatilloInput
  }

  export type PlatilloUncheckedCreateInput = {
    id?: number
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    categoriaId: number
    historialModificaciones?: HistorialModificacionUncheckedCreateNestedManyWithoutPlatilloInput
  }

  export type PlatilloUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    categoria?: CategoriaUpdateOneRequiredWithoutPlatillosNestedInput
    historialModificaciones?: HistorialModificacionUpdateManyWithoutPlatilloNestedInput
  }

  export type PlatilloUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    historialModificaciones?: HistorialModificacionUncheckedUpdateManyWithoutPlatilloNestedInput
  }

  export type PlatilloCreateManyInput = {
    id?: number
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    categoriaId: number
  }

  export type PlatilloUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlatilloUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
  }

  export type RolCreateInput = {
    nombre: string
    usuarios?: UsuarioCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateInput = {
    id?: number
    nombre: string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuarios?: UsuarioUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutRolNestedInput
  }

  export type RolCreateManyInput = {
    id?: number
    nombre: string
  }

  export type RolUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type RolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type HistorialModificacionCreateInput = {
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsable: UsuarioCreateNestedOneWithoutHistorialResponsableInput
    usuario?: UsuarioCreateNestedOneWithoutHistorialModificacionesInput
    platillo?: PlatilloCreateNestedOneWithoutHistorialModificacionesInput
  }

  export type HistorialModificacionUncheckedCreateInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsableId: number
    usuarioId?: number | null
    platilloId?: number | null
  }

  export type HistorialModificacionUpdateInput = {
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsable?: UsuarioUpdateOneRequiredWithoutHistorialResponsableNestedInput
    usuario?: UsuarioUpdateOneWithoutHistorialModificacionesNestedInput
    platillo?: PlatilloUpdateOneWithoutHistorialModificacionesNestedInput
  }

  export type HistorialModificacionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsableId?: IntFieldUpdateOperationsInput | number
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    platilloId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialModificacionCreateManyInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsableId: number
    usuarioId?: number | null
    platilloId?: number | null
  }

  export type HistorialModificacionUpdateManyMutationInput = {
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
  }

  export type HistorialModificacionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsableId?: IntFieldUpdateOperationsInput | number
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    platilloId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CategoriaCreateInput = {
    nombre: string
    creadoEn?: Date | string
    platillos?: PlatilloCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: number
    nombre: string
    creadoEn?: Date | string
    platillos?: PlatilloUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    platillos?: PlatilloUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    platillos?: PlatilloUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id?: number
    nombre: string
    creadoEn?: Date | string
  }

  export type CategoriaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RolScalarRelationFilter = {
    is?: RolWhereInput
    isNot?: RolWhereInput
  }

  export type HistorialModificacionListRelationFilter = {
    every?: HistorialModificacionWhereInput
    some?: HistorialModificacionWhereInput
    none?: HistorialModificacionWhereInput
  }

  export type HistorialModificacionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuario?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    rolId?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuario?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    rolId?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    usuario?: SortOrder
    correo?: SortOrder
    contrasena?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    rolId?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput
    isNot?: CategoriaWhereInput
  }

  export type PlatilloCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    creadoEn?: SortOrder
    disponible?: SortOrder
    categoriaId?: SortOrder
  }

  export type PlatilloAvgOrderByAggregateInput = {
    id?: SortOrder
    precio?: SortOrder
    categoriaId?: SortOrder
  }

  export type PlatilloMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    creadoEn?: SortOrder
    disponible?: SortOrder
    categoriaId?: SortOrder
  }

  export type PlatilloMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    creadoEn?: SortOrder
    disponible?: SortOrder
    categoriaId?: SortOrder
  }

  export type PlatilloSumOrderByAggregateInput = {
    id?: SortOrder
    precio?: SortOrder
    categoriaId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RolCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type RolAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type RolMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type RolSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type PlatilloNullableScalarRelationFilter = {
    is?: PlatilloWhereInput | null
    isNot?: PlatilloWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HistorialModificacionCountOrderByAggregateInput = {
    id?: SortOrder
    campo?: SortOrder
    valorAnterior?: SortOrder
    valorNuevo?: SortOrder
    fecha?: SortOrder
    accion?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrder
    platilloId?: SortOrder
  }

  export type HistorialModificacionAvgOrderByAggregateInput = {
    id?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrder
    platilloId?: SortOrder
  }

  export type HistorialModificacionMaxOrderByAggregateInput = {
    id?: SortOrder
    campo?: SortOrder
    valorAnterior?: SortOrder
    valorNuevo?: SortOrder
    fecha?: SortOrder
    accion?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrder
    platilloId?: SortOrder
  }

  export type HistorialModificacionMinOrderByAggregateInput = {
    id?: SortOrder
    campo?: SortOrder
    valorAnterior?: SortOrder
    valorNuevo?: SortOrder
    fecha?: SortOrder
    accion?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrder
    platilloId?: SortOrder
  }

  export type HistorialModificacionSumOrderByAggregateInput = {
    id?: SortOrder
    responsableId?: SortOrder
    usuarioId?: SortOrder
    platilloId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PlatilloListRelationFilter = {
    every?: PlatilloWhereInput
    some?: PlatilloWhereInput
    none?: PlatilloWhereInput
  }

  export type PlatilloOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    creadoEn?: SortOrder
  }

  export type CategoriaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    creadoEn?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    creadoEn?: SortOrder
  }

  export type CategoriaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: RolCreateOrConnectWithoutUsuariosInput
    connect?: RolWhereUniqueInput
  }

  export type HistorialModificacionCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<HistorialModificacionCreateWithoutUsuarioInput, HistorialModificacionUncheckedCreateWithoutUsuarioInput> | HistorialModificacionCreateWithoutUsuarioInput[] | HistorialModificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutUsuarioInput | HistorialModificacionCreateOrConnectWithoutUsuarioInput[]
    createMany?: HistorialModificacionCreateManyUsuarioInputEnvelope
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
  }

  export type HistorialModificacionCreateNestedManyWithoutResponsableInput = {
    create?: XOR<HistorialModificacionCreateWithoutResponsableInput, HistorialModificacionUncheckedCreateWithoutResponsableInput> | HistorialModificacionCreateWithoutResponsableInput[] | HistorialModificacionUncheckedCreateWithoutResponsableInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutResponsableInput | HistorialModificacionCreateOrConnectWithoutResponsableInput[]
    createMany?: HistorialModificacionCreateManyResponsableInputEnvelope
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
  }

  export type HistorialModificacionUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<HistorialModificacionCreateWithoutUsuarioInput, HistorialModificacionUncheckedCreateWithoutUsuarioInput> | HistorialModificacionCreateWithoutUsuarioInput[] | HistorialModificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutUsuarioInput | HistorialModificacionCreateOrConnectWithoutUsuarioInput[]
    createMany?: HistorialModificacionCreateManyUsuarioInputEnvelope
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
  }

  export type HistorialModificacionUncheckedCreateNestedManyWithoutResponsableInput = {
    create?: XOR<HistorialModificacionCreateWithoutResponsableInput, HistorialModificacionUncheckedCreateWithoutResponsableInput> | HistorialModificacionCreateWithoutResponsableInput[] | HistorialModificacionUncheckedCreateWithoutResponsableInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutResponsableInput | HistorialModificacionCreateOrConnectWithoutResponsableInput[]
    createMany?: HistorialModificacionCreateManyResponsableInputEnvelope
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RolUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: RolCreateOrConnectWithoutUsuariosInput
    upsert?: RolUpsertWithoutUsuariosInput
    connect?: RolWhereUniqueInput
    update?: XOR<XOR<RolUpdateToOneWithWhereWithoutUsuariosInput, RolUpdateWithoutUsuariosInput>, RolUncheckedUpdateWithoutUsuariosInput>
  }

  export type HistorialModificacionUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<HistorialModificacionCreateWithoutUsuarioInput, HistorialModificacionUncheckedCreateWithoutUsuarioInput> | HistorialModificacionCreateWithoutUsuarioInput[] | HistorialModificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutUsuarioInput | HistorialModificacionCreateOrConnectWithoutUsuarioInput[]
    upsert?: HistorialModificacionUpsertWithWhereUniqueWithoutUsuarioInput | HistorialModificacionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: HistorialModificacionCreateManyUsuarioInputEnvelope
    set?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    disconnect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    delete?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    update?: HistorialModificacionUpdateWithWhereUniqueWithoutUsuarioInput | HistorialModificacionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: HistorialModificacionUpdateManyWithWhereWithoutUsuarioInput | HistorialModificacionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
  }

  export type HistorialModificacionUpdateManyWithoutResponsableNestedInput = {
    create?: XOR<HistorialModificacionCreateWithoutResponsableInput, HistorialModificacionUncheckedCreateWithoutResponsableInput> | HistorialModificacionCreateWithoutResponsableInput[] | HistorialModificacionUncheckedCreateWithoutResponsableInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutResponsableInput | HistorialModificacionCreateOrConnectWithoutResponsableInput[]
    upsert?: HistorialModificacionUpsertWithWhereUniqueWithoutResponsableInput | HistorialModificacionUpsertWithWhereUniqueWithoutResponsableInput[]
    createMany?: HistorialModificacionCreateManyResponsableInputEnvelope
    set?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    disconnect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    delete?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    update?: HistorialModificacionUpdateWithWhereUniqueWithoutResponsableInput | HistorialModificacionUpdateWithWhereUniqueWithoutResponsableInput[]
    updateMany?: HistorialModificacionUpdateManyWithWhereWithoutResponsableInput | HistorialModificacionUpdateManyWithWhereWithoutResponsableInput[]
    deleteMany?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type HistorialModificacionUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<HistorialModificacionCreateWithoutUsuarioInput, HistorialModificacionUncheckedCreateWithoutUsuarioInput> | HistorialModificacionCreateWithoutUsuarioInput[] | HistorialModificacionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutUsuarioInput | HistorialModificacionCreateOrConnectWithoutUsuarioInput[]
    upsert?: HistorialModificacionUpsertWithWhereUniqueWithoutUsuarioInput | HistorialModificacionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: HistorialModificacionCreateManyUsuarioInputEnvelope
    set?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    disconnect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    delete?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    update?: HistorialModificacionUpdateWithWhereUniqueWithoutUsuarioInput | HistorialModificacionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: HistorialModificacionUpdateManyWithWhereWithoutUsuarioInput | HistorialModificacionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
  }

  export type HistorialModificacionUncheckedUpdateManyWithoutResponsableNestedInput = {
    create?: XOR<HistorialModificacionCreateWithoutResponsableInput, HistorialModificacionUncheckedCreateWithoutResponsableInput> | HistorialModificacionCreateWithoutResponsableInput[] | HistorialModificacionUncheckedCreateWithoutResponsableInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutResponsableInput | HistorialModificacionCreateOrConnectWithoutResponsableInput[]
    upsert?: HistorialModificacionUpsertWithWhereUniqueWithoutResponsableInput | HistorialModificacionUpsertWithWhereUniqueWithoutResponsableInput[]
    createMany?: HistorialModificacionCreateManyResponsableInputEnvelope
    set?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    disconnect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    delete?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    update?: HistorialModificacionUpdateWithWhereUniqueWithoutResponsableInput | HistorialModificacionUpdateWithWhereUniqueWithoutResponsableInput[]
    updateMany?: HistorialModificacionUpdateManyWithWhereWithoutResponsableInput | HistorialModificacionUpdateManyWithWhereWithoutResponsableInput[]
    deleteMany?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
  }

  export type CategoriaCreateNestedOneWithoutPlatillosInput = {
    create?: XOR<CategoriaCreateWithoutPlatillosInput, CategoriaUncheckedCreateWithoutPlatillosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutPlatillosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type HistorialModificacionCreateNestedManyWithoutPlatilloInput = {
    create?: XOR<HistorialModificacionCreateWithoutPlatilloInput, HistorialModificacionUncheckedCreateWithoutPlatilloInput> | HistorialModificacionCreateWithoutPlatilloInput[] | HistorialModificacionUncheckedCreateWithoutPlatilloInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutPlatilloInput | HistorialModificacionCreateOrConnectWithoutPlatilloInput[]
    createMany?: HistorialModificacionCreateManyPlatilloInputEnvelope
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
  }

  export type HistorialModificacionUncheckedCreateNestedManyWithoutPlatilloInput = {
    create?: XOR<HistorialModificacionCreateWithoutPlatilloInput, HistorialModificacionUncheckedCreateWithoutPlatilloInput> | HistorialModificacionCreateWithoutPlatilloInput[] | HistorialModificacionUncheckedCreateWithoutPlatilloInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutPlatilloInput | HistorialModificacionCreateOrConnectWithoutPlatilloInput[]
    createMany?: HistorialModificacionCreateManyPlatilloInputEnvelope
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoriaUpdateOneRequiredWithoutPlatillosNestedInput = {
    create?: XOR<CategoriaCreateWithoutPlatillosInput, CategoriaUncheckedCreateWithoutPlatillosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutPlatillosInput
    upsert?: CategoriaUpsertWithoutPlatillosInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutPlatillosInput, CategoriaUpdateWithoutPlatillosInput>, CategoriaUncheckedUpdateWithoutPlatillosInput>
  }

  export type HistorialModificacionUpdateManyWithoutPlatilloNestedInput = {
    create?: XOR<HistorialModificacionCreateWithoutPlatilloInput, HistorialModificacionUncheckedCreateWithoutPlatilloInput> | HistorialModificacionCreateWithoutPlatilloInput[] | HistorialModificacionUncheckedCreateWithoutPlatilloInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutPlatilloInput | HistorialModificacionCreateOrConnectWithoutPlatilloInput[]
    upsert?: HistorialModificacionUpsertWithWhereUniqueWithoutPlatilloInput | HistorialModificacionUpsertWithWhereUniqueWithoutPlatilloInput[]
    createMany?: HistorialModificacionCreateManyPlatilloInputEnvelope
    set?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    disconnect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    delete?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    update?: HistorialModificacionUpdateWithWhereUniqueWithoutPlatilloInput | HistorialModificacionUpdateWithWhereUniqueWithoutPlatilloInput[]
    updateMany?: HistorialModificacionUpdateManyWithWhereWithoutPlatilloInput | HistorialModificacionUpdateManyWithWhereWithoutPlatilloInput[]
    deleteMany?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
  }

  export type HistorialModificacionUncheckedUpdateManyWithoutPlatilloNestedInput = {
    create?: XOR<HistorialModificacionCreateWithoutPlatilloInput, HistorialModificacionUncheckedCreateWithoutPlatilloInput> | HistorialModificacionCreateWithoutPlatilloInput[] | HistorialModificacionUncheckedCreateWithoutPlatilloInput[]
    connectOrCreate?: HistorialModificacionCreateOrConnectWithoutPlatilloInput | HistorialModificacionCreateOrConnectWithoutPlatilloInput[]
    upsert?: HistorialModificacionUpsertWithWhereUniqueWithoutPlatilloInput | HistorialModificacionUpsertWithWhereUniqueWithoutPlatilloInput[]
    createMany?: HistorialModificacionCreateManyPlatilloInputEnvelope
    set?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    disconnect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    delete?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    connect?: HistorialModificacionWhereUniqueInput | HistorialModificacionWhereUniqueInput[]
    update?: HistorialModificacionUpdateWithWhereUniqueWithoutPlatilloInput | HistorialModificacionUpdateWithWhereUniqueWithoutPlatilloInput[]
    updateMany?: HistorialModificacionUpdateManyWithWhereWithoutPlatilloInput | HistorialModificacionUpdateManyWithWhereWithoutPlatilloInput[]
    deleteMany?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
  }

  export type UsuarioCreateNestedManyWithoutRolInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutRolInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type UsuarioUpdateManyWithoutRolNestedInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutRolInput | UsuarioUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutRolInput | UsuarioUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutRolInput | UsuarioUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutRolNestedInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutRolInput | UsuarioUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutRolInput | UsuarioUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutRolInput | UsuarioUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutHistorialResponsableInput = {
    create?: XOR<UsuarioCreateWithoutHistorialResponsableInput, UsuarioUncheckedCreateWithoutHistorialResponsableInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutHistorialResponsableInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutHistorialModificacionesInput = {
    create?: XOR<UsuarioCreateWithoutHistorialModificacionesInput, UsuarioUncheckedCreateWithoutHistorialModificacionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutHistorialModificacionesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type PlatilloCreateNestedOneWithoutHistorialModificacionesInput = {
    create?: XOR<PlatilloCreateWithoutHistorialModificacionesInput, PlatilloUncheckedCreateWithoutHistorialModificacionesInput>
    connectOrCreate?: PlatilloCreateOrConnectWithoutHistorialModificacionesInput
    connect?: PlatilloWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UsuarioUpdateOneRequiredWithoutHistorialResponsableNestedInput = {
    create?: XOR<UsuarioCreateWithoutHistorialResponsableInput, UsuarioUncheckedCreateWithoutHistorialResponsableInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutHistorialResponsableInput
    upsert?: UsuarioUpsertWithoutHistorialResponsableInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutHistorialResponsableInput, UsuarioUpdateWithoutHistorialResponsableInput>, UsuarioUncheckedUpdateWithoutHistorialResponsableInput>
  }

  export type UsuarioUpdateOneWithoutHistorialModificacionesNestedInput = {
    create?: XOR<UsuarioCreateWithoutHistorialModificacionesInput, UsuarioUncheckedCreateWithoutHistorialModificacionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutHistorialModificacionesInput
    upsert?: UsuarioUpsertWithoutHistorialModificacionesInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutHistorialModificacionesInput, UsuarioUpdateWithoutHistorialModificacionesInput>, UsuarioUncheckedUpdateWithoutHistorialModificacionesInput>
  }

  export type PlatilloUpdateOneWithoutHistorialModificacionesNestedInput = {
    create?: XOR<PlatilloCreateWithoutHistorialModificacionesInput, PlatilloUncheckedCreateWithoutHistorialModificacionesInput>
    connectOrCreate?: PlatilloCreateOrConnectWithoutHistorialModificacionesInput
    upsert?: PlatilloUpsertWithoutHistorialModificacionesInput
    disconnect?: PlatilloWhereInput | boolean
    delete?: PlatilloWhereInput | boolean
    connect?: PlatilloWhereUniqueInput
    update?: XOR<XOR<PlatilloUpdateToOneWithWhereWithoutHistorialModificacionesInput, PlatilloUpdateWithoutHistorialModificacionesInput>, PlatilloUncheckedUpdateWithoutHistorialModificacionesInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlatilloCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<PlatilloCreateWithoutCategoriaInput, PlatilloUncheckedCreateWithoutCategoriaInput> | PlatilloCreateWithoutCategoriaInput[] | PlatilloUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: PlatilloCreateOrConnectWithoutCategoriaInput | PlatilloCreateOrConnectWithoutCategoriaInput[]
    createMany?: PlatilloCreateManyCategoriaInputEnvelope
    connect?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
  }

  export type PlatilloUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<PlatilloCreateWithoutCategoriaInput, PlatilloUncheckedCreateWithoutCategoriaInput> | PlatilloCreateWithoutCategoriaInput[] | PlatilloUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: PlatilloCreateOrConnectWithoutCategoriaInput | PlatilloCreateOrConnectWithoutCategoriaInput[]
    createMany?: PlatilloCreateManyCategoriaInputEnvelope
    connect?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
  }

  export type PlatilloUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<PlatilloCreateWithoutCategoriaInput, PlatilloUncheckedCreateWithoutCategoriaInput> | PlatilloCreateWithoutCategoriaInput[] | PlatilloUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: PlatilloCreateOrConnectWithoutCategoriaInput | PlatilloCreateOrConnectWithoutCategoriaInput[]
    upsert?: PlatilloUpsertWithWhereUniqueWithoutCategoriaInput | PlatilloUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: PlatilloCreateManyCategoriaInputEnvelope
    set?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    disconnect?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    delete?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    connect?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    update?: PlatilloUpdateWithWhereUniqueWithoutCategoriaInput | PlatilloUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: PlatilloUpdateManyWithWhereWithoutCategoriaInput | PlatilloUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: PlatilloScalarWhereInput | PlatilloScalarWhereInput[]
  }

  export type PlatilloUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<PlatilloCreateWithoutCategoriaInput, PlatilloUncheckedCreateWithoutCategoriaInput> | PlatilloCreateWithoutCategoriaInput[] | PlatilloUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: PlatilloCreateOrConnectWithoutCategoriaInput | PlatilloCreateOrConnectWithoutCategoriaInput[]
    upsert?: PlatilloUpsertWithWhereUniqueWithoutCategoriaInput | PlatilloUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: PlatilloCreateManyCategoriaInputEnvelope
    set?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    disconnect?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    delete?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    connect?: PlatilloWhereUniqueInput | PlatilloWhereUniqueInput[]
    update?: PlatilloUpdateWithWhereUniqueWithoutCategoriaInput | PlatilloUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: PlatilloUpdateManyWithWhereWithoutCategoriaInput | PlatilloUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: PlatilloScalarWhereInput | PlatilloScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type RolCreateWithoutUsuariosInput = {
    nombre: string
  }

  export type RolUncheckedCreateWithoutUsuariosInput = {
    id?: number
    nombre: string
  }

  export type RolCreateOrConnectWithoutUsuariosInput = {
    where: RolWhereUniqueInput
    create: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
  }

  export type HistorialModificacionCreateWithoutUsuarioInput = {
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsable: UsuarioCreateNestedOneWithoutHistorialResponsableInput
    platillo?: PlatilloCreateNestedOneWithoutHistorialModificacionesInput
  }

  export type HistorialModificacionUncheckedCreateWithoutUsuarioInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsableId: number
    platilloId?: number | null
  }

  export type HistorialModificacionCreateOrConnectWithoutUsuarioInput = {
    where: HistorialModificacionWhereUniqueInput
    create: XOR<HistorialModificacionCreateWithoutUsuarioInput, HistorialModificacionUncheckedCreateWithoutUsuarioInput>
  }

  export type HistorialModificacionCreateManyUsuarioInputEnvelope = {
    data: HistorialModificacionCreateManyUsuarioInput | HistorialModificacionCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type HistorialModificacionCreateWithoutResponsableInput = {
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    usuario?: UsuarioCreateNestedOneWithoutHistorialModificacionesInput
    platillo?: PlatilloCreateNestedOneWithoutHistorialModificacionesInput
  }

  export type HistorialModificacionUncheckedCreateWithoutResponsableInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    usuarioId?: number | null
    platilloId?: number | null
  }

  export type HistorialModificacionCreateOrConnectWithoutResponsableInput = {
    where: HistorialModificacionWhereUniqueInput
    create: XOR<HistorialModificacionCreateWithoutResponsableInput, HistorialModificacionUncheckedCreateWithoutResponsableInput>
  }

  export type HistorialModificacionCreateManyResponsableInputEnvelope = {
    data: HistorialModificacionCreateManyResponsableInput | HistorialModificacionCreateManyResponsableInput[]
    skipDuplicates?: boolean
  }

  export type RolUpsertWithoutUsuariosInput = {
    update: XOR<RolUpdateWithoutUsuariosInput, RolUncheckedUpdateWithoutUsuariosInput>
    create: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
    where?: RolWhereInput
  }

  export type RolUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: RolWhereInput
    data: XOR<RolUpdateWithoutUsuariosInput, RolUncheckedUpdateWithoutUsuariosInput>
  }

  export type RolUpdateWithoutUsuariosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type RolUncheckedUpdateWithoutUsuariosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type HistorialModificacionUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: HistorialModificacionWhereUniqueInput
    update: XOR<HistorialModificacionUpdateWithoutUsuarioInput, HistorialModificacionUncheckedUpdateWithoutUsuarioInput>
    create: XOR<HistorialModificacionCreateWithoutUsuarioInput, HistorialModificacionUncheckedCreateWithoutUsuarioInput>
  }

  export type HistorialModificacionUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: HistorialModificacionWhereUniqueInput
    data: XOR<HistorialModificacionUpdateWithoutUsuarioInput, HistorialModificacionUncheckedUpdateWithoutUsuarioInput>
  }

  export type HistorialModificacionUpdateManyWithWhereWithoutUsuarioInput = {
    where: HistorialModificacionScalarWhereInput
    data: XOR<HistorialModificacionUpdateManyMutationInput, HistorialModificacionUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type HistorialModificacionScalarWhereInput = {
    AND?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
    OR?: HistorialModificacionScalarWhereInput[]
    NOT?: HistorialModificacionScalarWhereInput | HistorialModificacionScalarWhereInput[]
    id?: IntFilter<"HistorialModificacion"> | number
    campo?: StringFilter<"HistorialModificacion"> | string
    valorAnterior?: StringNullableFilter<"HistorialModificacion"> | string | null
    valorNuevo?: StringNullableFilter<"HistorialModificacion"> | string | null
    fecha?: DateTimeFilter<"HistorialModificacion"> | Date | string
    accion?: StringFilter<"HistorialModificacion"> | string
    responsableId?: IntFilter<"HistorialModificacion"> | number
    usuarioId?: IntNullableFilter<"HistorialModificacion"> | number | null
    platilloId?: IntNullableFilter<"HistorialModificacion"> | number | null
  }

  export type HistorialModificacionUpsertWithWhereUniqueWithoutResponsableInput = {
    where: HistorialModificacionWhereUniqueInput
    update: XOR<HistorialModificacionUpdateWithoutResponsableInput, HistorialModificacionUncheckedUpdateWithoutResponsableInput>
    create: XOR<HistorialModificacionCreateWithoutResponsableInput, HistorialModificacionUncheckedCreateWithoutResponsableInput>
  }

  export type HistorialModificacionUpdateWithWhereUniqueWithoutResponsableInput = {
    where: HistorialModificacionWhereUniqueInput
    data: XOR<HistorialModificacionUpdateWithoutResponsableInput, HistorialModificacionUncheckedUpdateWithoutResponsableInput>
  }

  export type HistorialModificacionUpdateManyWithWhereWithoutResponsableInput = {
    where: HistorialModificacionScalarWhereInput
    data: XOR<HistorialModificacionUpdateManyMutationInput, HistorialModificacionUncheckedUpdateManyWithoutResponsableInput>
  }

  export type CategoriaCreateWithoutPlatillosInput = {
    nombre: string
    creadoEn?: Date | string
  }

  export type CategoriaUncheckedCreateWithoutPlatillosInput = {
    id?: number
    nombre: string
    creadoEn?: Date | string
  }

  export type CategoriaCreateOrConnectWithoutPlatillosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutPlatillosInput, CategoriaUncheckedCreateWithoutPlatillosInput>
  }

  export type HistorialModificacionCreateWithoutPlatilloInput = {
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsable: UsuarioCreateNestedOneWithoutHistorialResponsableInput
    usuario?: UsuarioCreateNestedOneWithoutHistorialModificacionesInput
  }

  export type HistorialModificacionUncheckedCreateWithoutPlatilloInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsableId: number
    usuarioId?: number | null
  }

  export type HistorialModificacionCreateOrConnectWithoutPlatilloInput = {
    where: HistorialModificacionWhereUniqueInput
    create: XOR<HistorialModificacionCreateWithoutPlatilloInput, HistorialModificacionUncheckedCreateWithoutPlatilloInput>
  }

  export type HistorialModificacionCreateManyPlatilloInputEnvelope = {
    data: HistorialModificacionCreateManyPlatilloInput | HistorialModificacionCreateManyPlatilloInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaUpsertWithoutPlatillosInput = {
    update: XOR<CategoriaUpdateWithoutPlatillosInput, CategoriaUncheckedUpdateWithoutPlatillosInput>
    create: XOR<CategoriaCreateWithoutPlatillosInput, CategoriaUncheckedCreateWithoutPlatillosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutPlatillosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutPlatillosInput, CategoriaUncheckedUpdateWithoutPlatillosInput>
  }

  export type CategoriaUpdateWithoutPlatillosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateWithoutPlatillosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistorialModificacionUpsertWithWhereUniqueWithoutPlatilloInput = {
    where: HistorialModificacionWhereUniqueInput
    update: XOR<HistorialModificacionUpdateWithoutPlatilloInput, HistorialModificacionUncheckedUpdateWithoutPlatilloInput>
    create: XOR<HistorialModificacionCreateWithoutPlatilloInput, HistorialModificacionUncheckedCreateWithoutPlatilloInput>
  }

  export type HistorialModificacionUpdateWithWhereUniqueWithoutPlatilloInput = {
    where: HistorialModificacionWhereUniqueInput
    data: XOR<HistorialModificacionUpdateWithoutPlatilloInput, HistorialModificacionUncheckedUpdateWithoutPlatilloInput>
  }

  export type HistorialModificacionUpdateManyWithWhereWithoutPlatilloInput = {
    where: HistorialModificacionScalarWhereInput
    data: XOR<HistorialModificacionUpdateManyMutationInput, HistorialModificacionUncheckedUpdateManyWithoutPlatilloInput>
  }

  export type UsuarioCreateWithoutRolInput = {
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    historialModificaciones?: HistorialModificacionCreateNestedManyWithoutUsuarioInput
    historialResponsable?: HistorialModificacionCreateNestedManyWithoutResponsableInput
  }

  export type UsuarioUncheckedCreateWithoutRolInput = {
    id?: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    historialModificaciones?: HistorialModificacionUncheckedCreateNestedManyWithoutUsuarioInput
    historialResponsable?: HistorialModificacionUncheckedCreateNestedManyWithoutResponsableInput
  }

  export type UsuarioCreateOrConnectWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput>
  }

  export type UsuarioCreateManyRolInputEnvelope = {
    data: UsuarioCreateManyRolInput | UsuarioCreateManyRolInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithWhereUniqueWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutRolInput, UsuarioUncheckedUpdateWithoutRolInput>
    create: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutRolInput, UsuarioUncheckedUpdateWithoutRolInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutRolInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutRolInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    usuario?: StringFilter<"Usuario"> | string
    correo?: StringFilter<"Usuario"> | string
    contrasena?: StringFilter<"Usuario"> | string
    estado?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    actualizadoEn?: DateTimeFilter<"Usuario"> | Date | string
    rolId?: IntFilter<"Usuario"> | number
  }

  export type UsuarioCreateWithoutHistorialResponsableInput = {
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rol: RolCreateNestedOneWithoutUsuariosInput
    historialModificaciones?: HistorialModificacionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutHistorialResponsableInput = {
    id?: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rolId: number
    historialModificaciones?: HistorialModificacionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutHistorialResponsableInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutHistorialResponsableInput, UsuarioUncheckedCreateWithoutHistorialResponsableInput>
  }

  export type UsuarioCreateWithoutHistorialModificacionesInput = {
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rol: RolCreateNestedOneWithoutUsuariosInput
    historialResponsable?: HistorialModificacionCreateNestedManyWithoutResponsableInput
  }

  export type UsuarioUncheckedCreateWithoutHistorialModificacionesInput = {
    id?: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
    rolId: number
    historialResponsable?: HistorialModificacionUncheckedCreateNestedManyWithoutResponsableInput
  }

  export type UsuarioCreateOrConnectWithoutHistorialModificacionesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutHistorialModificacionesInput, UsuarioUncheckedCreateWithoutHistorialModificacionesInput>
  }

  export type PlatilloCreateWithoutHistorialModificacionesInput = {
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    categoria: CategoriaCreateNestedOneWithoutPlatillosInput
  }

  export type PlatilloUncheckedCreateWithoutHistorialModificacionesInput = {
    id?: number
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    categoriaId: number
  }

  export type PlatilloCreateOrConnectWithoutHistorialModificacionesInput = {
    where: PlatilloWhereUniqueInput
    create: XOR<PlatilloCreateWithoutHistorialModificacionesInput, PlatilloUncheckedCreateWithoutHistorialModificacionesInput>
  }

  export type UsuarioUpsertWithoutHistorialResponsableInput = {
    update: XOR<UsuarioUpdateWithoutHistorialResponsableInput, UsuarioUncheckedUpdateWithoutHistorialResponsableInput>
    create: XOR<UsuarioCreateWithoutHistorialResponsableInput, UsuarioUncheckedCreateWithoutHistorialResponsableInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutHistorialResponsableInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutHistorialResponsableInput, UsuarioUncheckedUpdateWithoutHistorialResponsableInput>
  }

  export type UsuarioUpdateWithoutHistorialResponsableInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rol?: RolUpdateOneRequiredWithoutUsuariosNestedInput
    historialModificaciones?: HistorialModificacionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutHistorialResponsableInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rolId?: IntFieldUpdateOperationsInput | number
    historialModificaciones?: HistorialModificacionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUpsertWithoutHistorialModificacionesInput = {
    update: XOR<UsuarioUpdateWithoutHistorialModificacionesInput, UsuarioUncheckedUpdateWithoutHistorialModificacionesInput>
    create: XOR<UsuarioCreateWithoutHistorialModificacionesInput, UsuarioUncheckedCreateWithoutHistorialModificacionesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutHistorialModificacionesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutHistorialModificacionesInput, UsuarioUncheckedUpdateWithoutHistorialModificacionesInput>
  }

  export type UsuarioUpdateWithoutHistorialModificacionesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rol?: RolUpdateOneRequiredWithoutUsuariosNestedInput
    historialResponsable?: HistorialModificacionUpdateManyWithoutResponsableNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutHistorialModificacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    rolId?: IntFieldUpdateOperationsInput | number
    historialResponsable?: HistorialModificacionUncheckedUpdateManyWithoutResponsableNestedInput
  }

  export type PlatilloUpsertWithoutHistorialModificacionesInput = {
    update: XOR<PlatilloUpdateWithoutHistorialModificacionesInput, PlatilloUncheckedUpdateWithoutHistorialModificacionesInput>
    create: XOR<PlatilloCreateWithoutHistorialModificacionesInput, PlatilloUncheckedCreateWithoutHistorialModificacionesInput>
    where?: PlatilloWhereInput
  }

  export type PlatilloUpdateToOneWithWhereWithoutHistorialModificacionesInput = {
    where?: PlatilloWhereInput
    data: XOR<PlatilloUpdateWithoutHistorialModificacionesInput, PlatilloUncheckedUpdateWithoutHistorialModificacionesInput>
  }

  export type PlatilloUpdateWithoutHistorialModificacionesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    categoria?: CategoriaUpdateOneRequiredWithoutPlatillosNestedInput
  }

  export type PlatilloUncheckedUpdateWithoutHistorialModificacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
  }

  export type PlatilloCreateWithoutCategoriaInput = {
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    historialModificaciones?: HistorialModificacionCreateNestedManyWithoutPlatilloInput
  }

  export type PlatilloUncheckedCreateWithoutCategoriaInput = {
    id?: number
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
    historialModificaciones?: HistorialModificacionUncheckedCreateNestedManyWithoutPlatilloInput
  }

  export type PlatilloCreateOrConnectWithoutCategoriaInput = {
    where: PlatilloWhereUniqueInput
    create: XOR<PlatilloCreateWithoutCategoriaInput, PlatilloUncheckedCreateWithoutCategoriaInput>
  }

  export type PlatilloCreateManyCategoriaInputEnvelope = {
    data: PlatilloCreateManyCategoriaInput | PlatilloCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type PlatilloUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: PlatilloWhereUniqueInput
    update: XOR<PlatilloUpdateWithoutCategoriaInput, PlatilloUncheckedUpdateWithoutCategoriaInput>
    create: XOR<PlatilloCreateWithoutCategoriaInput, PlatilloUncheckedCreateWithoutCategoriaInput>
  }

  export type PlatilloUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: PlatilloWhereUniqueInput
    data: XOR<PlatilloUpdateWithoutCategoriaInput, PlatilloUncheckedUpdateWithoutCategoriaInput>
  }

  export type PlatilloUpdateManyWithWhereWithoutCategoriaInput = {
    where: PlatilloScalarWhereInput
    data: XOR<PlatilloUpdateManyMutationInput, PlatilloUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type PlatilloScalarWhereInput = {
    AND?: PlatilloScalarWhereInput | PlatilloScalarWhereInput[]
    OR?: PlatilloScalarWhereInput[]
    NOT?: PlatilloScalarWhereInput | PlatilloScalarWhereInput[]
    id?: IntFilter<"Platillo"> | number
    nombre?: StringFilter<"Platillo"> | string
    precio?: FloatFilter<"Platillo"> | number
    creadoEn?: DateTimeFilter<"Platillo"> | Date | string
    disponible?: BoolFilter<"Platillo"> | boolean
    categoriaId?: IntFilter<"Platillo"> | number
  }

  export type HistorialModificacionCreateManyUsuarioInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsableId: number
    platilloId?: number | null
  }

  export type HistorialModificacionCreateManyResponsableInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    usuarioId?: number | null
    platilloId?: number | null
  }

  export type HistorialModificacionUpdateWithoutUsuarioInput = {
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsable?: UsuarioUpdateOneRequiredWithoutHistorialResponsableNestedInput
    platillo?: PlatilloUpdateOneWithoutHistorialModificacionesNestedInput
  }

  export type HistorialModificacionUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsableId?: IntFieldUpdateOperationsInput | number
    platilloId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialModificacionUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsableId?: IntFieldUpdateOperationsInput | number
    platilloId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialModificacionUpdateWithoutResponsableInput = {
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    usuario?: UsuarioUpdateOneWithoutHistorialModificacionesNestedInput
    platillo?: PlatilloUpdateOneWithoutHistorialModificacionesNestedInput
  }

  export type HistorialModificacionUncheckedUpdateWithoutResponsableInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    platilloId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialModificacionUncheckedUpdateManyWithoutResponsableInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    platilloId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialModificacionCreateManyPlatilloInput = {
    id?: number
    campo: string
    valorAnterior?: string | null
    valorNuevo?: string | null
    fecha?: Date | string
    accion: string
    responsableId: number
    usuarioId?: number | null
  }

  export type HistorialModificacionUpdateWithoutPlatilloInput = {
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsable?: UsuarioUpdateOneRequiredWithoutHistorialResponsableNestedInput
    usuario?: UsuarioUpdateOneWithoutHistorialModificacionesNestedInput
  }

  export type HistorialModificacionUncheckedUpdateWithoutPlatilloInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsableId?: IntFieldUpdateOperationsInput | number
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialModificacionUncheckedUpdateManyWithoutPlatilloInput = {
    id?: IntFieldUpdateOperationsInput | number
    campo?: StringFieldUpdateOperationsInput | string
    valorAnterior?: NullableStringFieldUpdateOperationsInput | string | null
    valorNuevo?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    accion?: StringFieldUpdateOperationsInput | string
    responsableId?: IntFieldUpdateOperationsInput | number
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UsuarioCreateManyRolInput = {
    id?: number
    nombre: string
    usuario: string
    correo: string
    contrasena: string
    estado?: boolean
    creadoEn?: Date | string
    actualizadoEn?: Date | string
  }

  export type UsuarioUpdateWithoutRolInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    historialModificaciones?: HistorialModificacionUpdateManyWithoutUsuarioNestedInput
    historialResponsable?: HistorialModificacionUpdateManyWithoutResponsableNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutRolInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    historialModificaciones?: HistorialModificacionUncheckedUpdateManyWithoutUsuarioNestedInput
    historialResponsable?: HistorialModificacionUncheckedUpdateManyWithoutResponsableNestedInput
  }

  export type UsuarioUncheckedUpdateManyWithoutRolInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    estado?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    actualizadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatilloCreateManyCategoriaInput = {
    id?: number
    nombre: string
    precio: number
    creadoEn?: Date | string
    disponible?: boolean
  }

  export type PlatilloUpdateWithoutCategoriaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    historialModificaciones?: HistorialModificacionUpdateManyWithoutPlatilloNestedInput
  }

  export type PlatilloUncheckedUpdateWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
    historialModificaciones?: HistorialModificacionUncheckedUpdateManyWithoutPlatilloNestedInput
  }

  export type PlatilloUncheckedUpdateManyWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    disponible?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}