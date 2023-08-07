var items= [
  {
    name: "Cargo Pant for men",
    image: "https://img.freepik.com/premium-photo/model-wearing-blue-color-cargo-pants-cargo-trousers_38810-6333.jpg?w=740",
    price: 18,
    color: "Blue",
    size: "xl",
    description: "Pure cotton Cargo Pants for men. Comfortable to wear. Sizes: xl.",
    quantity: 150
  },
  {
    name: "Denim Jacket",
    image: "https://images.pexels.com/photos/16906744/pexels-photo-16906744/free-photo-of-denim-black-jacket-hanging-on-clothes-rack.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 15,
    color: "Black",
    size: "L",
    description: "Classic denim jacket with a stylish design. Available in Large.",
    quantity: 4
  },
  {
    name: "Sneakers",
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 10,
    color: "White",
    size: "9",
    description: "Comfortable and trendy sneakers for everyday wear. Size: 9.",
    quantity: 6
  },
  {
    name: "Striped Shirt",
    image: "https://images.pexels.com/photos/12730638/pexels-photo-12730638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 12,
    color: "Black",
    size: "M",
    description: "Stylish striped shirt made from high-quality fabric. Available in Medium.",
    quantity: 3
  },
  {
    name: "Leather Wallet",
    image: "https://images.pexels.com/photos/4512814/pexels-photo-4512814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 8,
    color: "Brown",
    description: "Genuine leather wallet with multiple card slots. One size fits all.",
    quantity: 8
  },
  {
    name: "Sports Watch",
    image: "https://images.pexels.com/photos/14464638/pexels-photo-14464638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 20,
    color: "Black",
    description: "Water-resistant sports watch with a stopwatch feature. Various sizes available.",
    quantity: 5
  },
  {
    name: "Formal Trousers",
    image: "https://images.pexels.com/photos/6647708/pexels-photo-6647708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 13,
    color: "Gray",
    size: "32",
    description: "Elegant formal trousers for professional occasions. Size: 32.",
    quantity: 1
  },
  {
    name: "Printed T-Shirt",
    image: "https://images.pexels.com/photos/16649248/pexels-photo-16649248/free-photo-of-model-in-tshirt-with-print.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 7,
    color: "White",
    size: "S",
    description: "Casual printed t-shirt with a cool design. Sizes available: Small.",
    quantity: 10
  },
  {
    name: "Hooded Sweatshirt",
    image: "https://images.pexels.com/photos/15914345/pexels-photo-15914345/free-photo-of-smiling-man-wearing-a-hood-posing-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 18,
    color: "Gray",
    size: "XL",
    description: "Warm and cozy hooded sweatshirt for colder days. Size: XL.",
    quantity: 200
  },
  {
    name: "Casual Shorts",
    image: "https://images.pexels.com/photos/5157130/pexels-photo-5157130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 6,
    color: "Beige",
    size: "M",
    description: "Comfortable casual shorts for a relaxed look. Available in M size.",
    quantity: 7
  },
  {
    name: "Sunglasses",
    image: "https://images.pexels.com/photos/4223655/pexels-photo-4223655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 9,
    color: "Black",
    description: "Stylish sunglasses with UV protection. One size fits all.",
    quantity: 3
  },
  {
    name: "Graphic Hoodie",
    image: "https://images.pexels.com/photos/7418168/pexels-photo-7418168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 17,
    color: "Blue",
    size: "L",
    description: "Trendy hoodie with a cool graphic design. Various sizes available.",
    quantity: 5
  },
  {
    name: "Canvas Backpack",
    image: "https://cotswoldhipster.com/cdn/shop/products/Churchillbackpackbrown_720x.jpg?v=1654873777",
    price: 14,
    color: "Brown",
    description: "Durable canvas backpack with multiple compartments. One size fits all.",
    quantity: 2
  },
  {
    name: "Polo Shirt",
    image: "https://propercloth.com/reference/wp-content/uploads/2022/06/yusuke-polo-shirt-682x1024.jpeg",
    price: 11,
    color: "Light Blue",
    size: "L",
    description: "Classic polo shirt made from breathable fabric. Size: Large.",
    quantity: 4
  },
  {
    name: "Track Pants",
    image: "https://b2b.iciw.com/bilder/artiklar/zoom/12012-001_1.jpg?m=1639652064",
    price: 20,
    color: "Black",
    size: "M",
    description: "Comfortable track pants with a modern look. Available in Medium size.",
    quantity: 3
  },
  {
    name: "Leather Belt",
    image: "https://furorjeans.com/cdn/shop/files/0N9A7108FALB23-007.jpg?v=1688551057",
    price: 8,
    color: "Brown",
    description: "Stylish leather belt with a sleek buckle. One size fits all.",
    quantity: 6
  },
  {
    name: "Printed Sweatshirt",
    image: "https://www.cougar.com.pk/cdn/shop/products/MSW248-DBN_3_720x.jpg?v=1669477091",
    price: 6,
    color: "White",
    size: "S",
    description: "Casual sweatshirt with a unique printed design. Available in Small.",
    quantity: 4
  },
  {
    name: "Cotton Socks",
    image: "https://shopbrumano.com/cdn/shop/products/Blue-Maroon-Zig-Zag-Cotton-Socks-Brumano-Pakistan.jpg?v=1670411030&width=800",
    price: 5,
    color: "Multi",
    description: "Pack of soft and breathable cotton socks. One size fits all.",
    quantity: 10
  },
  {
    name: "Tie",
    image: "https://www.familybritches.com/wp-content/uploads/2018/05/mens-four-in-hand-tie-700x467.jpg",
    price: 12,
    color: "Navy Blue",
    description: "Elegant silk tie for formal occasions. One size fits all.",
    quantity: 120
  },
  {
    name: "Baseball Cap",
    image: "https://fanatics.frgimages.com/atlanta-braves/mens-nike-navy-atlanta-braves-classic99-adjustable-hat_ss5_p-200012515+u-o7oiujstwgaaq0w6vcgs+v-ehaombo8ozwamfa23zjw.jpg?_hv=2&w=340",
    price: 10,
    color: "Black",
    description: "Classic baseball cap with an adjustable strap. One size fits all.",
    quantity: 5
  }
];
  export default items;