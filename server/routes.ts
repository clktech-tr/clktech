import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertOrderSchema, insertContactSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Simple admin authentication middleware
const adminAuth = async (req: Request, res: Response, next: any) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(401).json({ message: "Username and password required" });
  }

  const admin = await storage.getAdminByUsername(username);
  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/api/uploads", express.static(path.join(process.cwd(), "public", "uploads")));
  
  // Serve download files
  app.use("/downloads", express.static(path.join(process.cwd(), "public", "downloads")));

  // Public API routes
  
  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product by ID or slug
  app.get("/api/products/:identifier", async (req: Request, res: Response) => {
    try {
      const identifier = req.params.identifier;
      let product;
      
      // Try to get by ID first
      const id = parseInt(identifier);
      if (!isNaN(id)) {
        product = await storage.getProduct(id);
      }
      
      // If not found by ID, try to get by slug
      if (!product) {
        const products = await storage.getProducts();
        product = products.find(p => p.slug === identifier);
      }
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create order
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data" });
    }
  });

  // Create contact
  app.post("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", adminAuth, async (req: Request, res: Response) => {
    res.json({ message: "Login successful" });
  });

  // Admin-only routes

  // Get all orders (admin only)
  app.get("/api/admin/orders", adminAuth, async (req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Update order status (admin only)
  app.patch("/api/admin/orders/:id", adminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  // Get all contacts (admin only)
  app.get("/api/admin/contacts", adminAuth, async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Create product (admin only)
  app.post("/api/admin/products", adminAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse({
        ...req.body,
        image: req.file ? `/api/uploads/${req.file.filename}` : req.body.image,
      });
      
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  // Update product (admin only)
  app.patch("/api/admin/products/:id", adminAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = {
        ...req.body,
        ...(req.file && { image: `/api/uploads/${req.file.filename}` }),
      };
      
      const product = await storage.updateProduct(id, updateData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  // Delete product (admin only)
  app.delete("/api/admin/products/:id", adminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Get admin stats
  app.get("/api/admin/stats", adminAuth, async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      const orders = await storage.getOrders();
      const contacts = await storage.getContacts();
      
      const stats = {
        totalProducts: products.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalSales: orders.reduce((sum, order) => sum + parseFloat(order.price), 0),
        totalOrders: orders.length,
        totalContacts: contacts.length,
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
