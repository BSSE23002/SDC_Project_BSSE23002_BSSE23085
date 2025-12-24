
/**
 * In a real AWS deployment, this file would interact with AWS SDK v3 DynamoDB client.
 * e.g., import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
 */
import { User, Resource, Booking, BookingStatus, UserRole } from '../../types';
import { INITIAL_RESOURCES } from '../../constants';


class DBController {
  private users: User[] = [
    { id: 'admin-1', name: 'Dept Head', email: 'admin@itu.edu.pk', role: UserRole.ADMIN, isActive: true, createdAt: new Date().toISOString() }
  ];
  private passwords: Map<string, string> = new Map([['admin@itu.edu.pk', 'password']]);
  private resources: Resource[] = [...INITIAL_RESOURCES];
  private bookings: Booking[] = [];

  // USERS
  async findUserByEmail(email: string) { return this.users.find(u => u.email === email); }
  async getUserPassword(email: string) { return this.passwords.get(email); }
  async createUser(user: User, pass: string) {
    this.users.push(user);
    this.passwords.set(user.email, pass);
    return user;
  }
  async getAllUsers() { return this.users; }

  // RESOURCES
  async getResources() { return this.resources; }
  async getResourceById(id: string) { return this.resources.find(r => r.id === id); }
  async addResource(res: Resource) { this.resources.push(res); return res; }
  async deleteResource(id: string) { this.resources = this.resources.filter(r => r.id !== id); }

  // BOOKINGS
  async getBookings() { return this.bookings; }
  async createBooking(booking: Booking) { this.bookings.push(booking); return booking; }
  async updateBookingStatus(id: string, status: BookingStatus) {
    const b = this.bookings.find(x => x.id === id);
    if (b) b.status = status;
  }
}

export const db = new DBController();
