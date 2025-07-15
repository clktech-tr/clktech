import { Product, InsertProduct, Order, InsertOrder, Contact, InsertContact, Admin, InsertAdmin } from "@shared/schema";
import fs from "fs";
import path from "path";

export interface IStorage {
  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Order operations
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Contact operations
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Admin operations
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private contacts: Map<number, Contact>;
  private admins: Map<number, Admin>;
  private currentProductId: number;
  private currentOrderId: number;
  private currentContactId: number;
  private currentAdminId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.contacts = new Map();
    this.admins = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentContactId = 1;
    this.currentAdminId = 1;
    
    this.initializeData();
  }

  private async initializeData() {
    // Create default admin
    const defaultAdmin: Admin = {
      id: this.currentAdminId++,
      username: "admin",
      password: "admin123", // In production, this should be hashed
    };
    this.admins.set(defaultAdmin.id, defaultAdmin);

    // Initialize sample products
    const sampleProducts: Product[] = [
      {
        id: this.currentProductId++,
        name: "LineX Controller",
        description: "Advanced line-following robot controller with integrated sensors and motor drivers",
        fullDescription: "Advanced line-following robot controller with integrated sensors and motor drivers. Perfect for educational projects and competitive robotics. Includes built-in WiFi connectivity and real-time debugging capabilities.",
        price: "89.99",
        image: "/api/uploads/linex.png",
        category: "Controllers",
        inStock: true,
        specs: JSON.stringify({
          microcontroller: "ARM Cortex-M4",
          flash: "256KB",
          ram: "64KB",
          voltage: "3.3V - 5V",
          digital_io: "20 pins",
          analog_inputs: "8 channels"
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: this.currentProductId++,
        name: "MazeX Controller",
        description: "Maze-solving robot platform with advanced navigation algorithms and sensor arrays",
        fullDescription: "Maze-solving robot platform with advanced navigation algorithms and sensor arrays. Features intelligent pathfinding, obstacle detection, and autonomous navigation capabilities.",
        price: "129.99",
        image: "/api/uploads/mazex.png",
        category: "Controllers",
        inStock: true,
        specs: JSON.stringify({
          microcontroller: "ARM Cortex-M7",
          flash: "512KB",
          ram: "128KB",
          voltage: "3.3V - 5V",
          digital_io: "24 pins",
          analog_inputs: "12 channels"
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: this.currentProductId++,
        name: "VivianX Controller",
        description: "Professional-grade robotics platform with wireless connectivity and advanced I/O",
        fullDescription: "Professional-grade robotics platform with wireless connectivity and advanced I/O. Designed for complex robotics projects with real-time control and monitoring capabilities.",
        price: "199.99",
        image: "/api/uploads/vivianx.png",
        category: "Controllers",
        inStock: true,
        specs: JSON.stringify({
          microcontroller: "ARM Cortex-M7",
          flash: "1MB",
          ram: "256KB",
          voltage: "3.3V - 5V",
          digital_io: "32 pins",
          analog_inputs: "16 channels"
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });

    // Save to JSON files
    await this.saveToFile();
  }

  private async saveToFile() {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const productsData = Array.from(this.products.values());
    const ordersData = Array.from(this.orders.values());

    fs.writeFileSync(
      path.join(dataDir, "products.json"),
      JSON.stringify(productsData, null, 2)
    );

    fs.writeFileSync(
      path.join(dataDir, "orders.json"),
      JSON.stringify(ordersData, null, 2)
    );
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = {
      ...product,
      id,
      inStock: product.inStock ?? true,
      specs: product.specs ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, newProduct);
    await this.saveToFile();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    const updatedProduct: Product = {
      ...existingProduct,
      ...product,
      updatedAt: new Date(),
    };
    this.products.set(id, updatedProduct);
    await this.saveToFile();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const deleted = this.products.delete(id);
    if (deleted) {
      await this.saveToFile();
    }
    return deleted;
  }

  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const orderId = `CLK-${new Date().getFullYear()}-${String(id).padStart(3, '0')}`;
    
    const newOrder: Order = {
      ...order,
      id,
      orderId,
      status: order.status ?? "pending",
      notes: order.notes ?? null,
      createdAt: new Date(),
    };
    this.orders.set(id, newOrder);
    await this.saveToFile();
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder: Order = {
      ...order,
      status,
    };
    this.orders.set(id, updatedOrder);
    await this.saveToFile();
    return updatedOrder;
  }

  // Contact operations
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact: Contact = {
      ...contact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  // Admin operations
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const newAdmin: Admin = {
      ...admin,
      id,
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }
}

export const storage = new MemStorage();
