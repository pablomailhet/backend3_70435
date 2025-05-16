import { faker } from "@faker-js/faker";
faker.locale = 'es';



const createMockProduct = () => {
    const categories = [
        "Tablets",
        "Smartphones",
        "Laptops",
        "Smartwatches",
        "Headphones",
        "Speakers",
        "Desktops",
        "Streaming Devices",
        "Keyboards",
        "Accessories",
        "Virtual Reality",
        "Fitness",
        "Cameras",
        "Gaming",
        "Televisions",
        "Soundbars",
    ];
    const title = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const code = "cod" + Number.parseInt(faker.commerce.price({ min: 1, max: 100000 }));
    const price = Number.parseInt(faker.commerce.price({ min: 10, max: 2000 }));
    const stock = faker.number.int({ min: 1, max: 1000 });
    const category = categories[faker.number.int({ min: 0, max: 15 })];

    /*const image = faker.image.urlLoremFlickr({
      category: "nature",
      width: 360,
      height: 360,
    });
  */

    const thumbnails = [];

    //title, description, code, price, stock, category, thumbnails

    return { title, description, code, price, stock, category, thumbnails };
};

export default createMockProduct;
