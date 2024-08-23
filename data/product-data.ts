// import type { IProduct } from "@/types/product-d-t";
// import {api} from "@/plugins/api";
// import {product_data} from "@/pinia/useProductStore";

// const productStore = useProductStore();
// const product_data = computed(() => productStore.product_data);
import {product_data} from "@/pinia/useProductStore";

// const product_data:IProduct[] = await api.productData([
//   // {
//   //   id: 1,
//   //   sku: "NVB7SDVX45",
//   //   name: "Ergonomic Linen Pants",
//   //   images: [
//   //     "/images/product/product-1.jpg",
//   //     "/images/product/product-2.jpg",
//   //     "/images/product/product-3.jpg",
//   //   ],
//   //   parentCategory: "Frozen Foods",
//   //   children: "Baby Food",
//   //   brand: "ShopRite",
//   //   price: 25,
//   //   discount: 0,
//   //   quantity: 12,
//   //   description:
//   //       "In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.",
//   //   additionalInfo: [
//   //     {key: "Weight", value: "2 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 4,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     },
//   //   ],
//   //   tags: ["Food", "Fruits"],
//   //   top_rated: true,
//   //   sell_count: 2,
//   // },
//   // {
//   //   id: 2,
//   //   sku: "NVB7SDVX30",
//   //   name: "Grapefruit fun facts",
//   //   images: [
//   //     "/images/product/product-2.jpg",
//   //     "/images/product/product-1.jpg",
//   //     "/images/product/product-4.jpg",
//   //   ],
//   //   parentCategory: "Frozen Foods",
//   //   children: "Baby Food",
//   //   price: 35,
//   //   discount: 0.5,
//   //   quantity: 10,
//   //   brand: "Albertsons",
//   //   description:
//   //       "In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.",
//   //   additionalInfo: [
//   //     {key: "Weight", value: ".75 kg"},
//   //     {key: "Dimensions", value: "40 × 15 × 20 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "Nick",
//   //       comment: "Nice",
//   //       rating: 4.5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     },
//   //   ],
//   //   tags: ["Food", "Fruits"],
//   //   sell_count: 3,
//   // },
//   // {
//   //   id: 3,
//   //   sku: "NVB7SDVX20",
//   //   name: "Marshmallow Candy White",
//   //   images: [
//   //     "/images/product/product-3.jpg",
//   //     "/images/product/product-4.jpg",
//   //     "/images/product/product-5.jpg",
//   //   ],
//   //   parentCategory: "Meat and Fish",
//   //   children: "Meat",
//   //   price: 50,
//   //   discount: 0,
//   //   quantity: 8,
//   //   brand: "Vons",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Meat", "Food"],
//   //   top_rated: true,
//   //   sell_count: 5,
//   // },
//   // {
//   //   id: 4,
//   //   sku: "NVB7SDVX18",
//   //   name: "Raw Meat on White",
//   //   images: [
//   //     "/images/product/product-4.jpg",
//   //     "/images/product/product-1.jpg",
//   //     "/images/product/product-2.jpg",
//   //   ],
//   //   parentCategory: "Meat and Fish",
//   //   children: "Fish",
//   //   price: 60,
//   //   discount: 2,
//   //   quantity: 17,
//   //   brand: "Ralphs",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 4,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Meat", "Food"],
//   //   sell_count: 6,
//   // },
//   // {
//   //   id: 5,
//   //   sku: "NVB7SDVX08",
//   //   name: "Chocolate Protein Booster",
//   //   images: [
//   //     "/images/product/product-5.jpg",
//   //     "/images/product/product-3.jpg",
//   //     "/images/product/product-6.jpg",
//   //   ],
//   //   parentCategory: "Milk & Dairy",
//   //   children: "Milk",
//   //   price: 65,
//   //   discount: 0,
//   //   quantity: 5,
//   //   brand: "Aldi",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 3,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Meat", "Food"],
//   //   top_rated: true,
//   //   sell_count: 0,
//   // },
//   // {
//   //   id: 6,
//   //   sku: "NVB7SDVX50",
//   //   name: "Whole Red Onions",
//   //   images: [
//   //     "/images/product/product-6.jpg",
//   //     "/images/product/product-2.jpg",
//   //     "/images/product/product-1.jpg",
//   //   ],
//   //   parentCategory: "Milk & Dairy",
//   //   children: "Dairy",
//   //   price: 70,
//   //   discount: 3,
//   //   quantity: 10,
//   //   brand: "Wegmans",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 4,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Meat", "Food"],
//   //   sell_count: 7,
//   // },
//   // {
//   //   id: 7,
//   //   sku: "NVB7SDVX62",
//   //   name: "Whole Red Onions",
//   //   images: [
//   //     "/images/product/product-7.jpg",
//   //     "/images/product/product-5.jpg",
//   //     "/images/product/product-2.jpg",
//   //   ],
//   //   parentCategory: "Beverages",
//   //   children: "Coffee",
//   //   price: 75,
//   //   discount: 0,
//   //   quantity: 7,
//   //   brand: "Wegmans",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 4.5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Tea", "Coffee"],
//   //   sell_count: 8,
//   // },
//   // {
//   //   id: 8,
//   //   sku: "NVB7SDVX72",
//   //   name: "Gorgeous Marble Coat",
//   //   images: [
//   //     "/images/product/product-8.jpg",
//   //     "/images/product/product-6.jpg",
//   //     "/images/product/product-1.jpg",
//   //   ],
//   //   parentCategory: "Beverages",
//   //   children: "Tea",
//   //   price: 20,
//   //   discount: 0,
//   //   quantity: 7,
//   //   brand: "Wegmans",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Tea", "Coffee"],
//   //   sell_count: 12,
//   // },
//   // {
//   //   id: 9,
//   //   sku: "NVB7SDVX15",
//   //   name: "Soda Water Maker",
//   //   images: [
//   //     "/images/product/product-9.jpg",
//   //     "/images/product/product-1.jpg",
//   //     "/images/product/product-3.jpg",
//   //   ],
//   //   parentCategory: "Vegetables",
//   //   children: "Tomato",
//   //   price: 55,
//   //   discount: 0,
//   //   quantity: 10,
//   //   brand: "Aldi",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Tomato", "Vegetables"],
//   //   sell_count: 15,
//   // },
//   // {
//   //   id: 10,
//   //   sku: "NVB7SDVX29",
//   //   name: "Pure Irish Organic Beef",
//   //   images: [
//   //     "/images/product/product-10.jpg",
//   //     "/images/product/product-8.jpg",
//   //     "/images/product/product-6.jpg",
//   //   ],
//   //   parentCategory: "Fruits",
//   //   children: "Mango",
//   //   price: 100,
//   //   discount: 0,
//   //   quantity: 4,
//   //   brand: "Albertsons",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Mango", "Fruits"],
//   //   sell_count: 11,
//   // },
//   // {
//   //   id: 11,
//   //   sku: "NVB7SDVX42",
//   //   name: "Bites Gone Bananas",
//   //   images: [
//   //     "/images/product/product-11.jpg",
//   //     "/images/product/product-9.jpg",
//   //     "/images/product/product-6.jpg",
//   //   ],
//   //   parentCategory: "Fruits",
//   //   children: "Banana",
//   //   price: 68,
//   //   discount: 0,
//   //   quantity: 5,
//   //   brand: "Vons",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Banana", "Fruits"],
//   //   sell_count: 1,
//   // },
//   // {
//   //   id: 12,
//   //   sku: "NVB7SDVX55",
//   //   name: "Ginger Fresh Potato",
//   //   images: [
//   //     "/images/product/product-12.jpg",
//   //     "/images/product/product-10.jpg",
//   //     "/images/product/product-9.jpg",
//   //   ],
//   //   parentCategory: "Vegetables",
//   //   children: "Potato",
//   //   price: 45,
//   //   discount: 0,
//   //   quantity: 9,
//   //   brand: "Ralphs",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Potato", "Vegetables"],
//   //   sell_count: 5,
//   // },
//   // {
//   //   id: 13,
//   //   sku: "NVB7SDVX66",
//   //   name: "Mangosteen Organic",
//   //   images: [
//   //     "/images/product/product-13.jpg",
//   //     "/images/product/product-8.jpg",
//   //     "/images/product/product-3.jpg",
//   //   ],
//   //   parentCategory: "Frozen Foods",
//   //   children: "Strawberry",
//   //   price: 78,
//   //   discount: 0,
//   //   quantity: 10,
//   //   brand: "ShopRite",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1 kg"},
//   //     {key: "Dimensions", value: "45 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Foods", "Strawberry"],
//   //   sell_count: 16,
//   // },
//   // {
//   //   id: 14,
//   //   sku: "NVB7SDVB88",
//   //   name: "Frozen Shrimp",
//   //   images: [
//   //     "/images/product/product-14.jpg",
//   //     "/images/product/product-10.jpg",
//   //     "/images/product/product-13.jpg",
//   //   ],
//   //   parentCategory: "Frozen Foods",
//   //   children: "Seafood",
//   //   price: 35,
//   //   discount: 0,
//   //   quantity: 15,
//   //   brand: "Wegmans",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "1.5 kg"},
//   //     {key: "Dimensions", value: "50 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Foods", "Seafood"],
//   //   sell_count: 7,
//   // },
//   // {
//   //   id: 15,
//   //   sku: "NVB7SDVB99",
//   //   name: "Ripe Mangoes",
//   //   images: [
//   //     "/images/product/product-15.jpg",
//   //     "/images/product/product-12.jpg",
//   //     "/images/product/product-9.jpg",
//   //   ],
//   //   parentCategory: "Fruits",
//   //   children: "Mango",
//   //   price: 50,
//   //   discount: 0,
//   //   quantity: 22,
//   //   brand: "Aldi",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "2.5 kg"},
//   //     {key: "Dimensions", value: "50 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "06 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Fruits", "Mango"],
//   //   sell_count: 10,
//   // },
//   // {
//   //   id: 16,
//   //   sku: "NVB7SDVB59",
//   //   name: "Gourmet Coffee Beans",
//   //   images: [
//   //     "/images/product/product-16.jpg",
//   //     "/images/product/product-8.jpg",
//   //     "/images/product/product-12.jpg",
//   //   ],
//   //   parentCategory: "Beverages",
//   //   children: "Coffee",
//   //   price: 45,
//   //   discount: 0,
//   //   quantity: 25,
//   //   brand: "Albertsons",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "2.5 kg"},
//   //     {key: "Dimensions", value: "50 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "08 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Coffee"],
//   //   sell_count: 12,
//   // },
//   // {
//   //   id: 17,
//   //   sku: "NVB7SDVB62",
//   //   name: "Frozen Spinach",
//   //   images: [
//   //     "/images/product/product-17.jpg",
//   //     "/images/product/product-15.jpg",
//   //     "/images/product/product-16.jpg",
//   //   ],
//   //   parentCategory: "Frozen Foods",
//   //   children: "Seafood",
//   //   price: 60,
//   //   discount: 0,
//   //   quantity: 30,
//   //   brand: "Vons",
//   //   description: 'In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.',
//   //   additionalInfo: [
//   //     {key: "Weight", value: "2.5 kg"},
//   //     {key: "Dimensions", value: "50 × 20 × 30 cm"},
//   //   ],
//   //   reviews: [
//   //     {
//   //       id: 1,
//   //       name: "John",
//   //       comment: "Good",
//   //       rating: 5,
//   //       user: "/images/users/user-3.jpg",
//   //       date: "08 March, 2023",
//   //     }
//   //   ],
//   //   tags: ["Seafood"],
//   //   sell_count: 18,
//   // },
// ]);

export default product_data.value;