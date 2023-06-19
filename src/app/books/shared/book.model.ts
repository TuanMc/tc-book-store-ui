export class Book {
  id: String;
  title: String;
  description: String;
  imageUrl: String;
  category: String;
  price: number;
  quantity: number;

  constructor(data?: Book) {
    this.id = data?.id || "";
    this.title = data?.title || "";
    this.description = data?.description || "";
    this.imageUrl = data?.imageUrl || "";
    this.category = data?.category || "";
    this.price = data?.price || 0;
    this.quantity = data?.quantity || 0;
  }
}
