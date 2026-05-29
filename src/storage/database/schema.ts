import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb, index, serial } from "drizzle-orm/pg-core";
import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";

// 用户资料表
export const profiles = pgTable(
  "profiles",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    nickname: varchar("nickname", { length: 50 }).notNull(),
    avatar: text("avatar"),
    phone: varchar("phone", { length: 20 }),
    bio: text("bio"),
    location: varchar("location", { length: 100 }),
    is_verified: boolean("is_verified").default(false),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("profiles_phone_idx").on(table.phone),
    index("profiles_created_at_idx").on(table.created_at),
  ]
);

// 交友帖子表
export const dating_posts = pgTable(
  "dating_posts",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id),
    title: varchar("title", { length: 100 }).notNull(),
    content: text("content").notNull(),
    images: jsonb("images").default([]),
    gender: varchar("gender", { length: 10 }),
    age_range: varchar("age_range", { length: 20 }),
    location: varchar("location", { length: 100 }),
    tags: jsonb("tags").default([]),
    views: integer("views").default(0),
    likes: integer("likes").default(0),
    is_active: boolean("is_active").default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("dating_posts_user_id_idx").on(table.user_id),
    index("dating_posts_created_at_idx").on(table.created_at),
    index("dating_posts_location_idx").on(table.location),
  ]
);

// 资讯文章表
export const articles = pgTable(
  "articles",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id),
    title: varchar("title", { length: 200 }).notNull(),
    content: text("content").notNull(),
    cover_image: text("cover_image"),
    category: varchar("category", { length: 50 }),
    tags: jsonb("tags").default([]),
    views: integer("views").default(0),
    likes: integer("likes").default(0),
    is_published: boolean("is_published").default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("articles_user_id_idx").on(table.user_id),
    index("articles_category_idx").on(table.category),
    index("articles_created_at_idx").on(table.created_at),
  ]
);

// 二手商品表
export const secondhand_items = pgTable(
  "secondhand_items",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description").notNull(),
    price: serial("price").notNull(),
    original_price: serial("original_price"),
    images: jsonb("images").default([]),
    category: varchar("category", { length: 50 }),
    condition: varchar("condition", { length: 20 }),
    location: varchar("location", { length: 100 }),
    views: integer("views").default(0),
    likes: integer("likes").default(0),
    is_sold: boolean("is_sold").default(false),
    is_active: boolean("is_active").default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("secondhand_items_user_id_idx").on(table.user_id),
    index("secondhand_items_category_idx").on(table.category),
    index("secondhand_items_price_idx").on(table.price),
    index("secondhand_items_created_at_idx").on(table.created_at),
    index("secondhand_items_is_sold_idx").on(table.is_sold),
  ]
);

// 旅游商品表
export const tourism_products = pgTable(
  "tourism_products",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).references(() => profiles.id),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description").notNull(),
    price: serial("price").notNull(),
    original_price: serial("original_price"),
    images: jsonb("images").default([]),
    category: varchar("category", { length: 50 }),
    location: varchar("location", { length: 100 }),
    duration: varchar("duration", { length: 50 }),
    features: jsonb("features").default([]),
    views: integer("views").default(0),
    likes: integer("likes").default(0),
    stock: integer("stock").default(99),
    is_featured: boolean("is_featured").default(false),
    is_active: boolean("is_active").default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("tourism_products_user_id_idx").on(table.user_id),
    index("tourism_products_category_idx").on(table.category),
    index("tourism_products_price_idx").on(table.price),
    index("tourism_products_created_at_idx").on(table.created_at),
    index("tourism_products_is_featured_idx").on(table.is_featured),
  ]
);

// 订单表
export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id),
    product_id: varchar("product_id", { length: 36 }).notNull(),
    product_type: varchar("product_type", { length: 20 }).notNull(),
    quantity: integer("quantity").default(1),
    total_amount: serial("total_amount").notNull(),
    status: varchar("status", { length: 20 }).default("pending"),
    contact_phone: varchar("contact_phone", { length: 20 }),
    contact_name: varchar("contact_name", { length: 50 }),
    remark: text("remark"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("orders_user_id_idx").on(table.user_id),
    index("orders_status_idx").on(table.status),
    index("orders_created_at_idx").on(table.created_at),
  ]
);

// 收藏表
export const favorites = pgTable(
  "favorites",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id),
    item_id: varchar("item_id", { length: 36 }).notNull(),
    item_type: varchar("item_type", { length: 20 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("favorites_user_id_idx").on(table.user_id),
    index("favorites_item_idx").on(table.item_id, table.item_type),
  ]
);

// Schema 导出
const { createInsertSchema } = createSchemaFactory({ coerce: { date: true } });

export const insertProfileSchema = createInsertSchema(profiles).pick({ 
  nickname: true, phone: true, avatar: true, bio: true, location: true 
});
export const insertDatingPostSchema = createInsertSchema(dating_posts).pick({ 
  title: true, content: true, gender: true, age_range: true, location: true, tags: true, images: true 
});
export const insertArticleSchema = createInsertSchema(articles).pick({ 
  title: true, content: true, category: true, cover_image: true, tags: true 
});
export const insertSecondhandItemSchema = createInsertSchema(secondhand_items).pick({ 
  title: true, description: true, price: true, original_price: true, category: true, 
  condition: true, location: true, images: true 
});
export const insertTourismProductSchema = createInsertSchema(tourism_products).pick({ 
  name: true, description: true, price: true, category: true, location: true, 
  duration: true, features: true, images: true, stock: true 
});
export const insertOrderSchema = createInsertSchema(orders).pick({ 
  product_id: true, product_type: true, quantity: true, total_amount: true, 
  contact_phone: true, contact_name: true, remark: true 
});

export type Profile = typeof profiles.$inferSelect;
export type DatingPost = typeof dating_posts.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type SecondhandItem = typeof secondhand_items.$inferSelect;
export type TourismProduct = typeof tourism_products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
