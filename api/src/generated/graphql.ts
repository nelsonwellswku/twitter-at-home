import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  body?: Maybe<Scalars['String']>;
  commentId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateTweet?: Maybe<Tweet>;
};


export type MutationCreateTweetArgs = {
  body: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Tweets?: Maybe<Array<Maybe<Tweet>>>;
  User?: Maybe<User>;
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  body?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createTime?: Maybe<Scalars['Timestamp']>;
  tweetId?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  Tweet: ResolverTypeWrapper<Tweet>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Timestamp: Scalars['Timestamp'];
  Tweet: Tweet;
  User: User;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  CreateTweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, RequireFields<MutationCreateTweetArgs, 'body'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Tweets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tweet']>>>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  createTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  tweetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Tweet?: TweetResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

