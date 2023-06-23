export class Book {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
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

export class NewBook {
  title: string;
  description: string;
  image: File | undefined;
  category: string;
  price: number;
  quantity: number;

  constructor(data?: any) {
    this.title = data?.title || "";
    this.description = data?.description || "";
    this.image = data?.image;
    this.category = data?.category || "";
    this.price = data?.price || 0;
    this.quantity = data?.quantity || 0;
  }
}
